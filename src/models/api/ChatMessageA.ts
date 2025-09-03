

export interface ChatMessageA {
  id: string
  chatId: string
  fromUserId: string
  createdAt: string
  updatedAt: string
  content: ChatMessageContentA
}



export interface ChatMessageContentA {
  text: string
}