import React from 'react'
import { useEffect, useState } from 'react'
import LangSettings from 'src/components/widgets/LangSettings/LangSettings.tsx'
import { useLangSettingsZustand } from 'src/zustand/settings/langSettingsZustand.ts'



const AutoLangSettings = React.memo(() => {
  const { type, manual } = useLangSettingsZustand()
  
  
  const [open, setOpen] = useState(false)
  const [closeable, setCloseable] = useState(true)
  
  useEffect(() => {
    if (type === 'manual' && !manual) {
      setCloseable(false)
    }
    else setCloseable(true)
    
    if (!open && type === 'manual' && !manual) {
      setOpen(true)
    }
  }, [open, manual, type])
  
  
  return (
    <LangSettings
      open={open}
      setOpen={setOpen}
      closeable={closeable}
    />
  )
})
export default AutoLangSettings

