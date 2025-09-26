import { useCallback, useRef } from 'react'
import type { Cb1 } from 'src/utils/base/tsUtils.ts'



export const useRefGetSet = <T>(
  initialValue: T,
  onSet?: Cb1<T>,
) => {
  const ref = useRef(initialValue)
  const get = useCallback(() => ref.current, [])
  
  const setRef = useRef(onSet)
  setRef.current = onSet
  
  const set = useCallback((value: T) => {
    ref.current = value
    setRef.current?.(value)
  }, [])
  
  return [
    get, // stable
    set, // stable
    ref, // stable
  ] as const
}
