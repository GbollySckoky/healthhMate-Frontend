"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from "lucide-react";
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

export interface CallSession {
  id: string;
  communicationId: string;
  consultationType: "video_call" | "audio_call";
  status: string;
  agoraChannelName: string;
  expiresAt: string;
}

interface AgoraCredentials {
  token: string;
  appId: string;
  channelName: string;
  uid: number | string | null;
  expiresAt?: string;
}

/**
 * Axios puts the HTTP body in `response.data`. The API may itself wrap its
 * payload in `data`, so support both `{ appId, ... }` and `{ data: { appId,
 * ... } }` without passing undefined values to `client.join`.
 */
interface AgoraJoinResponse {
  data: AgoraCredentials | { data: AgoraCredentials };
}

function getAgoraCredentials(response: AgoraJoinResponse): AgoraCredentials {
  const body = response.data;
  const credentials = "data" in body ? body.data : body;

  const missing = [
    ["appId", credentials.appId],
    ["channelName", credentials.channelName],
    ["token", credentials.token],
  ].filter(([, value]) => !value).map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`The start-call response is missing: ${missing.join(", ")}`);
  }

  return credentials;
}

interface VideoCallProps {
  callSession: CallSession;
  startCall: (callSessionId: string) => Promise<AgoraJoinResponse>;
  cancelCall: (callSessionId: string) => Promise<unknown>;
  endCall: (callSessionId: string) => Promise<unknown>;
  onCallEnded: () => void;
}

export default function VideoCallUI({
  callSession,
  startCall,
  cancelCall,
  endCall,
  onCallEnded,
}: VideoCallProps) {
  const [status, setStatus] = useState<"connecting" | "connected" | "error">("connecting");
  const [errorMsg, setErrorMsg] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [remoteJoined, setRemoteJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localAudioRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoRef = useRef<ICameraVideoTrack | null>(null);
  const localContainerRef = useRef<HTMLDivElement>(null);
  const remoteContainerRef = useRef<HTMLDivElement>(null);

  const isVideo = callSession.consultationType === "video_call";

  const cleanup = useCallback(() => {
    localAudioRef.current?.close();
    localVideoRef.current?.close();
    clientRef.current?.leave();
    localAudioRef.current = null;
    localVideoRef.current = null;
    clientRef.current = null;
  }, []);

  // ============================================================
  // JOIN AGORA ON MOUNT
  // ============================================================
  useEffect(() => {
    let cancelled = false;

    async function join() {
      try {
        const response = await startCall(callSession.id);
        const credentials = getAgoraCredentials(response);
        if (cancelled) return;

        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        client.on("user-published", async (remoteUser, mediaType) => {
          await client.subscribe(remoteUser, mediaType);
          if (mediaType === "video" && remoteContainerRef.current) {
            remoteUser.videoTrack?.play(remoteContainerRef.current);
          }
          if (mediaType === "audio") {
            remoteUser.audioTrack?.play();
          }
          setRemoteJoined(true);
        });

        client.on("user-unpublished", () => setRemoteJoined(false));
        client.on("user-left", () => setRemoteJoined(false));

        await client.join(
          credentials.appId,
          credentials.channelName,
          credentials.token,
          credentials.uid,
        );

        if (isVideo) {
          const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
          localAudioRef.current = audioTrack;
          localVideoRef.current = videoTrack;
          if (localContainerRef.current) videoTrack.play(localContainerRef.current);
          await client.publish([audioTrack, videoTrack]);
        } else {
          const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          localAudioRef.current = audioTrack;
          await client.publish([audioTrack]);
        }

        if (!cancelled) setStatus("connected");
      } catch (err) {
        console.error("Failed to join call:", err);
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(
            (err as Error).name === "NotAllowedError"
              ? "Camera/microphone access was denied. Please allow access and rejoin."
              : err instanceof Error && err.message.startsWith("The start-call response")
                ? "The call service did not return valid join details. Please try again."
                : "Could not join the call. Please try again."
          );
        }
      }
    }

    join();

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callSession.id]);

  // ============================================================
  // COUNTDOWN TO EXPIRY
  // ============================================================
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(callSession.expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("00:00");
        handleEndCall();
        clearInterval(interval);
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callSession.expiresAt]);

  const toggleMic = () => {
    if (!localAudioRef.current) return;
    const next = !micOn;
    localAudioRef.current.setEnabled(next);
    setMicOn(next);
  };

  const toggleCam = () => {
    if (!localVideoRef.current) return;
    const next = !camOn;
    localVideoRef.current.setEnabled(next);
    setCamOn(next);
  };

  const handleEndCall = async () => {
    cleanup();
    try {
      await endCall(callSession.id);
    } finally {
      onCallEnded();
    }
  };

  const handleCancelBeforeConnect = async () => {
    cleanup();
    try {
      await cancelCall(callSession.id);
    } finally {
      onCallEnded();
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  if (status === "error") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black text-center text-white">
        <p className="max-w-xs text-sm text-red-300">{errorMsg}</p>
        <button
          onClick={handleCancelBeforeConnect}
          className="rounded-lg bg-red-900 px-4 py-2 text-sm font-medium"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-black">
      <div className="absolute top-0 z-10 flex w-full items-center justify-between px-4 py-3">
        <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
          {status === "connecting" ? "Connecting…" : remoteJoined ? "In call" : "Waiting for other party…"}
        </span>
        <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-mono text-white">
          {timeLeft}
        </span>
      </div>

      <div className="flex-1 bg-gray-900">
        {isVideo ? (
          <div ref={remoteContainerRef} className="h-full w-full" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-white">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-red-900">
              <Mic size={32} />
            </div>
            <p className="text-sm text-gray-300">
              {remoteJoined ? "Audio call in progress" : "Waiting for other party…"}
            </p>
          </div>
        )}
      </div>

      {isVideo && (
        <div
          ref={localContainerRef}
          className="absolute right-4 top-16 h-32 w-24 overflow-hidden rounded-lg border border-white/20 bg-gray-800 shadow-lg sm:h-40 sm:w-32"
        />
      )}

      <div className="flex items-center justify-center gap-4 bg-black/80 px-4 py-6">
        <button
          onClick={toggleMic}
          className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
            micOn ? "bg-white/10 text-white" : "bg-white text-black"
          }`}
          aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
        >
          {micOn ? <Mic size={22} /> : <MicOff size={22} />}
        </button>

        {isVideo && (
          <button
            onClick={toggleCam}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
              camOn ? "bg-white/10 text-white" : "bg-white text-black"
            }`}
            aria-label={camOn ? "Turn off camera" : "Turn on camera"}
          >
            {camOn ? <VideoIcon size={22} /> : <VideoOff size={22} />}
          </button>
        )}

        <button
          onClick={handleEndCall}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
          aria-label="End call"
        >
          <PhoneOff size={22} />
        </button>
      </div>
    </div>
  );
}
