import { useId, useLayoutEffect } from 'react'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'




export const useLockAppGestures = (lock = false) => {
  const setApp = useAppZustand.setState
  const gesturesBusyBy = useAppZustand(s => s.gesturesBusyBy)
  
  const reactId = useId()
  
  
  useLayoutEffect(() => {
    if (lock && gesturesBusyBy === undefined) {
      setApp({ gesturesBusyBy: reactId })
    }
    if (!lock && gesturesBusyBy === reactId) {
      setApp({ gesturesBusyBy: undefined })
    }
  }, [lock])
  
  const canThisComponentUseGestures = [undefined, reactId].includes(gesturesBusyBy)
  
  return canThisComponentUseGestures
}
