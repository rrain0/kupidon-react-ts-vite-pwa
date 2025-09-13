import { lastI } from 'src/utils/base/ArrayU.ts'
import { emptyval, Sign } from 'src/utils/base/typeUtils.ts'





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
 