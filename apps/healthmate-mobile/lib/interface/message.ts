export interface CreateMessage {
    content: string
}

export type Message = {
  id: string
  communicationId: string
  senderType: string
  content: string
  isRead: boolean
  readAt: any
  createdAt: string
  updatedAt: string
}