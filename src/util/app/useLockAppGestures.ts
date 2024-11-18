import { useId, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'




export const useLockAppGestures = (lock = false) => {
  const [{ gesturesBusyBy }, setAppRecoil] = useRecoilState(AppRecoil)
  const reactId = useId()
  
  
  useLayoutEffect(
    () => {
      if (lock && gesturesBusyBy === undefined) {
        setAppRecoil(s => ({ ...s, gesturesBusyBy: reactId }))
      }
      if (!lock && gesturesBusyBy === reactId) {
        setAppRecoil(s => ({ ...s, gesturesBusyBy: undefined }))
      }
    },
    [lock]
  )
  
  const canThisComponentUseGestures = [undefined, reactId].includes(gesturesBusyBy)
  
  return canThisComponentUseGestures
}
