"use client";

import useGetCommunicationId from "@/hooks/useGetCommunicationId";
import useGetMessags from "@/hooks/useGetMessages";
import { Message } from "@/lib/interface/message";

import {
  Send,
  CheckCheck,
  Phone,
  Video,
} from "lucide-react";

import Image from "next/image";
import { useParams } from "next/navigation";

import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import defaultImage from "@/assets/default.jpg";

import useCreateCall from "@/hooks/useCreateCall";

import {
  connectCommunicationSocket,
  joinCommunication,
  offNewMessage,
  onNewMessage,
  sendMessage,
} from "@/lib/socket/communicationSocket";

import { storageService } from "@/constants/storage";

const Page = () => {
  const params = useParams();

  const rawId = String(params?.slug);

  /**
   * ============================================================
   * STATE
   * ============================================================
   */

  const [messages, setMessages] = useState<Message[]>([]);

  const [inputValue, setInputValue] = useState("");

  /**
   * Used to make sure we only seed the initial HTTP messages once.
   */
  const hasSeededMessages = useRef(false);

  /**
   * ============================================================
   * COMMUNICATION
   * ============================================================
   */

  const {
    message,
    isLoading,
    isError,
    error,
  } = useGetCommunicationId(rawId);

  const {
    messages: initialMessages,
    msgIsLoading,
    msgIsError,
    msgError,
  } = useGetMessags(message?.id);

  /**
   * ============================================================
   * CALL
   * ============================================================
   */

  const { createCall } = useCreateCall(message?.id);

  /**
   * ============================================================
   * COMMUNICATION ID
   * ============================================================
   */

  const communicationId = message?.id ?? "";

  /**
   * ============================================================
   * AUTH TOKEN
   * ============================================================
   */

  const authToken = storageService.getAuthToken();
  console.log("AUTH TOKEN:", authToken);
console.log(
  "AUTH TOKEN TYPE:",
  typeof authToken
);
  /**
   * ============================================================
   * SOCKET REF
   * ============================================================
   */

  const socketRef =
    useRef<
      ReturnType<typeof connectCommunicationSocket> | null
    >(null);

  /**
   * ============================================================
   * SEED INITIAL MESSAGES
   * ============================================================
   *
   * IMPORTANT:
   *
   * We don't want:
   *
   * setMessages(initialMessages)
   *
   * firing every time React Query returns a new array reference.
   *
   * So we only seed the local state once.
   */

  useEffect(() => {
    if (
      !initialMessages ||
      hasSeededMessages.current
    ) {
      return;
    }

    setMessages(initialMessages);

    hasSeededMessages.current = true;
  }, [initialMessages]);

  /**
   * ============================================================
   * RESET SEEDING WHEN COMMUNICATION CHANGES
   * ============================================================
   *
   * If the user navigates from:
   *
   * /message/communication-A
   *
   * to:
   *
   * /message/communication-B
   *
   * we need to allow the new conversation's history
   * to seed the local state.
   */

  useEffect(() => {
    hasSeededMessages.current = false;
    setMessages([]);
  }, [communicationId]);

  /**
   * ============================================================
   * SOCKET CONNECTION
   * ============================================================
   */

  useEffect(() => {
    if (!communicationId || !authToken) {
      console.log(
        "SKIPPED SOCKET CONNECTION",
        {
          communicationId,
          hasToken: Boolean(authToken),
        }
      );

      return;
    }

    console.log(
      "INITIALIZING COMMUNICATION SOCKET..."
    );

    const socket =
      connectCommunicationSocket(authToken);

    socketRef.current = socket;

    /**
     * ==========================================================
     * SOCKET CONNECT
     * ==========================================================
     */

    const handleConnect = () => {
      console.log(
        "✅ SOCKET CONNECTED:",
        socket.id
      );

      console.log(
        "JOINING COMMUNICATION:",
        communicationId
      );

      joinCommunication(
        socket,
        communicationId
      );
    };

    /**
     * ==========================================================
     * NEW MESSAGE
     * ==========================================================
     */

    const handleNewMessage = (
      newMessage: Message
    ) => {
      console.log(
        "📩 RECEIVED NEW MESSAGE:",
        newMessage
      );

      setMessages((previousMessages) => {
        /**
         * Prevent duplicates.
         */

        const exists =
          previousMessages.some(
            (item) =>
              item.id === newMessage.id
          );

        if (exists) {
          return previousMessages;
        }

        return [
          ...previousMessages,
          newMessage,
        ];
      });
    };

    /**
     * Listen for socket connection.
     */

    socket.on(
      "connect",
      handleConnect
    );

    /**
     * Listen for messages.
     */

    onNewMessage(
      handleNewMessage
    );

    /**
     * If already connected.
     */

    if (socket.connected) {
      handleConnect();
    }

    /**
     * ==========================================================
     * CLEANUP
     * ==========================================================
     */

    return () => {
      console.log(
        "CLEANING SOCKET LISTENERS..."
      );

      socket.off(
        "connect",
        handleConnect
      );

      offNewMessage(
        handleNewMessage
      );

      socketRef.current = null;
    };
  }, [
    communicationId,
    authToken,
  ]);

  /**
   * ============================================================
   * SEND MESSAGE
   * ============================================================
   */

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedMessage =
      inputValue.trim();

    if (
      !trimmedMessage ||
      !communicationId ||
      !authToken
    ) {
      return;
    }

    /**
     * Get existing socket or create one.
     */

    const socket =
      socketRef.current ??
      connectCommunicationSocket(
        authToken
      );

    socketRef.current = socket;

    console.log(
      "📤 SENDING MESSAGE:",
      {
        communicationId,
        content: trimmedMessage,
        socketId: socket.id,
        connected: socket.connected,
      }
    );

    sendMessage(
      socket,
      communicationId,
      trimmedMessage
    );

    setInputValue("");
  };

  /**
   * ============================================================
   * CREATE CALL
   * ============================================================
   */

  const handleCreateCall = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    createCall.mutate();
  };

  /**
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (isLoading) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-900 border-t-transparent" />
      </div>
    );
  }

  /**
   * ============================================================
   * ERROR
   * ============================================================
   */

  if (isError) {
    return (
      <div className="flex h-[100dvh] items-center justify-center p-4 text-center">
        <p className="text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "Failed to load conversation."}
        </p>
      </div>
    );
  }

  /**
   * ============================================================
   * NOT FOUND
   * ============================================================
   */

  if (!message) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <p className="text-sm text-gray-500">
          Conversation not found.
        </p>
      </div>
    );
  }

  /**
   * ============================================================
   * UI
   * ============================================================
   */
  console.log('Messages', messages)
  return (
    <div className="flex h-[100dvh] flex-col bg-gray-50">

      {/* HEADER */}

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
                Doctor Name
              </h2>

              <p className="text-xs text-red-200">
                Online
              </p>
            </div>

          </div>

          {/* CALL ACTIONS */}

          <form
            onSubmit={handleCreateCall}
            className="flex items-center gap-2"
          >

            <button
              type="submit"
              aria-label="Start phone call"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            >
              <Phone size={20} />
            </button>

            <button
              type="button"
              aria-label="Start video call"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            >
              <Video size={20} />
            </button>

          </form>

        </div>
      </header>

      {/* MESSAGES */}

      <main className="mt-16 flex-1 overflow-y-auto px-4 py-6">

        {msgIsLoading ? (

          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-900 border-t-transparent" />
          </div>

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
              <Send
                className="text-red-900"
                size={28}
              />
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

            {messages.map(
              (item: Message) => {

                const isPatient =
                  item.senderType ===
                  "PATIENT";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isPatient
                        ? "justify-end"
                        : "justify-start"
                    }`}
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
                          isPatient
                            ? "text-red-200"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCheck size={16} />
                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </main>

      {/* MESSAGE INPUT */}

      <div className="fixed bottom-0 w-full border-t border-gray-200 bg-white p-4">

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-center gap-3"
        >

          <input
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value)
            }
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

    </div>
  );
};

export default Page;