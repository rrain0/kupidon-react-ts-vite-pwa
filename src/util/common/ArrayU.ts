import { RangeU } from 'src/util/common/RangeU'
import { TypeU } from 'src/util/common/TypeU.ts'
import empty = TypeU.empty
import ComparatorEq = TypeU.ComparatorEq
import defaultComparatorEq = TypeU.defaultComparatorEq
import defaultFilter = TypeU.defaultFilter
import Mapper = TypeU.Mapper
import Filter = TypeU.Filter
import MergerIndexed = TypeU.MergerIndexed
import CombinerIndexed = TypeU.CombinerIndexed
import NonEmptyVal = TypeU.NonEmptyVal
import isArray = TypeU.isArray
import Sign = TypeU.Sign
import isdef = TypeU.isdef




export namespace ArrayU {
  
  
  export type FirstCanUndef<A extends readonly any[]> =
    A extends readonly [first?: infer F, ...infer R] ? [first?: F, ...R] : never
  
  
  
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
  
  
  
  
  export const lastI = (arr: any[]): number => arr.length - 1
  export const lastIOr0 = (arr: any[]): number => arr.length ? (arr.length - 1) : 0
  
  
  export const last = <T>(arr: T[]): T => {
    if (!arr.length) throw new Error("Array is empty, can't get last element.")
    return arr[arr.length-1]
  }
  export const lastOr = <T1, T2>(arr: T1[], orElse: T2): T1 | T2 => {
    if (!arr.length) return orElse
    return arr[arr.length-1]
  }
  
  
  export const setLast = <T>(arr: T[], last: T) => {
    if (!arr.length) throw new Error("Array is empty, can't set last element, because it does not exist.")
    arr[arr.length-1] = last
  }
  
  
  export const nextOr = <T1, T2>(arr: T1[], curr: T1, orElse: T2): T1 | T2 => {
    const currIdx = arr.findIndex(it => it === curr)
    if (currIdx === -1 || currIdx + 1 === arr.length) return orElse
    return arr[currIdx + 1]
  }
  
  
  export const randomElem = <T>(arr: T[]): T => {
    if (!arr.length) throw new Error("Array is empty, can't get random element.")
    return arr[Math.floor(Math.random() * arr.length)]
  }
  
  
  export const eq = <A, B>(
    arr1: readonly A[] | empty,
    arr2: readonly B[] | empty,
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
  
  
  export const eqAsSet = (arr1: any[] | empty, arr2: any[] | empty): boolean => {
    if (arr1 === arr2) return true
    if (!arr1 || !arr2) return false
    if (arr1.length !== arr2.length) return false
    const set = new Set([...arr1, ...arr2])
    if (set.size !== arr1.length) return false
    return true
  }
  
  
  export const contains =
    <V, T>(value: V | T, arr: readonly T[]): value is T => arr.includes(value as any)
  export const notContains =
    (value: any, arr: readonly any[]): boolean => !arr.includes(value)
  
  
  
  export const avg = (arr: number[]): number => {
    if (!arr.length) return 0
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length
  }
  
  
  
  export const addRetainingLastElemsWithSameSign = (
    arr: number[],
    value: number,
    maxLen: number | undefined = undefined
  ): number[] => {
    const a = [...arr, value]
    let sign = 0
    let lastRetainedIdx = 0
    let i = lastI(a)
    for ( ; i >= 0; i--) {
      const s = Math.sign(a[i])
      if (s !== 0) {
        sign = s
        break
      }
    }
    for ( ; i >= 0; i--) {
      const s = Math.sign(a[i])
      if (s === -sign) {
        lastRetainedIdx = i+1
        break
      }
    }
    const s = Math.max( 0, a.length - (maxLen ?? a.length), lastRetainedIdx )
    return a.slice(s)
  }
  /*
  console.log(addRetainingLastElemsWithSameSign([], 0, 3), 'expected: [0]')
  console.log(addRetainingLastElemsWithSameSign([], 1, 3), 'expected: [1]')
  console.log(addRetainingLastElemsWithSameSign([], -1, 3), 'expected: [-1]')
  
  console.log(addRetainingLastElemsWithSameSign([], 0, 0), 'expected: []')
  console.log(addRetainingLastElemsWithSameSign([], 1, 0), 'expected: []')
  console.log(addRetainingLastElemsWithSameSign([], -1, 0), 'expected: []')
  
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 0, 0), 'expected: []')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 1, 0), 'expected: []')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], -1, 0), 'expected: []')
  
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 0, 4), 'expected: [0, 1, 0]')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 1, 4), 'expected: [0, 1, 1]')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], -1, 4), 'expected: [-1]')
  
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 0, 3), 'expected: [0, 1, 0]')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 1, 3), 'expected: [0, 1, 1]')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], -1, 3), 'expected: [-1]')
  
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 0, 2), 'expected: [1, 0]')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], 1, 2), 'expected: [1, 1]')
  console.log(addRetainingLastElemsWithSameSign([-1, 0, 1], -1, 2), 'expected: [-1]')
  */
  
  
  export const compare = <T>(arr: T[], other: T[]): Sign => {
    if (arr === other) return 0
    for (let i = 0; i < Math.max(arr.length, other.length); i++) {
      if (i >= arr.length) return -1
      if (i >= other.length) return 1
      if (arr[i] < other[i]) return -1
      if (arr[i] > other[i]) return 1
      if (arr[i] === other[i]) return 0
    }
    return 0
  }
  export const isLower = <T>(arr: T[], other: T[]): boolean => compare(arr, other) === -1
  export const isGreater = <T>(arr: T[], other: T[]): boolean => compare(arr, other) === 1
  
  
  
  
  export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never
  
  export const ofFirstOrEmpty = <T>(arr?: readonly [T?, ...unknown[]] | empty): [T] | [] => {
    if (arr?.length) return [arr[0] as T]
    return []
  }
  
  export const isNonEmpty = <T>(arr?: T[] | [T, ...T[]] | empty): arr is [T, ...T[]] => {
    return (arr?.length ?? 0) > 0
  }
  
  export type NonEmptyArr<T> = [T, ...T[]]
  
  export type ArrayOfNonEmpty<A extends Array<any>> =
    A extends Array<infer E> ? Array<NonEmptyVal<E>> : never
  
  export type ValueOrArr<T> = T | T[]
  
  export type Arraify<T> = T extends any[] ? T : T[]
  export const arraify = <T>(value: T | T[]): Arraify<T | T[]> => {
    if (isArray(value)) return value
    return [value]
  }
  
  
  
  
  export const has = <T>(arr: T[], elem: T): boolean => (
    arr.includes(elem)
  )
  
  export const flatPush = <T>(arr: T[], elem: T | T[]): T[] => {
    isArray(elem) ? arr.push(...elem) : arr.push(elem)
    return arr
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
  
  
  
  
  
  export const diff = <T1, T2 = T1>(
    arr1: T1[], arr2: T2[],
    comparator: ComparatorEq<T1, T2> = defaultComparatorEq
  ): [(number | undefined)[], (number | undefined)[]] => {
    const fwd: (number | undefined)[] = Array(arr1.length).fill(undefined)
    const back: (number | undefined)[] = Array(arr2.length).fill(undefined)
    arr1.forEach((one, i1) => {
      for (let i2 = 0; i2 < arr2.length; i2++) {
        const two = arr2[i2]
        if ((!fwd.includes(i2)) && comparator(one, two)) {
          fwd[i1] = i2
          back[i2] = i1
          break
        }
      }
    })
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
    startIdx = RangeU.clamp(
      startIdx>=0 ? startIdx : (arr.length+startIdx),
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
    startIdx = RangeU.clamp(
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
