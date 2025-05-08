import { useCallback, useState } from 'react'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useAsRefGet } from 'src/util/react-state/useAsRefGet.ts'
import ValueOrProducer = TypeU.ValueOrProducer



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
  
  return {
    arr, setArr,
    isEmpty, isNotEmpty,  getIsEmpty, getIsNotEmpty,
    has, add, remove, toggle,
  }
}
