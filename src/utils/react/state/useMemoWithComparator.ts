import { useMemo } from 'react'
import { stringifyEq } from 'src/utils/base/jsUtils.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { ComparatorEq } from 'src/utils/base/math/typeUtils.ts'



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

