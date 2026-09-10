export interface CreateMessage {
    content: string
}

export type Message = {
  id: string
  communicationId: string
  senderType: string
  content: string
  isRead: boolean
  readAt: string
  createdAt: string
  updatedAt: string
}

export interface CallSession {
  id: string;
  communicationId: string;
  consultationType: "video_call" | "audio_call";
  status: string;
  agoraChannelName: string;
  expiresAt: string;
}

export interface AgoraCredentials {
  token: string;
  appId: string;
  channelName: string;
  uid: number | string | null;
  expiresAt?: string;
}