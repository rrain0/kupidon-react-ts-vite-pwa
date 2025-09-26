import { arrOfUndef } from 'src/utils/base/arrayUtils.ts'
import {
  type CombinerIndexed,
  type ComparatorEq,
  defaultComparatorEq,
  isdef,
  isundef,
  type MergerIndexed,
} from 'src/utils/base/tsUtils.ts'



// element removed: fwd[i1] => undefined
// element added: back[i2] => undefined
// element replaced: fwd[i1] => i2 or back[i2] => i1
export const diff = <T1, T2 = T1>(
  arr1: T1[], arr2: T2[],
  compare: ComparatorEq<T1, T2> = defaultComparatorEq,
): [fwd: (number | undefined)[], back: (number | undefined)[]] => {
  const len1 = arr1.length
  const len2 = arr2.length
  const fwd: (number | undefined)[] = arrOfUndef(len1)
  const back: (number | undefined)[] = arrOfUndef(len2)
  for (let i1 = 0; i1 < len1; i1++) {
    const el1 = arr1[i1]
    for (let i2 = 0; i2 < len2; i2++) {
      const notMapped = isundef(back[i2])
      if (notMapped) {
        const el2 = arr2[i2]
        if (compare(el1, el2)) {
          fwd[i1] = i2
          back[i2] = i1
          break
        }
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
      isReplaced: to !== from,
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






export const arrMergeMutualTo = <T1, T2 = T1>(
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

export const arrMergeTo = <T1, T2 = T1>(
  arr: T1[], other: T2[],
  combiner: CombinerIndexed<T1, T2>,
  comparator: ComparatorEq<T1, T2> = defaultComparatorEq
): T1[] => {
  const newArr = [...arr]
  const [fwd] = diff(arr, other, comparator)
  fwd.forEach((to, from) => {
    if (isdef(to)) {
      const newElem = combiner(arr[from], other[to], from, to)
      newArr[from] = newElem
    }
  })
  return newArr
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




