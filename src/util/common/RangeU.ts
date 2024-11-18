import { TypeU } from 'src/util/common/TypeU'
import mapNaN = TypeU.mapNaN



export namespace RangeU {
  
  
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
   * Определение, находится ли текущее значение между минимальным и максимальным включительно
   * @param min Минимальное значение
   * @param curr Текущее значение
   * @param max Максимальное значение
   * @returns {boolean} Результат сравнения
   */
  export const has = (curr: number, [min, max]: NumRangeRo): boolean => curr >= min && curr <= max
  
  
  // hasExclusive
  export const hasExcl = (curr: number, [min, max]: NumRangeRo): boolean => curr > min && curr < max
  
  
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
  
  
  export const zeroBasedRange = (range: NumRangeRo): NumRange => {
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

