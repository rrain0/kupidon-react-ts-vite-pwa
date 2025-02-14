import { TypeU } from '@util/common/TypeU.ts'
import { atom, selector } from 'recoil'
import { MbtiType } from 'src/api/model/MbtiType.ts'
import { resettableLocalStorageEffect } from 'src/recoil/RecoilPersist.ts'
import notExists = TypeU.notExists




export type MbtiRecoilType = {
  answers: (null | number)[]
  totalCnt: number
}
const Default: MbtiRecoilType = {
  answers: [],
  totalCnt: 20,
}
export const MbtiRecoil = atom<MbtiRecoilType>({
  key: 'test-mbti',
  default: Default,
  effects: [resettableLocalStorageEffect(Default)],
})


export const MbtiRecoilComputed = selector({
  key: 'test-mbti-computed',
  get: ({ get }) => {
    const { answers: a, totalCnt: total } = get(MbtiRecoil)
    
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
        if (notExists(ai)) {
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
      // TODO MBTI >= ???
      type += parts.T >= parts.F ? 'T' : 'F'
      type += parts.J >= parts.P ? 'J' : 'P'
      return type as MbtiType
    })()
    
    return {
      cntUnanswered,
      testState,
      mbtiType,
    }
  },
})

