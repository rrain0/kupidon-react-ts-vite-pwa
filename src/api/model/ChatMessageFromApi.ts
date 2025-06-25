

export interface ChatMessageFromApi {
  id: string
  chatId: string
  fromUserId: string
  createdAt: string
  updatedAt: string
  content: { text: string }
}

