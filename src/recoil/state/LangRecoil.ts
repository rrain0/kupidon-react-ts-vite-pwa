import { atom } from 'recoil'
import { ArrayUtils } from 'src/util/common/ArrayUtils'
import { Lang } from '@util/lang0/Lang.ts'
import DefaultAppLang = Lang.DefaultAppLang
import AppLangType = Lang.AppLangType
import NonEmptyArr = ArrayUtils.NonEmptyArr




export type LangRecoilType = {
  lang: NonEmptyArr<AppLangType>
  availableSystemLangs: AppLangType[] | undefined
}
const Default: LangRecoilType = {
  lang: [DefaultAppLang],
  availableSystemLangs: undefined,
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: Default,
})


