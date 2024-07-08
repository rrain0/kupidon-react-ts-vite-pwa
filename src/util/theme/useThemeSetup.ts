import { useEffect, useLayoutEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil.ts'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil.ts'
import { themeByName } from 'src/ui-props/themes/ThemeCollection.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { useBrowserMinimumVersion } from 'src/util/app/useBrowserMinimumVersion.ts'
import { useThemeDetector } from 'src/util/theme/useThemeDetector.ts'
import destructCopyBy = ObjectU.destructCopyBy




export const useThemeSetup = ()=>{
  useBrowserMinimumVersion({
    chromeDesktopVersion: '81',
    chromeAndroidVersion: '81',
    safariDesktopVersion: '13',
    safariIosVersion: '13',
    edgeDesktopVersion: '81',
    feature: 'css color-scheme',
  })
  
  const themeSettings = useRecoilValue(ThemeSettingsRecoil)
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  
  const systemTheme = function(){
    const systemTheme = useThemeDetector()
    const [systemThemeMemo, setSystemThemeMemo] = useState(systemTheme)
    useEffect(()=>{
      if (systemTheme) setSystemThemeMemo(systemTheme)
    }, [systemTheme])
    return systemThemeMemo
  }()
  
  const [themeIsReady, setThemeIsReady] = useState(false)
  
  useLayoutEffect(
    ()=>{
      const setting = themeSettings.setting
      if (setting==='system'){
        if (systemTheme==='light'){
          setTheme(destructCopyBy({
            theme: themeByName(themeSettings.light),
          }))
          setThemeIsReady(true)
        }
        else if (systemTheme==='dark') {
          setTheme(destructCopyBy({
            theme: themeByName(themeSettings.dark),
          }))
          setThemeIsReady(true)
        }
        else {
          setTheme(destructCopyBy({
            theme: themeByName(themeSettings.light),
          }))
          setThemeIsReady(true)
        }
      }
      else if (setting==='manual'){
        if (themeSettings.manualSetting==='light') {
          setTheme(destructCopyBy({
            theme: themeByName(themeSettings.light),
          }))
          setThemeIsReady(true)
        }
        else if (themeSettings.manualSetting==='dark') {
          setTheme(destructCopyBy({
            theme: themeByName(themeSettings.dark),
          }))
          setThemeIsReady(true)
        }
      }
    },
    [systemTheme, themeSettings]
  )
  
  
  // apply to html meta tags
  useLayoutEffect(
    ()=>{
      const t = theme.theme
      if (t){
        const metaThemeColorElements =
          document.querySelectorAll(
            'html head meta[name=theme-color]'
          ) as NodeListOf<HTMLMetaElement>
        metaThemeColorElements
          .forEach(meta=>meta.content=t.statusBar.bgc[0])
        
        const metaBackgroundColorElements =
          document.querySelectorAll(
            'html head meta[name=background-color]'
          ) as NodeListOf<HTMLMetaElement>
        metaBackgroundColorElements
          .forEach(meta=>meta.content=t.page.bgc[0])
      }
    },
    [theme.theme]
  )
  
  return themeIsReady
}