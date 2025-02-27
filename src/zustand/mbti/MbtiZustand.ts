import { TypeU } from '@util/common/TypeU.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import isstring = TypeU.isstring
import isobject = TypeU.isobject



const mbtiLsName = 'zustandMbti'



// To trigger Zustand update from Recoil to Zustand
if (localStorage.getItem(mbtiLsName) === null) {
  localStorage.setItem(mbtiLsName, JSON.stringify({ version: -1 }))
}



export type MbtiZustand = {
  answers: (null | number)[]
  totalCnt: number
}
export type MbtiZustandPersisted = Pick<MbtiZustand, 'answers'>



export const useMbtiZustand = create<MbtiZustand>()(persist(
  (set, get, store) => ({
    answers: [],
    totalCnt: 20,
  }),
  {
    name: mbtiLsName,
    storage: createJSONStorage(() => localStorage),
    version: 0,
    
    partialize: s => ({
      answers: s.answers,
    } satisfies MbtiZustandPersisted),
    
    migrate: (persisted: any, version) => {
      if (version <= 0) {
        const recoilLsName ='test-mbti'
        const oldRaw = localStorage.getItem(recoilLsName)
        localStorage.removeItem(recoilLsName)
        const old = isstring(oldRaw) ? JSON.parse(oldRaw) : undefined
        ;(persisted ??= { }).answers = []
        if (isobject(old)) {
          persisted.answers = old.answers
        }
      }
      return persisted
    },
  },
))


