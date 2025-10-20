import { useCallback, useState } from 'react'
import type { ValueOrProducer } from 'src/utils/base/tsUtils.ts'



export const useBool0 = (initialValue: ValueOrProducer<boolean>) => {
  const [value, setValue] = useState(initialValue)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggleValue = useCallback(() => setValue(!value), [value])
  return [value, setTrue, setFalse, toggleValue, setValue] as const
}
