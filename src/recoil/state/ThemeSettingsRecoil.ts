import { atom } from 'recoil'
import { resettableLocalStorageEffect } from 'src/recoil/RecoilPersist'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { DefaultDarkTheme, DefaultLightTheme } from 'src/ui/theme/ThemeCollection.ts'




export type ThemeSettingsStateType = {
  setting: 'manual'|'system',
  manualSetting: AppTheme.Type,
  light: string,
  dark: string,
}
const defolt: ThemeSettingsStateType = {
  setting: 'system',
  manualSetting: 'light',
  light: DefaultLightTheme.name,
  dark: DefaultDarkTheme.name,
}
export const ThemeSettingsRecoil = atom<ThemeSettingsStateType>({
  key: 'themeSettings',
  default: defolt,
  effects: [resettableLocalStorageEffect(defolt)],
})
