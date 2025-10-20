import { useCallback, useState } from 'react'
import {
  ArrFilter, arrFilterToIf, arrHas, arrAddUniqToIf, arrToggleTo, arrRemoveToIf
} from 'src/utils/base/array/arrayUtils.ts'
import { useAsCallback } from 'src/utils/state/react/base/useAsCallback.ts'
import { useAsRefGet } from 'src/utils/state/react/base/useAsRefGet.ts'
import { ValueOrProducer } from 'src/utils/base/tsUtils.ts'



export const useArray = <T>(initialValue?: ValueOrProducer<T[]>) => {
  const [arr, setArr] = useState<T[]>(initialValue ?? [])
  
  const isEmpty = !arr.length
  const isNotEmpty = !!arr.length
  const [getIsEmpty] = useAsRefGet(isEmpty)
  const [getIsNotEmpty] = useAsRefGet(isNotEmpty)
  const has = useAsCallback((elem: T) => {
    return arrHas(arr, elem)
  })
  const add = useCallback((elem: T) => {
    setArr(arr => arrAddUniqToIf(arr, elem))
  }, [])
  const remove = useCallback((elem: T) => {
    setArr(arr => arrRemoveToIf(arr, elem))
  }, [])
  const toggle = useCallback((elem: T) => {
    setArr(arr => arrToggleTo(arr, elem))
  }, [])
  const filter = useCallback((filter: ArrFilter<T>) => {
    setArr(arr => arrFilterToIf(arr, filter))
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
