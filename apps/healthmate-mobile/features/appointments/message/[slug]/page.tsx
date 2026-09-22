"use client";

import useGetCommunicationId from "@/hooks/useGetCommunicationId";
import useGetMessags from "@/hooks/useGetMessages";
import { Message } from "@/lib/interface/message";

import { Send, CheckCheck, Phone, Video } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";

import defaultImage from "@/assets/default.jpg";
import useCreateCall from "@/hooks/useCreateCall";

import {
  connectCommunicationSocket,
  joinCommunication,
  offNewMessage,
  onNewMessage,
  onIncomingCall,
  offIncomingCall,
  onCallEnded,
  offCallEnded,
  sendMessage,
} from "@/lib/socket/communicationSocket";

import { storageService } from "@/constants/storage";
import useDate from "@/hooks/useDate";
import { CapitalizeName } from "@/constants/capitalizeName";
// import useCall from "@/hooks/useCall";
import VideoCallUI, { CallSession } from "./CallModal";
import CommunicationSkeleton, {
  MessageListSkeleton,
} from "@/components/CommunicationSkeleton";
// import { patientService } from "@/service/patientService";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCallSession(value: unknown): value is CallSession {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.communicationId === "string" &&
    (value.consultationType === "video_call" ||
      value.consultationType === "audio_call") &&
    typeof value.status === "string" &&
    typeof value.agoraChannelName === "string" &&
    (typeof value.expiresAt === "string" || value.expiresAt === null)
  );
}

function getCreatedCallSession(response: { data: unknown }): CallSession {
  if (!isRecord(response.data)) {
    throw new Error("The create-call response did not include a call session");
  }

  const session = isCallSession(response.data.data)
    ? response.data.data
    : response.data;
  if (!isCallSession(session)) {
    throw new Error(
      "The create-call response did not include a valid call session"
    );
  }

  return session;
}

