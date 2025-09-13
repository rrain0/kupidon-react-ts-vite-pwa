import { useLayoutEffect, useMemo } from 'react'
import { arrIsNonEmpty } from 'src/utils/base/ArrayU.ts'
import { Lang } from 'src/utils/app/lang/Lang.ts'
import { useSystemLang } from 'src/utils/react/system/useSystemLang.ts'
import { useAppZustand } from 'src/zustand/app/appZustand.ts'
import { useLangSettingsZustand } from 'src/zustand/settings/langSettingsZustand.ts'





export const useLangSetup = () => {
  const systemLangs = useSystemLang()
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
      if (arrIsNonEmpty(matchedSystemLangs)) setApp({
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
