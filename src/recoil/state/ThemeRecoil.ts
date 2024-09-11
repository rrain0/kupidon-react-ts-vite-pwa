import { atom } from 'recoil'
import { DefaultTheme } from 'src/ui-data/theme/ThemeCollection.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Theme = AppTheme.Theme







export type ThemeRecoilType = {
  theme: Theme
}
const Default: ThemeRecoilType = {
  theme: DefaultTheme,
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'theme',
  default: Default,
})




