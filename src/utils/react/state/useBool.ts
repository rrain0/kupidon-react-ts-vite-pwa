import { useCallback, useState } from 'react'

import { ValueOrProducer } from 'src/utils/base/math/typeUtils.ts'



export const useBool = (initialValue: ValueOrProducer<boolean>) => {
  const [value, setValue] = useState(initialValue)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggleValue = useCallback(() => setValue(!value), [value])
  return [value, setTrue, setFalse, toggleValue, setValue] as const
}
