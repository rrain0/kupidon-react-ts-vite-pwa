import { useLayoutEffect, useMemo } from 'react'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { Lang } from 'src/util/lang/Lang.ts'
import { useLangDetector } from 'src/util/lang/useLangDetector.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useLangSettingsZustand } from 'src/zustand/settings/LangSettingsZustand.ts'





export const useLangSetup = () => {
  const systemLangs = useLangDetector()
  const matchedSystemLangs = useMemo(() => {
    return Lang.getMatchedAppLangs(systemLangs)
  }, [systemLangs])
  
  const { type, manual } = useLangSettingsZustand()
  const setLangSettings = useLangSettingsZustand.setState
  const langs = useAppZustand(s => s.langs)
  const setApp = useAppZustand.setState
  
  
  // console.log('lang',lang)
  // console.log('systemLangs',systemLangs)
  
  
  useLayoutEffect(() => {
    setApp({ canUseSystemLang: !!matchedSystemLangs.length })
  }, [systemLangs])
  
  
  
  useLayoutEffect(() => {
    if (type === 'system') {
      // language is not initialized yet, skip for next useLayoutEffect call
      if (!matchedSystemLangs) return
      // check if array has any language
      if (ArrayU.isNonEmpty(matchedSystemLangs)) setApp({
        langs: [...matchedSystemLangs, Lang.Default],
      })
      // or else switch to manual mode
      else setLangSettings({ type: 'manual' })
    }
    else if (type === 'manual') {
      if (manual) setApp({
        langs: [...manual, Lang.Default],
      })
      else setApp({ langs: [Lang.Default] })
    }
  }, [matchedSystemLangs, type, manual])
  
  
  // apply to html
  useLayoutEffect(() => {
    if (langs) applyLangToHtml(langs)
  }, [langs])
  
}
