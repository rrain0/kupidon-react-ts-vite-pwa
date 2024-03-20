import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil'
import { themeByName } from 'src/utils/theme/ThemeCollection'
import { useThemeDetector } from 'src/utils/theme/useThemeDetector'




export const useThemeSetup = ()=>{
  const [themeSettings,setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [theme,setTheme] = useRecoilState(ThemeRecoil)
  const systemThemeType = useThemeDetector()
  
  
  useLayoutEffect(
    ()=>{
      //console.log('systemTheme',systemThemeType)
      if (systemThemeType) setTheme(s=>({
        ...s,
        systemThemeAvailable: true,
      }))
      else setTheme(s=>({
        ...s,
        systemThemeAvailable: false,
      }))
    },
    [setTheme, systemThemeType]
  )
  
  
  useLayoutEffect(
    ()=>{
      const setting = themeSettings.setting
      if (setting==='system'){
        if (systemThemeType==='light')
          setTheme(s=>({
            ...s,
            theme: themeByName(themeSettings.light),
            themeIsReady: true,
          }))
        else if (systemThemeType==='dark')
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
    [setTheme, setThemeSettings, systemThemeType, themeSettings]
  )
  
  
  useLayoutEffect(()=>{
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
  },[theme.theme])
  
}