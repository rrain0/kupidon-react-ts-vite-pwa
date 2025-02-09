import { useCallback, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import ValueOrProducer = TypeU.ValueOrProducer



export const useBool = (initialValue: ValueOrProducer<boolean>) => {
  const [value, setValue] = useState(initialValue)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggleValue = useCallback(() => setValue(!value), [value])
  return [value, setTrue, setFalse, toggleValue, setValue] as const
}