const Page = () => {
  const videoCall = "video_call";
  const params = useParams();
  const { formatTime } = useDate();
  const rawId = String(params?.slug);

  const [activeCallSession, setActiveCallSession] =
    useState<CallSession | null>(null);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);

  const { message, isLoading, isError, error } = useGetCommunicationId(rawId);
  const communicationId = message?.id ?? "";
  const {
    messages: initialMessages,
    msgIsLoading,
    msgIsError,
    msgError,
  } = useGetMessags(communicationId);

  const { createCall } = useCreateCall(communicationId);
  // const { cancelCallSession, endCallSession } = useCall();

  const authToken = storageService.getAuthToken();

  const [messages, setMessages] = useState<Message[]>([]);
  const seededCommunicationRef = useRef<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<ReturnType<
    typeof connectCommunicationSocket
  > | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // seed initial history once it loads
  useEffect(() => {
    if (!communicationId || msgIsLoading || !initialMessages) return;
    if (seededCommunicationRef.current === communicationId) return;

    setMessages(initialMessages);
    seededCommunicationRef.current = communicationId;
  }, [communicationId, initialMessages, msgIsLoading]);

  // reset on conversation switch
  useEffect(() => {
    if (
      seededCommunicationRef.current &&
      seededCommunicationRef.current !== communicationId
    ) {
      setMessages([]);
      seededCommunicationRef.current = null;
    }
  }, [communicationId]);

  // clear call error after a few seconds
  useEffect(() => {
    if (!callError) return;
    const timeout = setTimeout(() => setCallError(null), 5000);
    return () => clearTimeout(timeout);
  }, [callError]);

  // socket connection + message listener
  useEffect(() => {
    if (!communicationId || !authToken) return;

    const socket = connectCommunicationSocket(authToken);
    socketRef.current = socket;

    const handleConnect = () => {
      joinCommunication(socket, communicationId);
    };

    const handleNewMessage = (
      newMessage: Message & { clientTempId?: string }
    ) => {
      setMessages((previous) => {
        const alreadyExists = previous.some((m) => m.id === newMessage.id);
        if (alreadyExists) return previous;

        const tempIndex = previous.findIndex((m) => {
          if (!m.id.startsWith("temp-")) return false;
          if (newMessage.clientTempId) return m.id === newMessage.clientTempId;
          return (
            m.senderType === newMessage.senderType &&
            m.content === newMessage.content
          );
        });

        if (tempIndex !== -1) {
          const next = [...previous];
          next[tempIndex] = newMessage;
          return next;
        }

        return [...previous, newMessage];
      });
    };

    socket.on("connect", handleConnect);
    onNewMessage(handleNewMessage);

    if (socket.connected) handleConnect();

    return () => {
      socket.off("connect", handleConnect);
      offNewMessage(handleNewMessage);
      socketRef.current = null;
    };
  }, [communicationId, authToken]);

  // incoming-call listener — so the OTHER participant sees the call UI too
  useEffect(() => {
    if (!communicationId || !authToken) return;

    connectCommunicationSocket(authToken);

    const handleIncomingCall = (data: unknown) => {
      if (isCallSession(data)) {
        // Don't overwrite a session we already have (e.g. the caller
        // receiving their own broadcast).
        setActiveCallSession((prev) => (prev?.id === data.id ? prev : data));
        return;
      }

      if (!isRecord(data) || typeof data.callSessionId !== "string") {
        console.error("Received an invalid incoming-call payload", data);
        return;
      }

      const callSessionId = data.callSessionId;
      const consultationType =
        data.consultationType === "audio_call" ? "audio_call" : "video_call";
      const status = typeof data.status === "string" ? data.status : "WAITING";

      // Socket payload: { callSessionId, consultationType, status }.
      // Modal contract: { id, communicationId, ... }.
      // If we already hold this session (the caller, with a real
      // agoraChannelName), keep it instead of replacing it with a stub.
      setActiveCallSession((prev) =>
        prev?.id === callSessionId
          ? prev
          : {
              id: callSessionId,
              communicationId,
              consultationType,
              status,
              agoraChannelName: "",
              expiresAt: null,
            }
      );
    };

    onIncomingCall(handleIncomingCall);

    return () => {
      offIncomingCall(handleIncomingCall);
    };
  }, [communicationId, authToken]);

  // call-ended listener — so if the OTHER participant hangs up, this side's
  // call UI closes automatically instead of being stuck on a dead peer
  useEffect(() => {
    if (!communicationId || !authToken) return;

    connectCommunicationSocket(authToken);

    const handleCallEnded = () => {
      setActiveCallSession(null);
    };

    onCallEnded(handleCallEnded);

    return () => {
      offCallEnded(handleCallEnded);
    };
  }, [communicationId, authToken]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || !communicationId || !authToken) return;

    const socket = socketRef.current ?? connectCommunicationSocket(authToken);
    socketRef.current = socket;

    if (!socket.connected) {
      console.warn("Socket is not connected yet");
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setMessages((previous) => [
      ...previous,
      {
        id: tempId,
        content: trimmedMessage,
        senderType: "PATIENT",
        createdAt: new Date().toISOString(),
      } as Message,
    ]);

    sendMessage(socket, communicationId, trimmedMessage, tempId);
    setInputValue("");
  };

  const handleCreateCall = async () => {
    if (isStartingCall) return;

    setIsStartingCall(true);
    setCallError(null);

    try {
      const response = await createCall.mutateAsync();
      setActiveCallSession(getCreatedCallSession(response));
    } catch (err) {
      console.error("Failed to start call", err);
      setCallError(
        err instanceof Error ? err.message : "Couldn't start the call. Try again."
      );
    } finally {
      setIsStartingCall(false);
    }
  };

  // Full-page skeleton while the conversation itself loads
  if (isLoading) {
    return <CommunicationSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-[90vh] items-center justify-center p-4 text-center">
        <p className="text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "Failed to load conversation."}
        </p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <p className="text-sm text-gray-500">Conversation not found.</p>
      </div>
    );
  }

  const appointment = message.appointment;
  const doctor = appointment?.doctor;
  const isVideoConsultation = appointment?.consultationType === videoCall;

  return (
    <div className="flex h-[100dvh] flex-col bg-gray-50">
      <header className="fixed top-0 z-20 mt-14 w-full bg-red-900 px-4 py-3 shadow-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.profile?.profilePicture || defaultImage}
              alt="Doctor profile"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-white/30 object-cover"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">
                Dr. {CapitalizeName(doctor?.firstName ?? "")}{" "}
                {CapitalizeName(doctor?.lastName ?? "")}
              </h2>
              <p className="text-xs text-red-200">Online</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateCall}
            disabled={isStartingCall}
            aria-label={
              isVideoConsultation ? "Start video call" : "Start phone call"
            }
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isVideoConsultation ? <Video size={20} /> : <Phone size={20} />}
          </button>
        </div>
      </header>

      {callError && (
        <div
          role="alert"
          className="fixed top-[7.5rem] z-20 w-full px-4"
        >
          <div className="mx-auto max-w-3xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-800 shadow-sm">
            {callError}
          </div>
        </div>
      )}

      <main className="mt-16 flex-1 overflow-y-auto px-4 py-6 pb-24">
        {msgIsLoading ? (
          // Message-list skeleton only: real header and input stay visible
          <MessageListSkeleton />
        ) : msgIsError ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm text-red-600">
              {msgError instanceof Error
                ? msgError.message
                : "Failed to load messages."}
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Send className="text-red-900" size={28} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Start a conversation
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Send a message below to start your conversation.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {messages.map((item: Message) => {
              const isPatient = item.senderType === "PATIENT";
              return (
                <div
                  key={item.id}
                  className={`flex ${isPatient ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      isPatient
                        ? "rounded-br-sm bg-red-900 text-white"
                        : "rounded-bl-sm bg-white text-gray-900 shadow-sm"
                    }`}
                  >
                    <p className="break-words text-sm leading-6">
                      {item.content}
                    </p>
                    <div
                      className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                        isPatient ? "text-red-200" : "text-gray-400"
                      }`}
                    >
                      <span>{formatTime(item.createdAt)}</span>
                      <CheckCheck size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <div className="fixed bottom-0 w-full border-t border-gray-200 bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-center gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-900 focus:ring-2 focus:ring-red-100"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            aria-label="Send message"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-900 text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {activeCallSession && (
        <VideoCallUI
          callSession={activeCallSession}
          appointment={appointment}
          onCallEnded={() => setActiveCallSession(null)}
          communicationId={communicationId}
        />
      )}
    </div>
  );
};

export default Page;