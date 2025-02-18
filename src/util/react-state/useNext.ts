import { useCallback, useState } from 'react'
import { RangeU } from 'src/util/common/RangeU.ts'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'



export const useNext = () => {
  const [value, setValue] = useState(0)
  
  const [getNext] = useAsRefGet(() => {
    const v = RangeU.loop(value + 1, [0, 1e6])
    setValue(v)
  })
  
  const next = useCallback(() => getNext()(), [])
  return [value, next] as const
}
