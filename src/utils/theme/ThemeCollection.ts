import { AppTheme } from 'src/utils/theme/AppTheme'
import { DarkOrange } from 'src/utils/theme/themes/DarkOrange'
import Theme = AppTheme.Theme
import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import { DarkPinkGradient } from 'src/utils/theme/themes/DarkPinkGradient'
import { DarkSimple } from 'src/utils/theme/themes/DarkSimple'
import { DarkSimplePink } from 'src/utils/theme/themes/DarkSimplePink'
import { LightOrange } from 'src/utils/theme/themes/LightOrange'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import { LightPinkGradient } from 'src/utils/theme/themes/LightPinkGradient'
import { LightSimple } from 'src/utils/theme/themes/LightSimple'
import { LightSimplePink } from 'src/utils/theme/themes/LightSimplePink'



export const DefaultLightTheme = LightSimplePink
export const DefaultDarkTheme = DarkSimplePink
export const DefaultTheme = DefaultLightTheme



export const AllThemes = [
  LightSimple,
  DarkSimple,
  
  LightSimplePink,
  DarkSimplePink,
  
  LightPink,
  DarkPink,
  
  LightPinkGradient,
  DarkPinkGradient,
  
  LightOrange,
  DarkOrange,
] as const



export type AllThemeNamesType = typeof AllThemes[number]['name']




export const themeByName = (themeName: string): Theme => {
  return AllThemes.find(t=>t.name===themeName) ?? DefaultTheme
}
