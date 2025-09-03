import { useEffect, useState } from 'react'
import { useAsRefGet } from 'src/utils/react/state/useAsRefGet.ts'
import { useIsMount } from 'src/utils/react/state/useIsMount.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { Callback } from 'src/utils/base/TypeUtils.ts'
import { Producer } from 'src/utils/base/TypeUtils.ts'




// Use it to call async / imperative api.
// Triggers only once if deps changed:
// ● Does not trigger twice via react dev double rerender
// ● Can skip first render triggering
// Can't pass undefined as dependency,
// because it is impossible to distinct re-renders without using state

export const useEvent = (
  onEvent: Callback | Producer<Callback>,
  deps: any[] = [],
  triggerOnMount = false,
) => {
  
  
  
  const isMount = useIsMount()
  
  const [effectMarker, setEffectMarker] = useState(false)
  const [getEffectRefMarker, setEffectRefMarker] = useRefGetSet(false)
  
  
  // if state & ref are different in cleanup function than we can use cleanup
  const [cleanupMarker, setCleanupMarker] = useState(false)
  const [getCleanupRefMarker] = useAsRefGet(cleanupMarker)
  /* useEffect(() => {
    setCleanupMarker(true)
    return () => {
      console.log('useEvent cleanupMarker', cleanupMarker)
      console.log('useEvent getCleanupRefMarker()', getCleanupRefMarker())
    }
  }, undefined) */
  
  //const [getCurr] = useAsRefGet(deps)
  //const [getPrev, setPrev] = useRefGetSet<any[] | undefined>(undefined)
  
  const [getCleanup, setCleanup] = useRefGetSet<void | Callback>(undefined)
  
  useEffect(() => {
    setCleanupMarker(!cleanupMarker)
    if (effectMarker === getEffectRefMarker()) {
      setEffectMarker(!effectMarker)
      setEffectRefMarker(!effectMarker)
      
      if (isMount && !triggerOnMount) return
      
      const cleanup = onEvent()
      
      setCleanup(cleanup)
    }
    return () => {
      if (cleanupMarker !== getCleanupRefMarker()) {
        getCleanup()?.()
        setCleanup(undefined)
      }
    }
  }, deps)
  
}


