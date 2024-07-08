import { atom } from 'recoil'
import { resettableLocalStorageEffect } from 'src/recoil/RecoilPersist'
import { ArrayU } from '@util/common/ArrayU.ts'
import { Lang } from '@util/lang/Lang.ts'
import NonEmptyArr = ArrayU.NonEmptyArr




export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: NonEmptyArr<Lang.Supported> | undefined
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
