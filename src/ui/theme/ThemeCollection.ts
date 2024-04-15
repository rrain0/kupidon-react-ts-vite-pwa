import { AppTheme } from '@util/theme/AppTheme.ts'
import { DarkOrange } from 'src/ui/theme/themes/DarkOrange.ts'
import Theme = AppTheme.Theme
import { DarkPink } from 'src/ui/theme/themes/DarkPink.ts'
import { DarkPinkGradient } from 'src/ui/theme/themes/DarkPinkGradient.ts'
import { DarkSimple } from 'src/ui/theme/themes/DarkSimple.ts'
import { DarkSimplePink } from 'src/ui/theme/themes/DarkSimplePink.ts'
import { LightOrange } from 'src/ui/theme/themes/LightOrange.ts'
import { LightPink } from 'src/ui/theme/themes/LightPink.ts'
import { LightPinkGradient } from 'src/ui/theme/themes/LightPinkGradient.ts'
import { LightSimple } from 'src/ui/theme/themes/LightSimple.ts'
import { LightSimplePink } from 'src/ui/theme/themes/LightSimplePink.ts'



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
