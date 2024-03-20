import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'



export const useAppInstallationSetup = ()=>{
  
  const [app, setApp] = useRecoilState(AppRecoil)
  
  useLayoutEffect(()=>{
    setApp(s=>({ ...s, canInstall: !!beforeInstallPromptEvent }))
    onBeforeInstallPromptEvent = ev=>{
      setApp(s=>({ ...s, canInstall: !!ev }))
    }
    return ()=>onBeforeInstallPromptEvent=undefined
  },[setApp])
  
}