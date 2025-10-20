import { useCallback, useState } from 'react'
import type { ValueOrProducer } from 'src/utils/base/tsUtils.ts'



export const useBool = (initialValue: ValueOrProducer<boolean>) => {
  const [value, set] = useState(initialValue)
  const setTrue = useCallback(() => set(true), [])
  const setFalse = useCallback(() => set(false), [])
  const toggle = useCallback(() => set(curr => !curr), [])
  return { value, setTrue, setFalse, toggle, set }
}
