import { useMemo } from 'react'
import { ObjectU } from 'src/utils/base/ObjectU.ts'

import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { ComparatorEq } from 'src/utils/base/math/typeUtils.ts'
import stringifyEq = ObjectU.stringifyEq



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

