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