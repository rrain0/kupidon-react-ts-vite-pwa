import { useCallback, useLayoutEffect, useRef } from 'react'



export const useEffectEvent =
<F extends (...args: any[])=>any>
(callback: F): F => {
  const ref = useRef(callback)
  useLayoutEffect(
    ()=>{ ref.current = callback }
  )
  const runCallback = useCallback(
    (...args: Parameters<F>)=>ref.current(...args),
    []
  ) as F
  return runCallback
}
  
  
  
  
  