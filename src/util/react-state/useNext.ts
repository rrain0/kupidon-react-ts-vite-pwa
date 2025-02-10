import { useCallback, useState } from 'react'
import { RangeU } from 'src/util/common/RangeU.ts'



export const useNext = () => {
  const [value, setValue] = useState(0)
  const next = useCallback(() => {
    setValue(RangeU.loop(value + 1, [0, Number.MAX_SAFE_INTEGER]))
  }, [value])
  return [value, next] as const
}
