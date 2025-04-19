import { useCallback, useRef } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import Callback1 = TypeU.Callback1



export const useRefGetSet = <T>(
  initialValue: T,
  onSet?: Callback1<T>,
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
