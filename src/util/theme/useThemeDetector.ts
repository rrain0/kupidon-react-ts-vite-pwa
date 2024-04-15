import { useBrowserMinimumVersion } from 'src/util/react/useBrowserMinimumVersion.ts'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { useMedia } from 'src/util/react/media/useMedia.ts'
import ThemeType = AppTheme.Type



/*
  https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
  css 'color-scheme: light dark;'
 
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  css '@media (prefers-color-scheme: dark) { }'
  css '@media (prefers-color-scheme: light) { }'
*/


export const useThemeDetector = (): ThemeType|undefined => {
  useBrowserMinimumVersion({
    chromeDesktopVersion: '76',
    chromeAndroidVersion: '76',
    safariDesktopVersion: '12.1',
    safariIosVersion: '13',
    edgeDesktopVersion: '79',
    feature: 'css prefers-color-scheme media feature',
  })
  
  const isLight = useMedia('(prefers-color-scheme: light)')
  const isDark = useMedia('(prefers-color-scheme: dark)')
  if (isLight) return 'light'
  if (isDark) return 'dark'
  return undefined
}