import { rangeClamp } from 'src/utils/base/math/rangeUtils.ts'
import { defaultFilter, type Filter } from 'src/utils/base/tsUtils.ts'




export type FindResult<T, E> = {
  isFound: true
  index: number
  elem: T
} | {
  isFound: false
  index: -1
  elem: E
}

export type FindByProps<T> = {
  arr: T[]
  filter?: Filter<T> | undefined
  startIdx?: number | undefined
}
export type FindByElseProps<T, E> = FindByProps<T> & {
  orElse: E
}

export const findBy3 = <T, E>({
  arr,
  filter = defaultFilter,
  startIdx = 0,
  orElse,
}: FindByElseProps<T, E>): FindResult<T, E> => {
  startIdx = rangeClamp(
    startIdx >= 0 ? startIdx : (arr.length+startIdx),
    [0, arr.length]
  )
  for (let i = startIdx; i < arr.length; i++) {
    const elem = arr[i]
    if (filter(elem)) {
      return {
        isFound: true,
        index: i,
        elem: elem,
      } satisfies FindResult<T, E>
    }
  }
  return {
    isFound: false,
    index: -1,
    elem: orElse,
  } satisfies FindResult<T, E>
}

export const findBy2 = <T>({
  arr,
  filter = defaultFilter,
  startIdx = 0,
}: FindByProps<T>): FindResult<T, undefined> => {
  return findBy3({ arr, filter, startIdx, orElse: undefined })
}


export const findBy = <T>(
  arr: T[],
  filter: Filter<T> = defaultFilter,
  startIdx = 0
): FindResult<T, undefined> => {
  return findBy3({ arr, filter, startIdx, orElse: undefined })
}




export const findLastBy3 = <T, E>({
  arr,
  filter = defaultFilter,
  startIdx = -1,
  orElse,
}: FindByElseProps<T, E>): FindResult<T, E> => {
  startIdx = rangeClamp(
    startIdx >= 0 ? startIdx : (arr.length + startIdx),
    [-1, arr.length - 1]
  )
  for (let i = startIdx; i > -1; i--) {
    const elem = arr[i]
    if (filter(elem)) {
      return {
        isFound: true,
        index: i,
        elem: elem,
      } satisfies FindResult<T, E>
    }
  }
  return {
    isFound: false,
    index: -1,
    elem: orElse,
  } satisfies FindResult<T, E>
}

export const findLastBy2 = <T>({
  arr,
  filter = defaultFilter,
  startIdx = -1,
}: FindByProps<T>): FindResult<T, undefined> => {
  return findLastBy3({ arr, filter, startIdx, orElse: undefined })
}


export const findLastBy = <T>(
  arr: T[],
  filter: Filter<T> = defaultFilter,
  startIdx = -1
): FindResult<T, undefined> => {
  return findLastBy3({ arr, filter, startIdx, orElse: undefined })
}

