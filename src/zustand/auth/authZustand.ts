import { UserCurrentA } from 'src/models/api/UserA.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { isobject } from '@utils/base/tsUtils.ts'
import { isnotnullundef } from '@utils/base/tsUtils.ts'
import { isnullundef } from '@utils/base/tsUtils.ts'
import { Getter } from '@utils/base/tsUtils.ts'
import { Cb } from '@utils/base/tsUtils.ts'



const zustandLsName = 'zustandAuth'


const recoilLsName = 'auth'
// To trigger Zustand update from Recoil to Zustand
if (
  isnullundef(localStorage.getItem(zustandLsName)) &&
  isnotnullundef(localStorage.getItem(recoilLsName))
) {
  localStorage.setItem(zustandLsName, JSON.stringify({ version: -1 }))
}



export type AuthZustand = {
  accessToken: string | undefined
  user: UserCurrentA | undefined
  getIsAuth: Getter<boolean>
  logout: Cb
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
        const old = isnotnullundef(oldRaw) ? JSON.parse(oldRaw) : undefined
        if (isobject(old)) {
          persisted = old
        }
      }
      return persisted
    },
  },
))


