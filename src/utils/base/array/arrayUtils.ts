import { emptyval } from 'src/utils/base/typeUtils.ts'
import { ComparatorEq } from 'src/utils/base/typeUtils.ts'
import { defaultComparatorEq } from 'src/utils/base/typeUtils.ts'
import { defaultFilter } from 'src/utils/base/typeUtils.ts'
import { Filter } from 'src/utils/base/typeUtils.ts'
import { isArray } from 'src/utils/base/typeUtils.ts'



export type ArrElem<ArrayType extends readonly unknown[]> = (
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
)
export type ArrMapper<In, Out = In> = (v: In, i: number, arr: In[]) => Out
export type ArrFilter<T> = (v: T, i: number, arr: T[]) => any



export const arrOfUndef = (len = 0): undefined[] => (
  Array(len).fill(undefined)
)
export const arrOfZeros = (len = 0): 0[] => (
  Array(len).fill(0)
)
export const arrOfIndices = (len = 0): number[] => (
  Array(len).fill(undefined).map((_, i) => i)
)
export const arrOfNumbers = (len = 0): number[] => (
  Array(len).fill(undefined).map((_, i) => i + 1)
)
export const arr = arrOfUndef



export const arrHas = <T>(arr: readonly T[], elem: T): boolean => (
  arr.includes(elem)
)
export const arrHasAny = <V, T>(arr: readonly T[], value: V | T): value is T => (
  arr.includes(value as any)
)
export const arrHasntAny = (arr: readonly any[], value: any): boolean => (
  !arr.includes(value)
)



export const lastI = (arr: readonly any[]) => arr.length - 1
export const lastIOr0 = (arr: readonly any[]) => arr.length ? (arr.length - 1) : 0



export const last = <T>(arr: readonly T[]): T => {
  if (!arr.length) throw new Error("Array is empty, can't get last element.")
  return arr[arr.length - 1]
}
export const lastOr = <T1, T2>(arr: readonly T1[], orElse: T2): T1 | T2 => {
  if (!arr.length) return orElse
  return arr[arr.length - 1]
}
export const arrSetLast = <T>(arr: T[], last: T) => {
  arr[Math.max(arr.length - 1, 0)] = last
}



export const arrRandom = <T>(arr: readonly T[]): T => {
  if (!arr.length) throw new Error("Array is empty, can't get random element.")
  return arr[Math.floor(Math.random() * arr.length)]
}



export const arrEq = <A, B>(
  arr1: readonly A[] | emptyval,
  arr2: readonly B[] | emptyval,
  valueComparator: ComparatorEq<A, B> = defaultComparatorEq
): boolean => {
  if (arr1 === arr2) return true
  if (!arr1 || !arr2) return false
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (!valueComparator(arr1[i], arr2[i])) return false
  }
  return true
}



export const arrAdd = <T>(arr: T[], elem: T, i = arr.length): T[] => {
  if (i >= arr.length) arr[i] = elem
  else arr.splice(i, 0, elem)
  return arr
}

export const arrAddTo = <T>(arr: T[], elem: T, i = arr.length): T[] => {
  if (i === arr.length) return [...arr, elem]
  if (i > arr.length) {
    arr = [...arr]
    arr[i] = elem
    return arr
  }
  else {
    return arr.toSpliced(i, 0, elem)
  }
}

export const arrFlatPush = <T>(arr: T[], elem: T | T[]): T[] => {
  isArray(elem) ? arr.push(...elem) : arr.push(elem)
  return arr
}

export const arrAddUniqToIf = <T>(arr: T[], elem: T): T[] => {
  if (arr.includes(elem)) return arr
  return [...arr, elem]
}



export const arrReplaceOneToIfBy = <T>(
  arr: T[],
  elem: NoInfer<T>,
  filter: ArrFilter<NoInfer<T>> = defaultFilter,
): T[] => {
  const i = arr.findIndex(filter)
  if (i === -1) return arr
  return [...arr.slice(0, i), elem, ...arr.slice(i + 1)]
}

export const arrMapOneIfBy = <T>(
  arr: T[],
  filter: ArrFilter<NoInfer<T>>,
  mapper: ArrMapper<NoInfer<T>, T>,
): T[] => {
  const i = arr.findIndex(filter)
  if (i === -1) return arr
  const elem = arr[i]
  const newElem = mapper(elem, arr.length, arr)
  if (elem === newElem) return arr
  return arr.toSpliced(i, 1, newElem)
}

