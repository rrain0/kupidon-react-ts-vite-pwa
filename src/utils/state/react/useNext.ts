import { useCallback, useState } from 'react'
import { rangeLoop } from 'src/utils/base/math/rangeUtils.ts'
import { useAsRefGet } from 'src/utils/state/react/base/useAsRefGet.ts'



export const useNext = () => {
  const [value, setValue] = useState(0)
  
  const [getNext] = useAsRefGet(() => {
    const v = rangeLoop(value + 1, [0, 1e6])
    setValue(v)
  })
  
  const next = useCallback(() => getNext()(), [])
  return [value, next] as const
}
