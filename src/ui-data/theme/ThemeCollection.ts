import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import { DarkOrange } from 'src/ui-data/theme/themes/DarkOrange.tsx'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.tsx'
import { DarkPinkGradient } from 'src/ui-data/theme/themes/DarkPinkGradient.tsx'
import { Dark } from 'src/ui-data/theme/themes/Dark.tsx'
import { DarkWine } from 'src/ui-data/theme/themes/DarkWine.tsx'
import { LightOrange } from 'src/ui-data/theme/themes/LightOrange.tsx'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.tsx'
import { LightPinkGradient } from 'src/ui-data/theme/themes/LightPinkGradient.tsx'
import { Light } from 'src/ui-data/theme/themes/Light.tsx'
import { LightWine } from 'src/ui-data/theme/themes/LightWine.tsx'



export const DefaultLightTheme = LightWine
export const DefaultDarkTheme = DarkWine
export const DefaultTheme = DefaultLightTheme



export const AllThemes = [
  Light,
  Dark,
  
  LightWine,
  DarkWine,
  
  LightPink,
  DarkPink,
  
  LightPinkGradient,
  DarkPinkGradient,
  
  LightOrange,
  DarkOrange,
] as const



export type AllThemeNamesType = typeof AllThemes[number]['name']




export const themeByName = (themeName: string): Theme => {
  return AllThemes.find(t => t.name === themeName) ?? DefaultTheme
}
