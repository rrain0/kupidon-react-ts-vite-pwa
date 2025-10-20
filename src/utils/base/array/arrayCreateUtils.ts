


export function array(len: number): undefined[]
export function array<T>(len: number): (T | undefined)[]
export function array<T>(len: number, of: T): T[]

export function array<T>(len = 0, of?: T): (T | undefined)[] {
  return Array(len).fill(of)
}



export function arrOfUndefs(len = 0): undefined[] {
  return Array(len).fill(undefined)
}

export function arrOfZeros(len = 0): 0[] {
  return Array(len).fill(0)
}

export function arrOfIndices(len = 0): number[] {
  return Array(len).fill(undefined).map((_, i) => i)
}

export function arrOfNumbers(len = 0): number[] {
  return Array(len).fill(undefined).map((_, i) => i + 1)
}

