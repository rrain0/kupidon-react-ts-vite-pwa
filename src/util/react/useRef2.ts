import { useCallback, useRef } from 'react'


export const useRef2 = <T>(initialValue: T) => {
  const ref = useRef(initialValue)
  const get = useCallback(()=>ref.current, [])
  const set = useCallback((value: T)=>{ ref.current = value }, [])
  return [get, set, ref] as const
}