import { TypeU } from '@util/common/TypeU.ts'
import { atom, selector } from 'recoil'
import { resettableLocalStorageEffect } from 'src/recoil/RecoilPersist.ts'
import exists = TypeU.exists




export type TestMbtiRecoilType = {
  answers: (null | number)[]
}
const Default: TestMbtiRecoilType = {
  answers: [],
}
export const TestMbtiRecoil = atom<TestMbtiRecoilType>({
  key: 'test-mbti',
  default: Default,
  effects: [resettableLocalStorageEffect(Default)],
})


export const TestMbtiRecoilTestState = selector({
  key: 'test-mbti-computed',
  get: ({ get }) => {
    const answeredCnt = get(TestMbtiRecoil).answers
      .reduce<number>((acc, curr) => exists(curr) ? acc + 1 : acc, 0)
    if (answeredCnt === 0) return 'idle' as const
    if (answeredCnt === 20) return 'complete' as const
    if (answeredCnt >= 21) throw new Error('Too many answers')
    return 'paused' as const
  },
})


