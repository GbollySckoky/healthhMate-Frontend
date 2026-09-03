import { io, Socket } from "socket.io-client";
import { Message } from "@/lib/interface/message";

let socket: Socket | null = null;
let socketToken: string | null = null;

/**
 * CONNECT SOCKET
 */

export function connectCommunicationSocket(token: string): Socket {
  if (!token) {
    throw new Error("Socket authentication token is required");
  }

  if (socket && socketToken === token) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socketToken = token;

  socket = io(
    "https://healthcare-backend-5y5b.onrender.com/communications",
    {
      auth: {
        token,
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }
  );

  socket.on("connect", () => {
    console.log("✅ Communication socket connected:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Communication socket disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ SOCKET CONNECT ERROR:", error);
    console.error("Message:", error.message);
  });

  socket.on("authError", (error) => {
    console.error("❌ Communication socket authentication error:", error);
    console.error("Auth error message:", error?.message);
  });

  socket.on("error", (error) => {
    console.error("❌ Communication socket server error:", error);
  });

  return socket;
}

/**
 * GET SOCKET
 */

export function getCommunicationSocket(): Socket {
  if (!socket) {
    throw new Error(
      "Socket not connected — call connectCommunicationSocket first"
    );
  }

  return socket;
}

/**
 * JOIN COMMUNICATION
 */

export function joinCommunication(
  communicationSocket: Socket,
  communicationId: string
) {
  if (!communicationId) {
    console.error("Cannot join communication: communicationId is missing");
    return;
  }

  if (!communicationSocket.connected) {
    communicationSocket.once("connect", () => {
      console.log(
        "Joining communication after socket connected:",
        communicationId
      );

      communicationSocket.emit("joinCommunication", {
        communicationId,
      });
    });

    return;
  }

  console.log("Joining communication:", communicationId);

  communicationSocket.emit("joinCommunication", {
    communicationId,
  });
}

/**
 * SEND MESSAGE
 *
 * clientTempId (optional): a client-generated id for the
 * optimistic message. If your NestJS gateway echoes this
 * back on the "newMessage" payload, the UI can reconcile
 * the optimistic bubble with the real one precisely.
 */

export function sendMessage(
  communicationSocket: Socket,
  communicationId: string,
  content: string,
  clientTempId?: string
) {
  if (!communicationId) {
    console.error("Cannot send message: communicationId is missing");
    return;
  }

  if (!content.trim()) {
    console.error("Cannot send message: message is empty");
    return;
  }

  const payload = {
    communicationId,
    content: content.trim(),
    ...(clientTempId ? { clientTempId } : {}),
  };

  if (!communicationSocket.connected) {
    console.log("Socket not connected yet. Waiting to send message...");

    communicationSocket.once("connect", () => {
      console.log("Socket connected. Sending message:", communicationId);
      communicationSocket.emit("sendMessage", payload);
    });

    return;
  }

  console.log("Socket sending message:", communicationId);

  communicationSocket.emit("sendMessage", payload);
}

/**
 * MARK MESSAGE READ
 */

export function markMessageRead(
  communicationSocket: Socket,
  messageId: string
) {
  if (!messageId) {
    console.error("Cannot mark message as read: messageId is missing");
    return;
  }

  if (!communicationSocket.connected) {
    communicationSocket.once("connect", () => {
      communicationSocket.emit("markMessageRead", { messageId });
    });

    return;
  }

  communicationSocket.emit("markMessageRead", { messageId });
}

/**
 * LISTENERS
 */

export function onNewMessage(callback: (message: Message) => void) {
  getCommunicationSocket().on("newMessage", callback);
}

export function offNewMessage(callback: (message: Message) => void) {
  if (!socket) return;
  socket.off("newMessage", callback);
}

/**
 * MESSAGE READ LISTENER
 */

export function onMessageRead(
  callback: (data: { messageId: string; readAt: string }) => void
) {
  getCommunicationSocket().on("messageRead", callback);
}

export function offMessageRead(
  callback: (data: { messageId: string; readAt: string }) => void
) {
  if (!socket) return;
  socket.off("messageRead", callback);
}

/**
 * INCOMING CALL
 */

export function onIncomingCall(callback: (data: unknown) => void) {
  getCommunicationSocket().on("incomingCall", callback);
}

export function offIncomingCall(callback: (data: unknown) => void) {
  if (!socket) return;
  socket.off("incomingCall", callback);
}

/**
 * DISCONNECT SOCKET
 */

export function disconnectCommunicationSocket() {
  if (socket) {
    console.log("Disconnecting communication socket...");
    socket.disconnect();
  }

  socket = null;
  socketToken = null;
}