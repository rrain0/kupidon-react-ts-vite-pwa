import { atom } from 'recoil'
import { ArrayUtils } from 'src/util/common/ArrayUtils'
import { Lang } from '@util/lang/Lang.ts'
import NonEmptyArr = ArrayUtils.NonEmptyArr




export type LangRecoilType = {
  langs: NonEmptyArr<Lang.Supported>
  matchedSystemLangs: Lang.Supported[] | undefined
}
const Default: LangRecoilType = {
  langs: [Lang.Default],
  matchedSystemLangs: undefined,
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: Default,
})


