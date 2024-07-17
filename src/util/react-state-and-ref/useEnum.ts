import { useMemo, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import ValueOrGenerator = TypeU.ValueOrGenerator



export const useEnum = <const E>(initialValue: ValueOrGenerator<E>, values: E[]) => {
  const [value, setValue] = useState(initialValue)
  const setters = useMemo(() => {
    return values.map(v => () => setValue(v))
  }, values)
  return [value, ...setters, setValue] as const
}

