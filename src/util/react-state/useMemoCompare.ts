import { useMemo, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import ComparatorEq = TypeU.ComparatorEq


export const useMemoCompare = <T>(value: T, compare: ComparatorEq<T>): T => {
  const [prevValue, setPrevValue] = useState(value)
  
  const memoizedValue = useMemo<T>(() => {
    if (compare(prevValue, value)) return prevValue
    setPrevValue(value)
    return value
  }, [value])
  
  return memoizedValue
}

