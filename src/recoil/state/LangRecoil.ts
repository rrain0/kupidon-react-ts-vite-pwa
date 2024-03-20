import { atom } from 'recoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { Lang } from 'src/utils/lang/Lang'
import DefaultAppLang = Lang.DefaultAppLang
import AppLangType = Lang.AppLangType
import NonEmptyArr = ArrayUtils.NonEmptyArr




export type LangRecoilType = {
  lang: NonEmptyArr<AppLangType>
  availableSystemLangs: AppLangType[] | undefined
}
const defolt: LangRecoilType = {
  lang: [DefaultAppLang],
  availableSystemLangs: undefined,
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: defolt,
})


