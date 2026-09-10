import { io, Socket } from "socket.io-client";
import { Message } from "../interface/communication";

let socket: Socket | null = null;
let socketToken: string | null = null;

export function connectCommunicationSocket(token: string) {
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

    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_API_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
        console.log("✅ Communication socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
        console.log("❌ Communication socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
        console.error("❌ SOCKET CONNECT ERROR:", error);
    });

    return socket;
}

/**
 * GET COMMUNICATION
 */

export function getCommunicationSocket (): Socket {
    if(!socket){
        throw new Error(
            "Socket not connected, call connectCommunicationSocket first"
        )
    }

    return socket
}

/**
 * JOIN COMMUNICATION
 */

export function joinCommunication (
    communicationSocket: Socket,
    communicationId: string
) {
    if(!communicationId){
        console.error("Cannot join communication: communicationId is missing");
        console.log("Cannot join communication: communicationId is missing");
        return
    }

    if(!communicationSocket.connected){
        communicationSocket.once('connect', () => {
            console.log(
            "Joining communication after socket connected:",
            communicationId
        );
        })

        communicationSocket.emit('joinedCommunication',{
            communicationId
        })

        return
    }

    console.log("Joining communication:", communicationId);

  communicationSocket.emit("joinCommunication", {
    communicationId,
  });
}

export function sendMessage(
    communicationSocket: Socket,
    communicationId: string,
    content: string,
    clientTempId?: string
){
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
 * 
 * MARK AS READ
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

export function onCallEnded(callback: (data: unknown) => void) {
  getCommunicationSocket().on('callEnded', callback);
}

export function offCallEnded(callback: (data: unknown) => void) {
  getCommunicationSocket().off('callEnded', callback);
}