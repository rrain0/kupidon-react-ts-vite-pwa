import React from 'react'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import LangSettings from 'src/components/LangSettings/LangSettings'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil'



const AutoLangSettings =
React.memo(
()=>{
  const langSettings = useRecoilValue(LangSettingsRecoil)
  //const lang = useRecoilValue(LangRecoil)
  
  
  const [open, setOpen] = useState(false)
  const [closeable, setCloseable] = useState(true)
  
  useEffect(
    ()=>{
      if (langSettings.setting==='manual' && !langSettings.manualSetting){
        setCloseable(false)
      }
      else setCloseable(true)
      
      if (!open && langSettings.setting==='manual' && !langSettings.manualSetting){
        setOpen(true)
      }
    },
    [open, langSettings.manualSetting, langSettings.setting]
  )
  
  
  return <LangSettings
    open={open}
    setOpen={setOpen}
    closeable={closeable}
  />
})
export default AutoLangSettings