export const arrMapOneToEndOrAddToIfBy = <T>(
  arr: T[],
  filter: ArrFilter<NoInfer<T>>,
  mapper: ArrMapper<NoInfer<T> | undefined, T>,
): T[] => {
  const i = arr.findIndex(filter)
  if (i === -1) return [...arr, mapper(undefined, arr.length, arr)]
  const elem = arr[i]
  const newElem = mapper(elem, arr.length, arr)
  if (elem === newElem) return arr
  return [...arr.slice(0, i), ...arr.slice(i + 1), newElem]
}

export const arrToggleTo = <T>(arr: T[], elem: T): T[] => {
  const i = arr.indexOf(elem)
  if (i === -1) return [...arr, elem]
  return arr.toSpliced(i, 1)
}



export const arrRemoveI = <T>(arr: T[], i = arr.length - 1): T[] => {
  arr.splice(i, 1)
  return arr
}

export const arrRemoveITo = <T>(arr: T[], i?: number): T[] => {
  return arr.toSpliced(i ?? arr.length - 1, 1)
}

export const arrRemove = <T>(arr: T[], elem: T): T[] => {
  const i = arr.findIndex(it => it === elem)
  if (i !== -1) arr.splice(i, 1)
  return arr
}

export const arrRemoveToIf = <T>(arr: T[], elem: T): T[] => {
  const i = arr.findIndex(it => it === elem)
  if (i === -1) return arr
  return arr.toSpliced(i, 1)
}

export const arrRemoveBy = <T>(arr: T[], filter: ArrFilter<T>): T[] => {
  const i = arr.findIndex(filter)
  if (i !== -1) arr.splice(i, 1)
  return arr
}

export const arrRemoveByToIf = <T>(arr: T[], filter: ArrFilter<T>): T[] => {
  const i = arr.findIndex(filter)
  if (i === -1) return arr
  return arr.toSpliced(i, 1)
}




export function arrMapOneToIf<In, Out = In>(params: {
  arr: In[], filter: Filter<NoInfer<In>>, mapper: ArrMapper<In, Out>
}): (In | Out)[]
export function arrMapOneToIf<In, Out = In>(params: {
  arr: In[] | undefined, filter: Filter<NoInfer<In>>, mapper: ArrMapper<In, Out>
}): (In | Out)[] | undefined
export function arrMapOneToIf<In, Out = In>({
  arr, mapper, filter,
}: {
  arr: In[] | undefined, filter: Filter<NoInfer<In>>, mapper: ArrMapper<In, Out>
}): (In | Out)[] | undefined {
  if (!arr) return arr
  const i = arr.findIndex(filter)
  if (i === -1) return arr
  const elem = arr[i]
  const mapped = mapper(elem, i, arr)
  if (mapped === elem as any) return arr
  return (arr as (In | Out)[]).toSpliced(i, 1, mapped)
}




export const arrFilterToIf = <T>(arr: T[], filter: ArrFilter<T>): T[] => {
  const newArr = arr.filter(filter)
  if (newArr.length === arr.length) return arr
  return newArr
}



export const arrDistinctToIf = <T>(arr: T[]): T[] => {
  const uniqs = new Set(arr)
  if (uniqs.size === arr.length) return arr
  return [...uniqs]
}




export function arrMapToIf<In, Out = In>(
  arr: In[],
  mapper: ArrMapper<In, Out>
): Out[]
export function arrMapToIf<In, Out = In>(
  arr: In[] | undefined,
  mapper: ArrMapper<In, Out>
): Out[] | undefined
export function arrMapToIf<In, Out = In>(
  arr: In[] | undefined,
  mapper: ArrMapper<In, Out>
): Out[] | undefined {
  if (!arr) return undefined
  let newArr: any[] = arr
  arr.forEach((el, i) => {
    const newEl = mapper(el, i, arr)
    if (newEl !== el as any) {
      if (newArr === arr) newArr = [...arr]
      newArr[i] = newEl
    }
  })
  return newArr
}



export const arrClear = <T>(arr: T[]): T[] => {
  arr.length = 0
  return arr
}

export const arrClearToIf = <T>(arr: T[]): T[] => {
  if (!arr.length) return arr
  return []
}






