import { MathU } from 'src/util/common/MathU'
import { TypeU } from 'src/util/common/TypeU'
import mapNaN = TypeU.mapNaN



export namespace RangeU {
  
  
  import mod = MathU.mod
  export type NumRange = [number, number]
  export type NumRangeNullable = [number | null, number | null]
  export type NumRangeEndNullable = [number, number | null]
  
  export type NumRangeRo = readonly [number, number]
  export type NumRangeNullableRo = readonly [number | null, number | null]
  export type NumRangeEndNullableRo = readonly [number, number | null]
  
  export type NumRanges = [number, number, ...number[]]
  export type NumRangesNullable = [number | null, number | null, ...(number | null)[]]
  
  export type NumRangesRo = readonly [number, number, ...number[]]
  export type NumRangesNullableRo = readonly [number | null, number | null, ...(number | null)[]]
  
  
  
  export const clamp = (curr: number, [min, max]: NumRangeRo): number => {
    return curr < min ? min : curr > max ? max : curr
  }
  
  
  /**
   * Определение, находится ли текущее значение между минимальным и максимальным (по умолчанию включительно)
   * @param min Минимальное значение
   * @param curr Текущее значение
   * @param max Максимальное значение
   * @returns {boolean}
   */
  export const has = (curr: number, [min, max]: NumRangeRo, minIncl = true, maxIncl = true): boolean => {
    return curr > min && curr < max || minIncl && curr === min || maxIncl && curr === max
  }
  
  
  export const loop = (curr: number, range: NumRangeRo, minIncl = true, maxIncl = false): number => {
    const zeroBasedRange = zeroBased(range)
    const zeroBasedCurr = map(curr, range, zeroBasedRange)
    let loopedZeroBasedCurr = mod(zeroBasedCurr, zeroBasedRange[1])
    if (!minIncl && !maxIncl && loopedZeroBasedCurr === 0) {
      throw new Error('Value on the edge of range and edge values not included')
    }
    if (!minIncl && loopedZeroBasedCurr === 0) {
      loopedZeroBasedCurr = zeroBasedRange[1]
    }
    if (maxIncl && loopedZeroBasedCurr === 0 && zeroBasedCurr !== 0) {
      loopedZeroBasedCurr = zeroBasedRange[1]
    }
    // @ts-expect-error
    const loopedCurr = map(loopedZeroBasedCurr, zeroBasedRange, range)
    return loopedCurr
  }
  
  
  /**
   *
   * @param value
   * @param fromRange minInclusive..maxInclusive
   * @param toRange minInclusive..maxInclusive
   */
  const mapRange = (value: number, fromRange: NumRangeRo, toRange: NumRangeRo): number => {
    const oneBasedValue = mapNaN((value - fromRange[0]) / (fromRange[1] - fromRange[0]), 0)
    return oneBasedValue * (toRange[1] - toRange[0]) + toRange[0]
  }
  
  
  
  export const map = <R extends NumRangesRo>
  (value: number, fromRanges: R, toRanges: NoInfer<R>): number => {
    for (let i = 1; ; i++) {
      if (i === fromRanges.length - 1 || value <= fromRanges[i]) return mapRange(
        value,
        [fromRanges[i - 1], fromRanges[i]],
        [toRanges[i-1], toRanges[i]],
      )
    }
  }
  
  
  /**
   *
   * @param value
   * @param fromRange minInclusive..maxInclusive
   * @param toRange minInclusive..maxInclusive
   * @param clampInRange minInclusive..maxInclusive
   */
  export const mapClamp = (
    value: number,
    fromRange: NumRangeRo,
    toRange: NumRangeRo,
    clampInRange: NumRangeRo = toRange
  )
  : number => {
    return clamp(map(value, fromRange, toRange), clampInRange)
  }
  
  
  export const zeroBased = (range: NumRangeRo): NumRange => {
    const toRange: NumRange = [0, range[1] - range[0]]
    return [
      map(range[0], range, toRange),
      map(range[1], range, toRange),
    ]
  }
  
  
  
  
  // current + 1 in range inclusive
  export const nextLooped = (curr: number, range: NumRange) =>
    curr <= range[0] ? range[0] + 1 : curr >= range[1] ? range[0] : curr + 1
  
  // current - 1 in range inclusive
  export const prevLooped = (curr: number, range: NumRange) =>
    curr <= range[0] ? range[1] : curr >= range[1] ? range[1] - 1 : curr - 1
  
  
  
  // useful when you try to pick the next or prev value and want it to loop in range when exceeded
  export const clampLooped = (curr: number, range: NumRange) => {
    if (curr < range[0]) return range[1]
    if (curr > range[1]) return range[0]
    return curr
  }
  
  
}

