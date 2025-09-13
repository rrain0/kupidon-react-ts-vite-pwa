import { rangeClamp } from 'src/utils/base/math/rangeUtils.ts'
import { emptyval } from 'src/utils/base/typeUtils.ts'
import { ComparatorEq } from 'src/utils/base/typeUtils.ts'
import { defaultComparatorEq } from 'src/utils/base/typeUtils.ts'
import { defaultFilter } from 'src/utils/base/typeUtils.ts'
import { Mapper } from 'src/utils/base/typeUtils.ts'
import { Filter } from 'src/utils/base/typeUtils.ts'
import { MergerIndexed } from 'src/utils/base/typeUtils.ts'
import { CombinerIndexed } from 'src/utils/base/typeUtils.ts'
import { Nonemptyval } from 'src/utils/base/typeUtils.ts'
import { isArray } from 'src/utils/base/typeUtils.ts'
import { isdef } from 'src/utils/base/typeUtils.ts'
import { ArrFilter } from 'src/utils/base/typeUtils.ts'




export type ArrFirstOptional<A extends readonly any[]> = (
  A extends readonly [first?: infer F, ...infer R] ? [first?: F, ...R] : never
)
export type ArrElem<ArrayType extends readonly unknown[]> = (
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
)



export const arrOfUndef = (len = 0): undefined[] => {
  return Array(len).fill(undefined)
}
export const arrOfZeros = (len = 0): 0[] => {
  return Array(len).fill(0)
}
export const arrOfIndices = (len = 0): number[] => {
  return Array(len).fill(undefined).map((_, i) => i)
}
export const arrOfNumbers = (len = 0): number[] => {
  return Array(len).fill(undefined).map((_, i) => i + 1)
}

export const arr = arrOfUndef



export const lastI = (arr: any[]) => arr.length - 1
export const lastIOr0 = (arr: any[]) => arr.length ? (arr.length - 1) : 0



export const last = <T>(arr: T[]): T => {
  if (!arr.length) throw new Error("Array is empty, can't get last element.")
  return arr[arr.length-1]
}
export const lastOr = <T1, T2>(arr: T1[], orElse: T2): T1 | T2 => {
  if (!arr.length) return orElse
  return arr[arr.length-1]
}



