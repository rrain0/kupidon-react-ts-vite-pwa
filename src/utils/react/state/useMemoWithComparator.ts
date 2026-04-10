import { useMemo } from 'react'
import { stringifyEq } from 'src/utils/base/jsUtils.ts'
import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'
import type { ComparatorEq } from 'src/utils/base/tsUtils.ts'



export const useMemoWithComparator = <T>(
  value: T,
  comparator: ComparatorEq<T> = stringifyEq,
): T => {
  const [getPrevValue, setPrevValue] = useRefGetSet(value)
  
  const memoizedValue = useMemo<T>(() => {
    const prevValue = getPrevValue()
    if (comparator(prevValue, value)) return prevValue
    setPrevValue(value)
    return value
  }, [value])
  
  return memoizedValue
}

