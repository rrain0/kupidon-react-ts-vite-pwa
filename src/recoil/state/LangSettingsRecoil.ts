import { atom } from 'recoil'
import { resettableLocalStorageEffect } from 'src/recoil/RecoilPersist'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { Lang } from 'src/utils/lang/Lang'
import AppLangType = Lang.AppLangType
import NonEmptyArr = ArrayUtils.NonEmptyArr




export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: NonEmptyArr<AppLangType> | undefined
}
const defolt: LangSettingsRecoilType = {
  setting: 'system',
  manualSetting: undefined,
}
export const LangSettingsRecoil = atom<LangSettingsRecoilType>({
  key: langSettingsName,
  default: defolt,
  effects: [resettableLocalStorageEffect(defolt)],
})
