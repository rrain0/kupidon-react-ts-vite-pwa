import { useLayoutEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { Lang } from 'src/util/lang/Lang.ts'
import { useLangDetector } from 'src/util/lang/useLangDetector.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import destructCopyBy = ObjectU.destructCopyBy





export const useLangSetup = () => {
  const systemLangs = useLangDetector()
  const matchedSystemLangs = useMemo(() => {
    return Lang.getMatchedAppLangs(systemLangs)
  }, [systemLangs])
  
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  const langs = useAppZustand(s => s.langs)
  const setApp = useAppZustand.setState
  
  
  // console.log('lang',lang)
  // console.log('systemLangs',systemLangs)
  
  
  useLayoutEffect(() => {
    setApp({ canUseSystemLang: !!matchedSystemLangs.length })
  }, [systemLangs])
  
  
  
  useLayoutEffect(() => {
    if (langSettings.setting === 'system') {
      // language is not initialized yet, skip for next useLayoutEffect call
      if (!matchedSystemLangs) return
      // check if array has any language
      if (ArrayU.isNonEmpty(matchedSystemLangs)) setApp({
        langs: [...matchedSystemLangs, Lang.Default],
      })
      // or else switch to manual mode
      else setLangSettings(destructCopyBy({
        setting: 'manual',
      }))
    }
    else if (langSettings.setting === 'manual') {
      if (langSettings.manualSetting) setApp({
        langs: [...langSettings.manualSetting, Lang.Default],
      })
      else setApp({ langs: [Lang.Default] })
    }
  }, [matchedSystemLangs, langSettings])
  
  
  // apply to html
  useLayoutEffect(() => {
    if (langs) applyLangToHtml(langs)
  }, [langs])
  
}
