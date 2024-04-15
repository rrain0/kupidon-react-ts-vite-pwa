import { atom } from 'recoil'
import { resettableLocalStorageEffect } from 'src/recoil/RecoilPersist'
import { ArrayUtils } from 'src/util/common/ArrayUtils'
import { Lang } from '@util/lang0/Lang.ts'
import AppLangType = Lang.AppLangType
import NonEmptyArr = ArrayUtils.NonEmptyArr




export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: NonEmptyArr<AppLangType> | undefined
}
const Default: LangSettingsRecoilType = {
  setting: 'system',
  manualSetting: undefined,
}
export const LangSettingsRecoil = atom<LangSettingsRecoilType>({
  key: langSettingsLocalStorageName,
  default: Default,
  effects: [resettableLocalStorageEffect(Default)],
})
