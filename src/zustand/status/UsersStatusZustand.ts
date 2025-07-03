import { create } from 'zustand'



export type UserStatus = {
  id: string
  online: boolean
}

export type UsersStatusZustand = Record<string, { map: Map<string, UserStatus> }>



export const useUsersStatusZustand = create<UsersStatusZustand>()(
  (set, get, store) => ({ })
)


