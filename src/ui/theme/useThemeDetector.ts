import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { useMedia } from '@util/react/media/useMedia.ts'
import ThemeType = AppTheme.Type


/*
  https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
  css 'color-scheme: light dark;'
 
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  css '@media (prefers-color-scheme: dark) { }'
*/


export const useThemeDetector = (): ThemeType|undefined =>{
  const isLight = useMedia('(prefers-color-scheme: light)')
  const isDark = useMedia('(prefers-color-scheme: dark)')
  if (isLight) return 'light'
  if (isDark) return 'dark'
  return undefined
}