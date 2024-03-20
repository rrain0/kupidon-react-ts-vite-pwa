import { useCallback, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import ValueOrGenerator = TypeUtils.ValueOrGenerator




export const useBoolState = (initialValue: ValueOrGenerator<boolean>) => {
  const [value,setValue] = useState(initialValue)
  const setTrue = useCallback(()=>setValue(true), [])
  const setFalse = useCallback(()=>setValue(false), [])
  const toggleValue = useCallback(()=>setValue(!value), [value])
  return [value, setTrue, setFalse, toggleValue, setValue] as const
}


