import { TypeU } from '@util/common/TypeU.ts'
import { UserCurrentA } from 'src/model/api/UserA.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import isobject = TypeU.isobject
import nonemptyval = TypeU.nonemptyval
import isemptyval = TypeU.isemptyval
import Getter = TypeU.Getter
import Callback = TypeU.Callback



const zustandLsName = 'zustandAuth'


const recoilLsName = 'auth'
// To trigger Zustand update from Recoil to Zustand
if (isemptyval(localStorage.getItem(zustandLsName)) && nonemptyval(localStorage.getItem(recoilLsName))) {
  localStorage.setItem(zustandLsName, JSON.stringify({ version: -1 }))
}



export type AuthZustand = {
  accessToken: string | undefined
  user: UserCurrentA | undefined
  getIsAuth: Getter<boolean>
  logout: Callback
}




export const useAuthZustand = create<AuthZustand>()(persist(
  (set, get, store) => ({
    accessToken: undefined,
    user: undefined,
    getIsAuth: () => !!get().accessToken,
    logout: () => set({ accessToken: undefined, user: undefined }),
  }),
  {
    name: zustandLsName,
    storage: createJSONStorage(() => localStorage),
    
    version: 0,
    migrate: (persisted: any, persistedVersion) => {
      if (persistedVersion <= 0) {
        const oldRaw = localStorage.getItem(recoilLsName)
        localStorage.removeItem(recoilLsName)
        const old = nonemptyval(oldRaw) ? JSON.parse(oldRaw) : undefined
        if (isobject(old)) {
          persisted = old
        }
      }
      return persisted
    },
  },
))


