import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { Lang } from 'src/util/lang/Lang.ts'
import { useLangDetector } from 'src/util/lang/useLangDetector.ts'
import arrIsNonEmpty = ArrayU.arrIsNonEmpty
import destructCopyBy = ObjectU.destructCopyBy








export const useLangSetup = () => {
  const systemLangs = useLangDetector()
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  const [lang, setLang] = useRecoilState(LangRecoil)
  
  // console.log('lang',lang)
  // console.log('systemLangs',systemLangs)
  
  
  useLayoutEffect(() => {
    setLang(destructCopyBy({
      matchedSystemLangs: Lang.getMatchedAppLangs(systemLangs),
    }))
  }, [systemLangs])
  
  
  
  useLayoutEffect(
    () => {
      if (langSettings.setting==='system') {
        const matched = lang.matchedSystemLangs
        // language is not initialized yet, skip for next useLayoutEffect call
        if (!matched) return
        // check if array has any language
        if (arrIsNonEmpty(matched)) setLang(destructCopyBy({
          langs: [...matched, Lang.Default],
        }))
        // or else switch to manual mode
        else setLangSettings(destructCopyBy({
          setting: 'manual',
        }))
      }
      else if (langSettings.setting === 'manual') {
        if (langSettings.manualSetting) setLang(destructCopyBy({
          langs: [...langSettings.manualSetting, Lang.Default],
        }))
        else setLang(destructCopyBy({
          langs: [Lang.Default],
        }))
      }
    },
    [lang.matchedSystemLangs, langSettings]
  )
  
  
  // apply to html
  useLayoutEffect(() => {
    if (lang.langs) applyLangToHtml(lang.langs)
  }, [lang.langs])
  
}
