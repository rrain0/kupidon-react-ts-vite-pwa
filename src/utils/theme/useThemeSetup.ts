import { useEffect, useLayoutEffect, useState } from 'react'
import { themeByName } from 'src/ui-data/theme/ThemeCollection.ts'
import { useAppTheme } from 'src/utils/app/useAppTheme.ts'
import { useBrowserMinimumVersion } from 'src/utils/app/useBrowserMinimumVersion.ts'
import { useSetAppTheme } from 'src/utils/app/useSetAppTheme.ts'
import { useThemeDetector } from 'src/utils/theme/useThemeDetector.ts'
import { useThemeSettingsZustand } from 'src/zustand/settings/ThemeSettingsZustand.ts'




export const useThemeSetup = () => {
  useBrowserMinimumVersion({
    chromeDesktopVersion: '81',
    chromeAndroidVersion: '81',
    safariDesktopVersion: '13',
    safariIosVersion: '13',
    edgeDesktopVersion: '81',
    feature: 'css color-scheme',
  })
  
  const { type, manual, light, dark } = useThemeSettingsZustand()
  const theme = useAppTheme()
  const setTheme = useSetAppTheme()
  
  const systemTheme = (() => {
    const systemTheme = useThemeDetector()
    const [systemThemeMemo, setSystemThemeMemo] = useState(systemTheme)
    useEffect(() => {
      if (systemTheme) setSystemThemeMemo(systemTheme)
    }, [systemTheme])
    return systemThemeMemo
  })()
  
  const [themeIsReady, setThemeIsReady] = useState(false)
  
  useLayoutEffect(() => {
    if (type === 'system') {
      if (systemTheme === 'light') {
        setTheme(themeByName(light))
        setThemeIsReady(true)
      }
      else if (systemTheme === 'dark') {
        setTheme(themeByName(dark))
        setThemeIsReady(true)
      }
      else {
        setTheme(themeByName(light))
        setThemeIsReady(true)
      }
    }
    else if (type === 'manual') {
      if (manual === 'light') {
        setTheme(themeByName(light))
        setThemeIsReady(true)
      }
      else if (manual === 'dark') {
        setTheme(themeByName(dark))
        setThemeIsReady(true)
      }
    }
  }, [systemTheme, type, manual, light, dark])
  
  
  // apply to html meta tags
  useLayoutEffect(() => {
    const t = theme
    if (t) {
      const setMetaThemeColor = (color: string) => {
        (document
          .querySelectorAll('html head meta[name=theme-color]') as NodeListOf<HTMLMetaElement>)
          .forEach(meta => meta.content = color)
      }
      const setMetaBackgroundColor = (color: string) => {
        (document
          .querySelectorAll('html head meta[name=background-color]') as NodeListOf<HTMLMetaElement>)
          .forEach(meta => meta.content = color)
      }
      
      setMetaThemeColor(t.statusBar.bg)
      setMetaBackgroundColor(t.page.bg)
      
    }
  }, [theme])
  
  return themeIsReady
}
