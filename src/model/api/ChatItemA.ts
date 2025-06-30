import { ChatTypeA } from 'src/model/api/ChatA.ts'
import { ChatMessageA } from 'src/model/api/ChatMessageA.ts'



export interface ChatItemProfileA {
  id: string
  name: string
  ava: string
}

export interface ChatItemA {
  id: string
  type: ChatTypeA
  memberIds: string[]
  createdAt: string
  updatedAt: string
  profile: ChatItemProfileA
  lastMessage: ChatMessageA | null
}
