import { atom } from 'recoil'
import { DefaultTheme } from 'src/ui/theme/ThemeCollection.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import Theme = AppTheme.Theme







export type ThemeRecoilType = {
  theme: Theme
  themeIsReady: boolean
  systemThemeAvailable: boolean | undefined
}
const defolt: ThemeRecoilType = {
  theme: DefaultTheme,
  themeIsReady: false,
  systemThemeAvailable: undefined,
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'theme',
  default: defolt,
})




