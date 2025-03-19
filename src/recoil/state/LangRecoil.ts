import { atom } from 'recoil'
import { ArrayU } from '@util/common/ArrayU.ts'
import { Lang } from '@util/lang/Lang.ts'
import NonEmptyArr = ArrayU.NonEmptyArr




export type LangRecoilType = {
  langs: NonEmptyArr<Lang.Supported>
  canUseSystemLang: boolean
}
const Default: LangRecoilType = {
  langs: [Lang.Default],
  canUseSystemLang: false,
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: Default,
})


