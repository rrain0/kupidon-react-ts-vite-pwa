import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { LangSettingsRecoil, } from 'src/recoil/state/LangSettingsRecoil.ts'
import { ArrayUtils } from '@util/common/ArrayUtils.ts'
import { Lang } from 'src/ui/lang/Lang.ts'
import { useLangDetector } from 'src/ui/lang/useLangDetector.ts'
import arrIsNonEmpty = ArrayUtils.arrIsNonEmpty
import AllAppLangs = Lang.AllAppLangs
import DefaultAppLang = Lang.DefaultAppLang
import AppLangType = Lang.AppLangType




function getAvailableSystemLangs(systemLangs: string[] | undefined): AppLangType[] {
  return (systemLangs??[]).filter(sl=>AllAppLangs.includes(sl as any)) as AppLangType[]
}



export const useLangSetup = ()=>{
  const [langSettings,setLangSettings] = useRecoilState(LangSettingsRecoil)
  const [lang,setLang] = useRecoilState(LangRecoil)
  const systemLangs = useLangDetector()
  
  //console.log('lang',lang)
  //console.log('systemLangs',systemLangs)
  
  
  useLayoutEffect(
    ()=>{
      setLang(s=>({ ...s,
        availableSystemLangs: getAvailableSystemLangs(systemLangs),
      }))
    },
    [setLang, systemLangs]
  )
  
  
  
  useLayoutEffect(
    ()=>{
      if (langSettings.setting==='system'){
        const available = lang.availableSystemLangs
        if (!available) return
        if (arrIsNonEmpty(available)) setLang(s=>({
          ...s,
          lang: [...available,DefaultAppLang],
        }))
        else setLangSettings({
          ...langSettings,
          setting: 'manual',
        })
      }
      else if (langSettings.setting==='manual') {
        if (langSettings.manualSetting) setLang(s=>({
          ...s,
          lang: langSettings.manualSetting!,
        }))
        else setLang(s=>({
          ...s,
          lang: [DefaultAppLang],
        }))
      }
    },
    [lang.availableSystemLangs, langSettings, setLang, setLangSettings]
  )
  
  
  useLayoutEffect(()=>{
    if (lang.lang){
      setHtmlTags(lang.lang)
    }
  },[lang.lang])
  
}