import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import Theme = AppTheme.Theme
import { DarkOrange } from 'src/styles/themes/themes/DarkOrange.tsx'
import { DarkPink } from 'src/styles/themes/themes/DarkPink.tsx'
import { DarkPinkGradient } from 'src/styles/themes/themes/DarkPinkGradient.tsx'
import { Dark } from 'src/styles/themes/themes/Dark.tsx'
import { DarkWine } from 'src/styles/themes/themes/DarkWine.tsx'
import { LightOrange } from 'src/styles/themes/themes/LightOrange.tsx'
import { LightPink } from 'src/styles/themes/themes/LightPink.tsx'
import { LightPinkGradient } from 'src/styles/themes/themes/LightPinkGradient.tsx'
import { Light } from 'src/styles/themes/themes/Light.tsx'
import { LightWine } from 'src/styles/themes/themes/LightWine.tsx'



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
