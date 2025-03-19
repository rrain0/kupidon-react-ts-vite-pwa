import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { Lang } from '@util/lang/Lang.ts'
import { CurrentUser } from 'src/api/model/CurrentUser.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import isobject = TypeU.isobject
import exists = TypeU.exists
import notExists = TypeU.notExists
import NonEmptyArr = ArrayU.NonEmptyArr



const zustandLsName = 'zustandAuth'


const recoilLsName = 'auth'
// To trigger Zustand update from Recoil to Zustand
if (notExists(localStorage.getItem(zustandLsName)) && exists(recoilLsName)) {
  localStorage.setItem(zustandLsName, JSON.stringify({ version: -1 }))
}



export type AuthZustand = {
  accessToken: string
  user: CurrentUser
} | undefined




export const useAuthZustand = create<AuthZustand>()(persist(
  (set, get, store) => undefined,
  {
    name: zustandLsName,
    storage: createJSONStorage(() => localStorage),
    
    version: 0,
    migrate: (persisted: any, persistedVersion) => {
      if (persistedVersion <= 0) {
        const oldRaw = localStorage.getItem(recoilLsName)
        localStorage.removeItem(recoilLsName)
        const old = exists(oldRaw) ? JSON.parse(oldRaw) : undefined
        if (isobject(old)) {
          persisted = old
        }
      }
      return persisted
    },
  },
))


