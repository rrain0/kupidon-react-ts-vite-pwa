import { useLayoutEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil.ts'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil.ts'
import { themeByName } from 'src/ui/theme/ThemeCollection.ts'
import { useBrowserMinimumVersion } from 'src/util/react/useBrowserMinimumVersion.ts'
import { useThemeDetector } from 'src/util/theme/useThemeDetector.ts'




export const useThemeSetup = ()=>{
  useBrowserMinimumVersion({
    chromeDesktopVersion: '81',
    chromeAndroidVersion: '81',
    safariDesktopVersion: '13',
    safariIosVersion: '13',
    edgeDesktopVersion: '81',
    feature: 'css color-scheme',
  })
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  const systemTheme = useThemeDetector()
  const systemThemeMemo = useMemo(()=>{
  
  }, [systemTheme])
  
  
  useLayoutEffect(
    ()=>{
      //console.log('systemTheme',systemTheme)
      if (systemTheme) setTheme(s=>({
        ...s,
        systemThemeAvailable: true,
      }))
      else setTheme(s=>({
        ...s,
        systemThemeAvailable: false,
      }))
    },
    [setTheme, systemTheme]
  )
  
  
  useLayoutEffect(
    ()=>{
      const setting = themeSettings.setting
      if (setting==='system'){
        if (systemTheme==='light')
          setTheme(s=>({
            ...s,
            theme: themeByName(themeSettings.light),
            themeIsReady: true,
          }))
        else if (systemTheme==='dark')
          setTheme(s=>({
            ...s,
            theme: themeByName(themeSettings.dark),
            themeIsReady: true,
          }))
        else {
          /* setThemeSettings(s=>({
            ...s,
            setting: 'manual',
          })) */
          setTheme(s=>({
            ...s,
            theme: themeByName(themeSettings.light),
            themeIsReady: true,
          }))
        }
      }
      else if (setting==='manual'){
        if (themeSettings.manualSetting==='light')
          setTheme(s=>({
            ...s,
            theme: themeByName(themeSettings.light),
            themeIsReady: true,
          }))
        else if (themeSettings.manualSetting==='dark')
          setTheme(s=>({
            ...s,
            theme: themeByName(themeSettings.dark),
            themeIsReady: true,
          }))
      }
    },
    [setTheme, setThemeSettings, systemTheme, themeSettings]
  )
  
  
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
  
}