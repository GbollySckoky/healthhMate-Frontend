import { io, Socket } from "socket.io-client";
import { Message } from "@/lib/interface/message";

let socket: Socket | null = null;
let socketToken: string | null = null;

/**
 * ============================================================
 * CONNECT SOCKET
 * ============================================================
 */

export function connectCommunicationSocket(token: string): Socket {
  if (!token) {
    throw new Error("Socket authentication token is required");
  }

  /**
   * If we already have a socket using the same token,
   * reuse it instead of creating another connection.
   */
  if (socket && socketToken === token) {
    return socket;
  }

  /**
   * If there is an old socket with a different token,
   * disconnect it before creating a new one.
   */
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socketToken = token;

  /**
   * IMPORTANT:
   *
   * Your NestJS gateway namespace is:
   *
   * @WebSocketGateway({
   *   namespace: '/communications'
   * })
   *
   * Therefore the Socket.IO namespace should be
   * /communications.
   */
  socket = io(
    "https://healthcare-backend-5y5b.onrender.com/communications",
    {
      auth: {
        token,
      },

      /**
       * Use websocket directly.
       *
       * You can remove this if you want Socket.IO's
       * polling -> websocket fallback.
       */
      transports: ["websocket"],

      /**
       * Automatically reconnect if connection drops.
       */
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }
  );

  /**
   * ============================================================
   * SOCKET EVENTS
   * ============================================================
   */

  socket.on("connect", () => {
    console.log(
      "✅ Communication socket connected:",
      socket?.id
    );
  });

  socket.on("disconnect", (reason) => {
    console.log(
      "❌ Communication socket disconnected:",
      reason
    );
  });

  socket.on("connect_error", (error) => {
    console.error(
      "❌ SOCKET CONNECT ERROR:",
      error
    );

    console.error(
      "Message:",
      error.message
    );
  });

  socket.on("authError", (error) => {
    console.error(
      "❌ Communication socket authentication error:",
      error
    );

    console.error(
      "Auth error message:",
      error?.message
    );
  });

  socket.on("error", (error) => {
    console.error(
      "❌ Communication socket server error:",
      error
    );
  });

  return socket;
}

/**
 * ============================================================
 * GET SOCKET
 * ============================================================
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
 * ============================================================
 * JOIN COMMUNICATION
 * ============================================================
 */

export function joinCommunication(
  communicationSocket: Socket,
  communicationId: string
) {
  if (!communicationId) {
    console.error(
      "Cannot join communication: communicationId is missing"
    );

    return;
  }

  /**
   * If socket is not connected yet,
   * wait for the connection before joining.
   */
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

  console.log(
    "Joining communication:",
    communicationId
  );

  communicationSocket.emit("joinCommunication", {
    communicationId,
  });
}

/**
 * ============================================================
 * SEND MESSAGE
 * ============================================================
 */

export function sendMessage(
  communicationSocket: Socket,
  communicationId: string,
  content: string
) {
  if (!communicationId) {
    console.error(
      "Cannot send message: communicationId is missing"
    );

    return;
  }

  if (!content.trim()) {
    console.error(
      "Cannot send message: message is empty"
    );

    return;
  }

  /**
   * Socket hasn't connected yet.
   *
   * Wait for connection and send once connected.
   */
  if (!communicationSocket.connected) {
    console.log(
      "Socket not connected yet. Waiting to send message..."
    );

    communicationSocket.once("connect", () => {
      console.log(
        "Socket connected. Sending message:",
        communicationId
      );

      communicationSocket.emit("sendMessage", {
        communicationId,
        content: content.trim(),
      });
    });

    return;
  }

  /**
   * Socket is already connected.
   */
  console.log(
    "Socket sending message:",
    communicationId
  );

  communicationSocket.emit("sendMessage", {
    communicationId,
    content: content.trim(),
  });
}

/**
 * ============================================================
 * MARK MESSAGE READ
 * ============================================================
 */

export function markMessageRead(
  communicationSocket: Socket,
  messageId: string
) {
  if (!messageId) {
    console.error(
      "Cannot mark message as read: messageId is missing"
    );

    return;
  }

  if (!communicationSocket.connected) {
    communicationSocket.once("connect", () => {
      communicationSocket.emit("markMessageRead", {
        messageId,
      });
    });

    return;
  }

  communicationSocket.emit("markMessageRead", {
    messageId,
  });
}

/**
 * ============================================================
 * LISTENERS
 * ============================================================
 */

export function onNewMessage(
  callback: (message: Message) => void
) {
  getCommunicationSocket().on(
    "newMessage",
    callback
  );
}

export function offNewMessage(
  callback: (message: Message) => void
) {
  if (!socket) return;

  socket.off(
    "newMessage",
    callback
  );
}

/**
 * ============================================================
 * MESSAGE READ LISTENER
 * ============================================================
 */

export function onMessageRead(
  callback: (data: {
    messageId: string;
    readAt: string;
  }) => void
) {
  getCommunicationSocket().on(
    "messageRead",
    callback
  );
}

export function offMessageRead(
  callback: (data: {
    messageId: string;
    readAt: string;
  }) => void
) {
  if (!socket) return;

  socket.off(
    "messageRead",
    callback
  );
}

/**
 * ============================================================
 * INCOMING CALL
 * ============================================================
 */

export function onIncomingCall(
  callback: (data: unknown) => void
) {
  getCommunicationSocket().on(
    "incomingCall",
    callback
  );
}

export function offIncomingCall(
  callback: (data: unknown) => void
) {
  if (!socket) return;

  socket.off(
    "incomingCall",
    callback
  );
}

/**
 * ============================================================
 * DISCONNECT SOCKET
 * ============================================================
 */

export function disconnectCommunicationSocket() {
  if (socket) {
    console.log(
      "Disconnecting communication socket..."
    );

    socket.disconnect();
  }

  socket = null;
  socketToken = null;
}
