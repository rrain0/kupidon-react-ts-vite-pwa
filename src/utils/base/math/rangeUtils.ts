import { mod } from 'src/utils/base/math/mathUtils.ts'
import { ifNaN } from 'src/utils/base/tsUtils.ts'



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



// ✅ Не требует округлений результата
export const rangeClamp = (curr: number, [min, max]: NumRange): number => (
  curr < min ? min : curr > max ? max : curr
)



/**
 * Определение, находится ли текущее значение между
 * минимальным и максимальным (по умолчанию включительно)
 * @param min Минимальное значение
 * @param curr Текущее значение
 * @param max Максимальное значение
 * @returns {boolean}
 */
export const rangeHas = (
  curr: number, [min, max]: NumRange, { first = true, last = true } = { },
): boolean => (
  curr > min && curr < max || first && curr === min || last && curr === max
)



export const rangeMove = <R extends NumRanges>(ranges: R, toStart: number): R => {
  const shift = toStart - ranges[0]
  return ranges.map(n => n + shift) as R
}

export const rangeZeroBased = (range: NumRange): NumRange => rangeMove(range, 0)



export const rangeLoop = (
  curr: number, range: NumRange, { first = true, last = false } = { },
): number => {
  const zeroBasedRange = rangeZeroBased(range)
  const zeroBasedCurr = curr - range[0]
  let loopedZeroBasedCurr = mod(zeroBasedCurr, zeroBasedRange[1])
  if (!first && !last && loopedZeroBasedCurr === 0) {
    throw new Error('Value is on the edge of the range but edge values are not included')
  }
  if (!first && loopedZeroBasedCurr === 0) {
    loopedZeroBasedCurr = zeroBasedRange[1]
  }
  if (last && loopedZeroBasedCurr === 0 && zeroBasedCurr !== 0) {
    loopedZeroBasedCurr = zeroBasedRange[1]
  }
  const loopedCurr = range[0] + loopedZeroBasedCurr
  return loopedCurr
}



/**
 *
 * @param value
 * @param fromRange minInclusive..maxInclusive
 * @param toRange minInclusive..maxInclusive
 */
const rangeMapSingle = (value: number, fromRange: NumRange, toRange: NumRange): number => {
  const oneBasedValue = ifNaN((value - fromRange[0]) / (fromRange[1] - fromRange[0]), 0)
  return oneBasedValue * (toRange[1] - toRange[0]) + toRange[0]
}

export const rangeMap = <R extends NumRanges>(
  value: number,
  fromRanges: R,
  toRanges: NoInfer<R>
): number => {
  for (let i = 1; ; i++) {
    if (i === fromRanges.length - 1 || value <= fromRanges[i]) return rangeMapSingle(
      value,
      [fromRanges[i - 1], fromRanges[i]],
      [toRanges[i - 1], toRanges[i]],
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
export const rangeMapClamp = (
  value: number,
  fromRange: NumRange,
  toRange: NumRange,
  clampInRange: NumRange = toRange
): number => {
  return rangeClamp(rangeMap(value, fromRange, toRange), clampInRange)
}

// useful when you try to pick the next or prev value and want it to loop in range when exceeded
export const clampLooped = (curr: number, range: NumRange) => {
  if (curr < range[0]) return range[1]
  if (curr > range[1]) return range[0]
  return curr
}




