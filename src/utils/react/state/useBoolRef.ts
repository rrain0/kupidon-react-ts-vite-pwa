import { useCallback } from 'react'
import type { Cb1 } from 'src/utils/base/tsUtils.ts'
import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'



export const useBoolRef = (
  initialValue: boolean,
  onSet?: Cb1<boolean>,
) => {
  const [get, set, ref] = useRefGetSet(initialValue, onSet)
  
  const getAndSetTrue = useCallback(() => {
    const v = get()
    set(true)
    return v
  }, [])
  
  const getAndSetFalse = useCallback(() => {
    const v = get()
    set(false)
    return v
  }, [])
  
  const setTrue = useCallback(() => {
    set(true)
  }, [])
  
  const setFalse = useCallback(() => {
    set(false)
  }, [])
  
  return {
    get, // stable
    set, // stable
    ref, // stable
    getAndSetTrue, // stable
    getAndSetFalse, // stable
    setTrue, // stable
    setFalse, // stable
    
    getToTrue: getAndSetTrue, // shortcut, stable
    getToFalse: getAndSetFalse, // shortcut, stable
  } as const
}
