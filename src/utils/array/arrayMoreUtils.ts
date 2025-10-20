import { lastI } from 'src/utils/base/array/arrayUtils.ts'
import { emptyval, type Nonemptyval, Sign } from 'src/utils/base/tsUtils.ts'



export type Arraify<T> = T extends readonly any[] ? T : T[]

export const arraify = <T>(value: T): Arraify<T> => {
  //@ts-expect-error
  return isArray(value) ? value : [value]
}




export type NonEmptyArr<T> = [T, ...T[]]

export const arrIsNonEmpty = <T>(
  arr?: T[] | NonEmptyArr<T> | emptyval
): arr is NonEmptyArr<T> => (
  (arr?.length ?? 0) > 0
)

export type ArrayOfNonempties<A extends Array<any>> = (
  A extends Array<infer E> ? Array<Nonemptyval<E>> : never
)




export type ArrFirstOptional<A extends readonly any[]> = (
  A extends readonly [first?: infer F, ...infer R] ? [first?: F, ...R] : never
)



export const arrNextOr = <T1, T2>(
  arr: readonly T1[],
  curr: T1,
  orElse: T2
): T1 | T2 => {
  const currIdx = arr.findIndex(it => it === curr)
  if (currIdx === -1 || currIdx + 1 === arr.length) return orElse
  return arr[currIdx + 1]
}



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



export const arrOfFirstOrEmpty = <T>(arr?: readonly [T?, ...unknown[]] | emptyval): [T] | [] => {
  if (arr?.length) return [arr[0] as T]
  return []
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
 