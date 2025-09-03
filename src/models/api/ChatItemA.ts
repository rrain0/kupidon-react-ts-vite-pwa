import { ChatTypeA } from 'src/models/api/ChatA.ts'
import { ChatMessageA } from 'src/models/api/ChatMessageA.ts'




export type ChatProfileTypeA = 'USER'

export interface ChatItemProfileA {
  id: string
  type: ChatProfileTypeA
  name: string
  ava: string
  
  online: boolean
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
