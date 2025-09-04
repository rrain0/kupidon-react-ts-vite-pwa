import { useCallback, useState } from 'react'
import { ArrayU } from 'src/utils/base/ArrayU.ts'

import { useAsCallback } from 'src/utils/react/state/useAsCallback.ts'
import { useAsRefGet } from 'src/utils/react/state/useAsRefGet.ts'
import { ValueOrProducer } from 'src/utils/base/math/typeUtils.ts'
import { ArrFilter } from 'src/utils/base/math/typeUtils.ts'



export const useArray = <T>(initialValue?: ValueOrProducer<T[]>) => {
  const [arr, setArr] = useState<T[]>(initialValue ?? [])
  
  const isEmpty = !arr.length
  const isNotEmpty = !!arr.length
  const [getIsEmpty] = useAsRefGet(isEmpty)
  const [getIsNotEmpty] = useAsRefGet(isNotEmpty)
  const has = useAsCallback((elem: T) => {
    return ArrayU.has(arr, elem)
  })
  const add = useCallback((elem: T) => {
    setArr(arr => ArrayU.addUniqToIf(arr, elem))
  }, [])
  const remove = useCallback((elem: T) => {
    setArr(arr => ArrayU.removeToIf(arr, elem))
  }, [])
  const toggle = useCallback((elem: T) => {
    setArr(arr => ArrayU.toggleTo(arr, elem))
  }, [])
  const filter = useCallback((filter: ArrFilter<T>) => {
    setArr(arr => ArrayU.filterToIf(arr, filter))
  }, [])
  const clear = useCallback(() => {
    setArr([])
  }, [])
  
  return {
    arr, setArr,
    isEmpty, isNotEmpty,  getIsEmpty, getIsNotEmpty,
    has, add, remove, toggle, filter, clear,
  }
}
