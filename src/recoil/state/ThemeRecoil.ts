import { atom } from 'recoil'
import { DefaultTheme } from 'src/ui/theme/ThemeCollection.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import Theme = AppTheme.Theme







export type ThemeRecoilType = {
  theme: Theme
  themeIsReady: boolean
  systemThemeAvailable: boolean | undefined
}
const Default: ThemeRecoilType = {
  theme: DefaultTheme,
  themeIsReady: false,
  systemThemeAvailable: undefined,
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'theme',
  default: Default,
})




