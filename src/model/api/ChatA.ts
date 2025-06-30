


export type ChatTypeA = 'PERSONAL'

export interface ChatA {
  id: string
  type: ChatTypeA
  memberIds: string[]
  createdAt: string
  updatedAt: string
}
