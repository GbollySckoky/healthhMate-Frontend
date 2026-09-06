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
import useCall from "@/hooks/useCall";
import VideoCallUI, { CallSession } from "./CallModal";
import { patientService } from "@/service/patientService";

const Page = () => {
  const videoCall = "video_call";
  const params = useParams();
  const { formatTime } = useDate();
  const rawId = String(params?.slug);

  const [activeCallSession, setActiveCallSession] = useState<CallSession | null>(null);

  const { message, isLoading, isError, error } = useGetCommunicationId(rawId);

  const {
    messages: initialMessages,
    msgIsLoading,
    msgIsError,
    msgError,
  } = useGetMessags(message?.id);

  const { createCall } = useCreateCall(message?.id);
  const { cancelCallSession, endCallSession } = useCall();

  const communicationId = message?.id ?? "";
  const authToken = storageService.getAuthToken();

  const [messages, setMessages] = useState<Message[]>([]);
  const seededCommunicationRef = useRef<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<ReturnType<typeof connectCommunicationSocket> | null>(null);

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
    if (seededCommunicationRef.current && seededCommunicationRef.current !== communicationId) {
      setMessages([]);
      seededCommunicationRef.current = null;
    }
  }, [communicationId]);

  // socket connection + message listener
  useEffect(() => {
    if (!communicationId || !authToken) return;

    const socket = connectCommunicationSocket(authToken);
    socketRef.current = socket;

    const handleConnect = () => {
      joinCommunication(socket, communicationId);
    };

    const handleNewMessage = (newMessage: Message & { clientTempId?: string }) => {
      setMessages((previous) => {
        const alreadyExists = previous.some((m) => m.id === newMessage.id);
        if (alreadyExists) return previous;

        const tempIndex = previous.findIndex((m) => {
          if (!m.id.startsWith("temp-")) return false;
          if (newMessage.clientTempId) return m.id === newMessage.clientTempId;
          return m.senderType === newMessage.senderType && m.content === newMessage.content;
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
      setActiveCallSession(data as CallSession);
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

  const handleCreateCall = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createCall.mutateAsync();
    setActiveCallSession(response.data as CallSession);
  };

  if (isLoading) {
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-900 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[90vh] items-center justify-center p-4 text-center">
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Failed to load conversation."}
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

  return (
    <div className="flex h-[100dvh] flex-col bg-gray-50">
      <header className="fixed top-0 z-20 mt-14 w-full bg-red-900 px-4 py-3 shadow-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={defaultImage}
              alt="Default profile"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-white/30 object-cover"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">
                Dr. {CapitalizeName(message?.appointment.doctor.firstName)}{" "}
                {CapitalizeName(message?.appointment.doctor.lastName)}
              </h2>
              <p className="text-xs text-red-200">Online</p>
            </div>
          </div>

          <form onSubmit={handleCreateCall} className="flex items-center gap-2">
            {message?.appointment.consultationType === videoCall ? (
              <button
                type="submit"
                aria-label="Start video call"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/10"
              >
                <Video size={20} />
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Start phone call"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/10"
              >
                <Phone size={20} />
              </button>
            )}
          </form>
        </div>
      </header>

      <main className="mt-16 flex-1 overflow-y-auto px-4 py-6 pb-24">
        {msgIsLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-900 border-t-transparent" />
          </div>
        ) : msgIsError ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm text-red-600">
              {msgError instanceof Error ? msgError.message : "Failed to load messages."}
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Send className="text-red-900" size={28} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Start a conversation</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Send a message below to start your conversation.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {messages.map((item: Message) => {
              const isPatient = item.senderType === "PATIENT";
              return (
                <div key={item.id} className={`flex ${isPatient ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      isPatient
                        ? "rounded-br-sm bg-red-900 text-white"
                        : "rounded-bl-sm bg-white text-gray-900 shadow-sm"
                    }`}
                  >
                    <p className="break-words text-sm leading-6">{item.content}</p>
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
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-center gap-3">
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-900 text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {activeCallSession && (
        <VideoCallUI
          callSession={activeCallSession}
          startCall={(id) => patientService.startCall(id)}
          cancelCall={(id) => cancelCallSession.mutateAsync(id)}
          endCall={(id) => endCallSession.mutateAsync(id)}
          onCallEnded={() => setActiveCallSession(null)}
        />
      )}
    </div>
  );
};

export default Page;