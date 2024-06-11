import { AppTheme } from '@util/theme/AppTheme.ts'
import { DarkOrange } from 'src/ui-props/themes/themes/DarkOrange.ts'
import Theme = AppTheme.Theme
import { DarkPink } from 'src/ui-props/themes/themes/DarkPink.ts'
import { DarkPinkGradient } from 'src/ui-props/themes/themes/DarkPinkGradient.ts'
import { Dark } from 'src/ui-props/themes/themes/Dark.ts'
import { DarkBurgundy } from 'src/ui-props/themes/themes/DarkBurgundy.ts'
import { LightOrange } from 'src/ui-props/themes/themes/LightOrange.ts'
import { LightPink } from 'src/ui-props/themes/themes/LightPink.ts'
import { LightPinkGradient } from 'src/ui-props/themes/themes/LightPinkGradient.ts'
import { Light } from 'src/ui-props/themes/themes/Light.ts'
import { LightBurgundy } from 'src/ui-props/themes/themes/LightBurgundy.ts'



export const DefaultLightTheme = LightBurgundy
export const DefaultDarkTheme = DarkBurgundy
export const DefaultTheme = DefaultLightTheme



export const AllThemes = [
  Light,
  Dark,
  
  LightBurgundy,
  DarkBurgundy,
  
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