export const arrSetLast = <T>(arr: T[], last: T) => {
  if (!arr.length) throw new Error(
    "Array is empty, can't set last element, because it does not exist."
  )
  arr[arr.length-1] = last
}
export const arrNextOr = <T1, T2>(arr: T1[], curr: T1, orElse: T2): T1 | T2 => {
  const currIdx = arr.findIndex(it => it === curr)
  if (currIdx === -1 || currIdx + 1 === arr.length) return orElse
  return arr[currIdx + 1]
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
export const arrEqAsSet = (arr1: any[] | emptyval, arr2: any[] | emptyval): boolean => {
  if (arr1 === arr2) return true
  if (!arr1 || !arr2) return false
  if (arr1.length !== arr2.length) return false
  const set = new Set([...arr1, ...arr2])
  if (set.size !== arr1.length) return false
  return true
}






export const arrHas = <T>(arr: T[], elem: T): boolean => (
  arr.includes(elem)
)
export const arrHasAny = <V, T>(arr: readonly T[], value: V | T): value is T => (
  arr.includes(value as any)
)
export const arrHasntAny = (arr: readonly any[], value: any): boolean => (
  !arr.includes(value)
)




export type NonEmptyArr<T> = [T, ...T[]]

export const arrIsNonEmpty = <T>(arr?: T[] | NonEmptyArr<T> | emptyval): arr is NonEmptyArr<T> => (
  (arr?.length ?? 0) > 0
)

export type ArrayOfNonEmptyVals<A extends Array<any>> = (
  A extends Array<infer E> ? Array<Nonemptyval<E>> : never
)



export type ValOrArr<T> = T | T[]




export type Arraify<T> = T extends any[] ? T : T[]
export const arraify = <T>(value: T | T[]): Arraify<T | T[]> => {
  if (isArray(value)) return value
  return [value]
}




export namespace ArrayU {
  
  
  
  
  export const flatPush = <T>(arr: T[], elem: T | T[]): T[] => {
    isArray(elem) ? arr.push(...elem) : arr.push(elem)
    return arr
  }
  
  export const add = <T>(arr: T[], elem: T, i?: number): T[] => {
    let len = arr.length
    i ??= len
    if (i >= len) arr[i] = elem
    else {
      len++
      arr.length = len
      arr.copyWithin(i + 1, i, len)
      arr[i] = elem
    }
    return arr
  }
  
  export const addTo = <T>(arr: T[], elem: T, i?: number): T[] => {
    const len = arr.length
    i ??= len
    if (i === len) return [...arr, elem]
    if (i > len) {
      arr = [...arr]
      arr[i] = elem
      return arr
    }
    else {
      return [...arr.slice(0, i), elem, ...arr.slice(i + 1, len)]
    }
  }
  
  export const addUniqToIf = <T>(arr: T[], elem: T): T[] => {
    if (arr.includes(elem)) return arr
    return [...arr, elem]
  }
  
  export const toggleTo = <T>(arr: T[], elem: T): T[] => {
    const i = arr.indexOf(elem)
    if (i === -1) return [...arr, elem]
    return arr.toSpliced(i, 1)
  }
  
  export const distinctToIf = <T>(arr: T[]): T[] => {
    const uniq = new Set(arr)
    if (uniq.size === arr.length) return arr
    return [...uniq]
  }
  
  export const removeI = <T>(arr: T[], i?: number): T[] => {
    arr.splice(i ?? arr.length - 1, 1)
    return arr
  }
  
  export const removeITo = <T>(arr: T[], i?: number): T[] => {
    return arr.toSpliced(i ?? arr.length - 1, 1)
  }
  
  export const remove = <T>(arr: T[], elem: T): T[] => {
    const i = arr.findIndex(it => it === elem)
    if (i !== -1) arr.splice(i, 1)
    return arr
  }
  
  export const removeToIf = <T>(arr: T[], elem: T): T[] => {
    const i = arr.findIndex(it => it === elem)
    if (i === -1) return arr
    return arr.toSpliced(i, 1)
  }
  
  export const removeBy = <T>(arr: T[], filter: Filter<T>): T[] => {
    const i = arr.findIndex(filter)
    if (i !== -1) arr.splice(i, 1)
    return arr
  }
  
  export const removeByToIf = <T>(arr: T[], filter: Filter<T>): T[] => {
    const i = arr.findIndex(filter)
    if (i === -1) return arr
    return arr.toSpliced(i, 1)
  }
  
  export const filterToIf = <T>(arr: T[], filter: ArrFilter<T>): T[] => {
    const newArr = arr.filter(filter)
    if (newArr.length < arr.length) return newArr
    return arr
  }
  
  export const clear = <T>(arr: T[]): T[] => {
    arr.length = 0
    return arr
  }
  
  export const clearToIf = <T>(arr: T[]): T[] => {
    if (!arr.length) return arr
    return []
  }
  
  export function mapToIf<T, E = T>(arr: T[], mapper: (el: T, i: number, arr: T[]) => E): E[]
  export function mapToIf<T, E = T>(
    arr: T[] | undefined, mapper: (el: T, i: number, arr: T[]) => E
  ): E[] | undefined
  export function mapToIf<T, E = T>(
    arr: T[] | undefined,
    mapper: (el: T, i: number, arr: T[]) => E
  ): E[] | undefined {
    if (!arr) return undefined
    let changed = false
    let newArr = arr as unknown as E[]
    arr.forEach((el, i) => {
      const newEl = mapper(el, i, arr)
      if (newEl !== el as unknown as E) {
        if (!changed) {
          newArr = [...arr] as unknown as E[]
          changed = true
        }
        newArr[i] = newEl
      }
    })
    return newArr
  }
  
  export function mapFirstToIf<T, E = T>({
    arr, filter = defaultFilter, mapper,
  }: {
    arr: T[],
    filter?: ArrFilter<T> | undefined
    mapper: (el: T, i: number, arr: T[]) => E
  }): (T | E)[] {
    const i = arr.findIndex(filter)
    if (i === -1) return arr
    const elem = arr[i]
    const mapped = mapper(elem, i, arr)
    if (mapped as T | E === elem) return arr
    return (arr as (T | E)[]).toSpliced(i, 1, mapped)
  }
  
  
  
  // element removed: fwd[i1] => undefined
  // element added: back[i2] => undefined
  // element replaced: fwd[i1] => i2 or back[i2] => i1
  export const diff = <T1, T2 = T1>(
    arrOfUniqs1: T1[], arrOfUniqs2: T2[],
    comparator: ComparatorEq<T1, T2> = defaultComparatorEq,
  ): [fwd: (number | undefined)[], back: (number | undefined)[]] => {
    const a1 = arrOfUniqs1
    const a2 = arrOfUniqs2
    const len1 = a1.length
    const len2 = a2.length
    const fwd: (number | undefined)[] = arrOfUndef(len1)
    const back: (number | undefined)[] = arrOfUndef(len2)
    for (let i1 = 0; i1 < len1; i1++) {
      for (let i2 = 0; i2 < len2; i2++) {
        if (fwd.includes(i2)) continue
        const el1 = a1[i1]
        const el2 = a2[i2]
        if (comparator(el1, el2)) {
          fwd[i1] = i2
          back[i2] = i1
          break
        }
      }
    }
    return [fwd, back] as const
  }
  
  
  
  
  export type DiffObj<T1, T2 = T1> = {
    fromIdx: number
    fromElem: T1
    toIsFound: true
    toIdx: number
    toElem: T2
    isSame: boolean
    isReplaced: boolean
    isRetained: true
    isRemoved: false
  } | {
    fromIdx: number
    fromElem: T1
    toIsFound: false
    toIdx: -1
    toElem: undefined
    isSame: false
    isReplaced: false
    isRetained: false
    isRemoved: true
  }
  export const diff2 = <T1, T2 = T1>(
    arr1: T1[], arr2: T2[],
    comparator: ComparatorEq<T1, T2> = defaultComparatorEq
  ): [DiffObj<T1, T2>[], DiffObj<T2, T1>[]] => {
    const [fwd, back] = diff(arr1, arr2, comparator)
    const fwdObjs: DiffObj<T1, T2>[] = fwd.map((to, from) => {
      if (isdef(to)) return {
        fromIdx: from,
        fromElem: arr1[from],
        toIsFound: true,
        toIdx: to,
        toElem: arr2[to],
        isSame: to === from,
        isReplaced: to!==from,
        isRetained: true,
        isRemoved: false,
      }
      return {
        fromIdx: from,
        fromElem: arr1[from],
        toIsFound: false,
        toIdx: -1,
        toElem: undefined,
        isSame: false,
        isReplaced: false,
        isRetained: false,
        isRemoved: true,
      }
    })
    const backObjs: DiffObj<T2, T1>[] = back.map((to, from) => {
      if (isdef(to)) return {
        fromIdx: from,
        fromElem: arr2[from],
        toIsFound: true,
        toIdx: to,
        toElem: arr1[to],
        isSame: to === from,
        isReplaced: to!==from,
        isRetained: true,
        isRemoved: false,
      }
      return {
        fromIdx: from,
        fromElem: arr2[from],
        toIsFound: false,
        toIdx: -1,
        toElem: undefined,
        isSame: false,
        isReplaced: false,
        isRetained: false,
        isRemoved: true,
      }
    })
    return [fwdObjs, backObjs] as const
  }
  
  
  
  
  export const merge = <T1, T2 = T1>(
    arr1: T1[], arr2: T2[],
    merger: MergerIndexed<T1, T2>,
    comparator: ComparatorEq<T1, T2> = defaultComparatorEq
  ): [T1[], T2[]] => {
    const newArr1 = [...arr1]
    const newArr2 = [...arr2]
    const [fwd] = diff(arr1, arr2, comparator)
    fwd.forEach((to, from) => {
      if (isdef(to)) {
        const [newElem1, newElem2] = merger(arr1[from], arr2[to], from, to)
        newArr1[from] = newElem1
        newArr2[to] = newElem2
      }
    })
    return [newArr1, newArr2]
  }
  
  
  
  export const combine = <T1, T2 = T1>(
    arr1: T1[], arr2: T2[],
    combiner: CombinerIndexed<T1, T2>,
    comparator: ComparatorEq<T1, T2> = defaultComparatorEq
  ): T1[] => {
    const newArr1 = [...arr1]
    const [fwd] = diff(arr1, arr2, comparator)
    fwd.forEach((to, from) => {
      if (isdef(to)) {
        const newElem1 = combiner(arr1[from], arr2[to], from, to)
        newArr1[from] = newElem1
      }
    })
    return newArr1
  }
  
  
  
  
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
      startIdx>=0 ? startIdx : (arr.length + startIdx),
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
  
  
  
  
  
  export const replaceFirstToIfFoundBy = <T>(
    arr: T[],
    elem: NoInfer<T>,
    filter: Filter<NoInfer<T>> = defaultFilter
  ): T[] => {
    const findResult = findBy(arr, filter)
    if (findResult.isFound) {
      const newArr = [...arr]
      newArr[findResult.index] = elem
      return newArr
    }
    return arr
  }
  
  export function mapFirstToIfFoundBy<T>(params: {
    arr: T[], mapper: Mapper<NoInfer<T>>, filter: Filter<NoInfer<T>>
  }): T[]
  export function mapFirstToIfFoundBy<T>(params: {
    arr: T[] | undefined, mapper: Mapper<NoInfer<T>>, filter: Filter<NoInfer<T>>
  }): T[] | undefined
  export function mapFirstToIfFoundBy<T>({
    arr, mapper, filter,
  }: {
    arr: T[] | undefined, mapper: Mapper<NoInfer<T>>, filter: Filter<NoInfer<T>>
  }): T[] | undefined {
    if (!arr) return arr
    filter ??= defaultFilter
    const findResult = findBy(arr, filter)
    if (findResult.isFound) {
      const newArr = [...arr]
      newArr[findResult.index] = mapper(findResult.elem)
      return newArr
    }
    return arr
  }
  
  
  
  
  
  export const mergeIf = <T>(
    arr1: T[], arr2: T[], comparator: ComparatorEq<T>
  ): T[] => {
    const newArr1 = [...arr1]
    let changed = false
    const iters = Math.min(arr2.length, arr1.length)
    for (let i = 0; i < iters; i++) {
      if (!comparator(newArr1[i], arr2[i])) {
        newArr1[i] = arr2[i]
        changed = true
      }
    }
    if (changed) return newArr1
    return arr1
  }
  
  
  
  
  // Если (замапанное значение arr1[i]) !== arr2[i],
  // тогда берём из arr2 значение, мапем его и ложим в arr1.
  export const mergeMappedIf = <A1 extends any[], A2 extends any[]>(
    arr1: A1,
    arr2: A2,
    // Массив, где значения arr2 замапаны по типу в значения arr1
    arr2AsArr1: A1,
    // Массив, где значения arr1 замапаны по типу в значения arr2
    arr1AsArr2: A2,
  ): A1 => {
    const newArr1 = [...arr1] as A1
    let changed = false
    const iters = Math.min(arr2.length, arr1.length)
    for (let i = 0; i < iters; i++) {
      if (arr1AsArr2[i] !== arr2[i]) {
        newArr1[i] = arr2AsArr1[i]
        changed = true
      }
    }
    if (changed) return newArr1
    return arr1
  }
  
  
  
}
