import { useLayoutEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'



export const useAppInstallationSetup = () => {
  
  const setApp = useAppZustand.setState
  
  useLayoutEffect(() => {
    setApp({ canInstall: !!beforeInstallPromptEvent })
    onBeforeInstallPromptEvent = ev => {
      setApp({ canInstall: !!ev })
    }
    return () => { onBeforeInstallPromptEvent = undefined }
  }, [])
  
}