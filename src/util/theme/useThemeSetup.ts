import { useEffect, useLayoutEffect, useState } from 'react'
import { themeByName } from 'src/ui-data/theme/ThemeCollection.ts'
import { useBrowserMinimumVersion } from 'src/util/app/useBrowserMinimumVersion.ts'
import { useThemeDetector } from 'src/util/theme/useThemeDetector.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
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
  
  const themeSettings = useThemeSettingsZustand()
  const theme = useAppZustand(s => s.theme)
  const setApp = useAppZustand.setState
  
  const systemTheme = function() {
    const systemTheme = useThemeDetector()
    const [systemThemeMemo, setSystemThemeMemo] = useState(systemTheme)
    useEffect(() => {
      if (systemTheme) setSystemThemeMemo(systemTheme)
    }, [systemTheme])
    return systemThemeMemo
  }()
  
  const [themeIsReady, setThemeIsReady] = useState(false)
  
  useLayoutEffect(() => {
    const setting = themeSettings.setting
    if (setting === 'system') {
      if (systemTheme === 'light') {
        setApp({ theme: themeByName(themeSettings.light) })
        setThemeIsReady(true)
      }
      else if (systemTheme === 'dark') {
        setApp({ theme: themeByName(themeSettings.dark) })
        setThemeIsReady(true)
      }
      else {
        setApp({ theme: themeByName(themeSettings.light) })
        setThemeIsReady(true)
      }
    }
    else if (setting === 'manual') {
      if (themeSettings.manualSetting === 'light') {
        setApp({ theme: themeByName(themeSettings.light) })
        setThemeIsReady(true)
      }
      else if (themeSettings.manualSetting === 'dark') {
        setApp({ theme: themeByName(themeSettings.dark) })
        setThemeIsReady(true)
      }
    }
  }, [systemTheme, themeSettings])
  
  
  // apply to html meta tags
  useLayoutEffect(() => {
    const t = theme
    if (t) {
      const metaThemeColorElements = document.querySelectorAll(
        'html head meta[name=theme-color]'
      ) as NodeListOf<HTMLMetaElement>
      metaThemeColorElements.forEach(meta => meta.content = t.statusBar.bg)
      
      const metaBackgroundColorElements = document.querySelectorAll(
        'html head meta[name=background-color]'
      ) as NodeListOf<HTMLMetaElement>
      metaBackgroundColorElements.forEach(meta => meta.content = t.page.bg)
    }
  }, [theme])
  
  return themeIsReady
}
