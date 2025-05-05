import { TypeU } from '@util/common/TypeU.ts'
import { createSelector } from 'reselect'
import { MbtiType } from 'src/api/model/MbtiType.ts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import isobject = TypeU.isobject
import nonemptyval = TypeU.nonemptyval
import emptyval = TypeU.emptyval
import Getter = TypeU.Getter



const zustandLsName = 'zustandMbti'



const recoilLsName = 'test-mbti'
// To trigger Zustand update from Recoil to Zustand
if (emptyval(localStorage.getItem(zustandLsName)) && nonemptyval(recoilLsName)) {
  localStorage.setItem(zustandLsName, JSON.stringify({ version: -1 }))
}


export type TestState = 'idle' | 'completed' | 'paused'

export interface MbtiZustandBase {
  answers: (null | number)[]
  totalCnt: number
}
export interface MbtiZustand extends MbtiZustandBase {
  getCntUnanswered: Getter<number>
  getTestState: Getter<TestState>
  getMbtiType: Getter<MbtiType | undefined>
}
export type MbtiZustandPersisted = Pick<MbtiZustand, 'answers'>



const getMbtiComputed = createSelector(
  (state: MbtiZustand) => state.answers,
  (state: MbtiZustand) => state.totalCnt,
  (a, total) => {
    const parts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0,
    }
    
    const cntUnanswered = (() => {
      let cnt = 0
      for (let i = 0; i < total; i++) {
        const ai = a[i]
        if (emptyval(ai)) {
          cnt++
        }
        else {
          if ([1, 4, 6, 14, 19].includes(i + 1)) {
            if (ai === 0) parts.E++
            if (ai === 1) parts.I++
          }
          if ([3, 7, 12, 17, 20].includes(i + 1)) {
            if (ai === 0) parts.S++
            if (ai === 1) parts.N++
          }
          if ([8, 10, 15, 18, 19].includes(i + 1)) {
            if (ai === 0) parts.T++
            if (ai === 1) parts.F++
          }
          if ([2, 5, 11, 13, 16].includes(i + 1)) {
            if (ai === 0) parts.J++
            if (ai === 1) parts.P++
          }
        }
      }
      return cnt
    })()
    
    const testState = (() => {
      if (cntUnanswered === total) return 'idle' as const
      if (cntUnanswered === 0) return 'completed' as const
      return 'paused' as const
    })()
    
    const mbtiType = (() => {
      if (testState !== 'completed') return undefined
      let type = ''
      type += parts.E > parts.I ? 'E' : 'I'
      type += parts.S > parts.N ? 'S' : 'N'
      type += parts.T > parts.F ? 'T' : 'F'
      type += parts.J > parts.P ? 'J' : 'P'
      return type as MbtiType
    })()
    
    return {
      cntUnanswered,
      testState,
      mbtiType,
    }
  },
)



export const useMbtiZustand = create<MbtiZustand>()(persist(
  (set, get, store) => ({
    answers: [],
    totalCnt: 20,
    getCntUnanswered: () => getMbtiComputed(get()).cntUnanswered,
    getTestState: () => getMbtiComputed(get()).testState,
    getMbtiType: () => getMbtiComputed(get()).mbtiType,
  }),
  {
    name: zustandLsName,
    storage: createJSONStorage(() => localStorage),
    version: 0,
    
    partialize: s => ({
      answers: s.answers,
    } satisfies MbtiZustandPersisted),
    
    migrate: (persisted: any, persistedVersion) => {
      if (persistedVersion <= 0) {
        const oldRaw = localStorage.getItem(recoilLsName)
        localStorage.removeItem(recoilLsName)
        const old = nonemptyval(oldRaw) ? JSON.parse(oldRaw) : undefined
        ;(persisted ??= { }).answers = []
        if (isobject(old)) {
          persisted.answers = old.answers
        }
      }
      return persisted
    },
  },
))


