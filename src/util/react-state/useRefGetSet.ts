import { useCallback, useRef } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import Callback1 = TypeU.Callback1


export const useRefGetSet = <T>(initialValue: T, onSet?: Callback1<T>, deps = [] as any[]) => {
  const ref = useRef(initialValue)
  const get = useCallback(() => ref.current, [])
  const set = useCallback((value: T) => {
    ref.current = value
    onSet?.(ref.current)
  }, deps)
  return [get, set, ref] as const
}
