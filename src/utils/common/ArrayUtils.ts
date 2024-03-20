import { MathUtils } from 'src/utils/common/NumberUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import ComparatorEq = TypeUtils.ComparatorEq
import defaultComparatorEq = TypeUtils.defaultComparatorEq
import defaultPredicate = TypeUtils.defaultPredicate
import Mapper = TypeUtils.Mapper
import Filter = TypeUtils.Filter
import exists = TypeUtils.exists
import MergerIndexed = TypeUtils.MergerIndexed
import CombinerIndexed = TypeUtils.CombinerIndexed
import Exists = TypeUtils.Exists
import fitRange2 = MathUtils.fitRange




export namespace ArrayUtils {
  
  
  import anyval = TypeUtils.anyval
  export const last = <T>(arr: T[]): T => {
    if (!arr.length) throw new Error("Array is empty, can't get last element.")
    return arr[arr.length-1]
  }
  export const lastOr = <T1, T2>(arr: T1[], orElse: T2): T1|T2 => {
    if (!arr.length) return orElse
    return arr[arr.length-1]
  }
  export const lastIndex = (arr: any[]): number => arr.length-1
  
  
  export const eq = (arr1: any[] | empty, arr2: any[] | empty): boolean => {
    if (arr1===arr2) return true
    if (!arr1 || !arr2) return false
    if (arr1.length!==arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]!==arr2[i]) return false
    }
    return true
  }
  
  
  export const ofIndices = (len = 0): number[] => {
    return Array(len).fill(undefined).map((_,i)=>i)
  }
  
  
  
  /**
   * Проверка является ли переданное значение массивом
   * @param obj any
   * @returns {boolean} true если obj является массивом
   */
  export const isArray = <T,E>(obj: T | E[]): obj is E[] => obj instanceof Array
  
  
  export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never
  
  export const ofFirstOrEmpty = <T>(arr?: readonly [T?, ...unknown[]] | empty): [T] | [] => {
    if (arr?.length) return [arr[0] as T]
    return []
  }
  
  export const arrIsNonEmpty = <T>(arr?: T[] | [T, ...T[]] | empty): arr is [T, ...T[]]  => {
    return (arr?.length ?? 0) > 0
  }
  
  export type NonEmptyArr<T> = [T, ...T[]]
  
  export type ArrayOfNonEmpty<A extends Array<any>> = A extends Array<infer E>
    ? Array<Exists<E>>
    : never
  
  export type SingleOrArr<T> = T | T[]
  
  export type Arraify<T> = T extends any[] ? T : T[]
  export const arraify = <T>(value: T|T[]): Arraify<T|T[]> => {
    if (isArray(value)) return value
    return [value]
  }
  
  
  
  
  export const diff = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  )
  : [(number|undefined)[], (number|undefined)[]] => {
    const fwd:  (number|undefined)[] = Array(arr1.length).fill(undefined)
    const back: (number|undefined)[] = Array(arr2.length).fill(undefined)
    arr1.forEach((one,i1)=>{
      for (let i2 = 0; i2 < arr2.length; i2++) {
        const two = arr2[i2]
        if ((!fwd.includes(i2)) && comparator(one,two)){
          fwd[i1] = i2
          back[i2] = i1
          break
        }
      }
    })
    return [fwd,back] as const
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
  export const diff2 = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  )
  : [DiffObj<T1,T2>[], DiffObj<T2,T1>[]] => {
    const [fwd,back] = diff(arr1,arr2,comparator)
    const fwdObjs: DiffObj<T1,T2>[] = fwd.map((to,from)=>{
      if (exists(to)) return {
        fromIdx: from,
        fromElem: arr1[from],
        toIsFound: true,
        toIdx: to,
        toElem: arr2[to],
        isSame: to===from,
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
    const backObjs: DiffObj<T2,T1>[] = back.map((to,from)=>{
      if (exists(to)) return {
        fromIdx: from,
        fromElem: arr2[from],
        toIsFound: true,
        toIdx: to,
        toElem: arr1[to],
        isSame: to===from,
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
    return [fwdObjs,backObjs] as const
  }
  
  
  
  
  export const merge = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   merger: MergerIndexed<T1,T2>,
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  ): [T1[],T2[]] => {
    const newArr1 = [...arr1]
    const newArr2 = [...arr2]
    const [fwd] = diff(arr1,arr2,comparator)
    fwd.forEach((to,from)=>{
      if (exists(to)){
        const [newElem1, newElem2] = merger(arr1[from], arr2[to], from, to)
        newArr1[from] = newElem1
        newArr2[to]   = newElem2
      }
    })
    return [newArr1,newArr2]
  }
  
  
  
  export const combine = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   combiner: CombinerIndexed<T1,T2>,
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  ): T1[] => {
    const newArr1 = [...arr1]
    const [fwd] = diff(arr1,arr2,comparator)
    fwd.forEach((to,from)=>{
      if (exists(to)){
        const newElem1 = combiner(arr1[from], arr2[to], from, to)
        newArr1[from] = newElem1
      }
    })
    return newArr1
  }
  
  
  
  
  export type FindResult<T,E> = {
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
  export type FindByElseProps<T,E> = FindByProps<T> & {
    orElse: E
  }
  
  export const findBy3 =
  <T,E>
  ({ arr, filter = defaultPredicate, startIdx = 0, orElse }: FindByElseProps<T,E>)
  : FindResult<T,E> => {
    startIdx = fitRange2(
      startIdx>=0 ? startIdx : (arr.length+startIdx),
      [0, arr.length]
    )
    for (let i = startIdx; i < arr.length; i++) {
      const elem = arr[i]
      if (filter(elem)){
        return {
          isFound: true,
          index: i,
          elem: elem,
        } satisfies FindResult<T,E>
      }
    }
    return {
      isFound: false,
      index: -1,
      elem: orElse,
    } satisfies FindResult<T,E>
  }
  
  export const findBy2 =
  <T>
  ({ arr, filter = defaultPredicate, startIdx = 0 }: FindByProps<T>)
  : FindResult<T,undefined> =>
    findBy3({ arr, filter, startIdx, orElse: undefined })
  
  export const findBy =
  <T>
  (arr: T[], filter: Filter<T> = defaultPredicate, startIdx = 0)
  : FindResult<T,undefined> =>
    findBy3({ arr, filter, startIdx, orElse: undefined })
  
    
    
  
  export const findLastBy3 =
  <T,E>
  ({ arr, filter = defaultPredicate, startIdx = -1, orElse }: FindByElseProps<T,E>)
  : FindResult<T,E> => {
    startIdx = fitRange2(
      startIdx>=0 ? startIdx : (arr.length+startIdx),
      [-1, arr.length-1]
    )
    for (let i = startIdx; i > -1; i--) {
      const elem = arr[i]
      if (filter(elem)){
        return {
          isFound: true,
          index: i,
          elem: elem,
        } satisfies FindResult<T,E>
      }
    }
    return {
      isFound: false,
      index: -1,
      elem: orElse,
    } satisfies FindResult<T,E>
  }
  
  export const findLastBy2 =
  <T>
  ({ arr, filter = defaultPredicate, startIdx = -1 }: FindByProps<T>)
  : FindResult<T,undefined> =>
    findLastBy3({ arr, filter, startIdx, orElse: undefined })
  
  export const findLastBy =
  <T>
  (arr: T[], filter: Filter<T> = defaultPredicate, startIdx = -1)
  : FindResult<T,undefined> =>
    findLastBy3({ arr, filter, startIdx, orElse: undefined })
  
  
  
  
  
  export const replaceFirstToIfFoundBy =
  <T>(arr: T[], elem: T, filter: Filter<T> = defaultPredicate): T[] => {
    const findResult = findBy(arr, filter)
    if (findResult.isFound){
      const newArr = [...arr]
      newArr[findResult.index] = elem
      return newArr
    }
    return arr
  }
  export const mapFirstToIfFoundBy =
  <T>(arr: T[], mapper: Mapper<T>, filter: Filter<T> = defaultPredicate): T[] => {
    const findResult = findBy(arr, filter)
    if (findResult.isFound){
      const newArr = [...arr]
      newArr[findResult.index] = mapper(findResult.elem)
      return newArr
    }
    return arr
  }
  
  
  
  
  
}