import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import isArray = TypeUtils.isArray



export namespace MathUtils {
  
  
  
  import NumRange = TypeUtils.NumRange
  export const ifNaN = <T = number>(n: number, replacement: T)=>isNaN(n) ? replacement : n
  
  
  
  /**
   * Функция округления
   * @param n Значение
   * @param scale Масштаб
   * @returns {number}
   */
  export const round = (n: number, scale: number = 0): number => {
    const mult = (n < 0 ? -1 : 1) * 10 ** scale
    return Math.round(n * mult) / mult
  }
  
  /**
   * Возвращение округлённого в сторону нуля числа
   * @param n - исходное число
   * @returns {number} - округлённое в сторону нуля число
   */
  export const roundTo0 = (n: number): number => {
    return n<0 ? -Math.round(-n) : Math.round(n)
  }
  
  
  /**
   * Возвращение округлённого вниз в сторону нуля числа
   * @param n - исходное число
   * @returns {number} - округлённое вниз в сторону нуля число
   */
  export function floorTo0(n: number){
    return n<0 ? -Math.floor(-n) : Math.floor(n)
  }
  
  
  /**
   * Получение процента
   * @param value Значение
   * @param total Общее значение
   * @param scale Масштаб
   * @returns {number}
   */
  export const percent =
    (value: number, total: number, scale: number = 1): number => {
    return round((value * 100) / total, scale)
  };
  
  
  
  /**
   * Деление с остатком
   * @param a Значение a
   * @param b Значение b
   * @returns {number} (a + b) % b
   */
  type Mod = (a: number, b: number) => number
  export const mod: Mod = (a, b) => (a + b) % b
  
  
  
  const _fitRange = (curr: number, [min, max]: readonly [number, number]): number => {
    return curr < min ? min : curr > max ? max : curr
  }
  /* type FitRangeArgs =
    | [curr: number, minMax: readonly [number, number]]
    | [min: number, curr: number, max: number] */
  /**
   * Функция, подгоняющая текущее значение под диапазон
   * @param min Минимальное значение включительно
   * @param curr Текущее значение
   * @param max Максимальное значение включительно
   * @param minMax диапазон [min, max] включительно
   * @returns {number} Результирующее значение, находящееся в диапазоне [min,max]
   */
  export const fitRange =
  (...args:
    | [curr: number, minMax: readonly [number, number]]
    | [min: number, curr: number, max: number]
  ): number => {
    if (isArray(args[1])){
      const [curr, [min, max]] = args as any
      return _fitRange(curr, [min, max])
    }
    else {
      const [min, curr, max] = args as any
      return _fitRange(curr, [min, max])
    }
  }
  /*
  type FitRange = (...args:
    | [curr: number, minMax: readonly [number, number]]
    | [min: number, curr: number, max: number]
  ) => number
  const fitRange1: FitRange = (...args): number => {
    if (isArray(args[1])){
      const [curr, [min, max]] = args as any
      return _fitRange(curr, [min, max])
    }
    else {
      const [min, curr, max] = args as any
      return _fitRange(curr, [min, max])
    }
  }
   */
  /**
   * Определение, находится ли текущее значение между минимальным и максимальным включительно
   * @param min Минимальное значение
   * @param curr Текущее значение
   * @param max Максимальное значение
   * @returns {boolean} Результат сравнения
   */
  export const inRange =
  (curr: number, [min, max]: readonly [number, number]): boolean =>
    curr >= min && curr <= max
  
  export const inRange0 =
  (min: number, curr: number, max: number): boolean =>
    inRange(curr, [min,max])
  
  
  
  export const inRangeExclusive =
  (curr: number, [min, max]: readonly [number, number]): boolean =>
    curr > min && curr < max
  
  export const inRangeExclusive0 =
  (min: number, curr: number, max: number): boolean =>
    inRangeExclusive(curr, [min,max])
  
  
  
  export const mapRange =
  (value: number,
   fromRange: readonly [minInclusive: number, maxInclusive: number],
   toRange: readonly [minInclusive: number, maxInclusive: number]
  )
  : number => {
    const oneBasedValue = ifNaN((value-fromRange[0]) / (fromRange[1]-fromRange[0]), 0)
    return oneBasedValue * (toRange[1]-toRange[0]) + toRange[0]
  }
  
  export const mapFitRange =
  (value: number,
   fromRange: readonly [minInclusive: number, maxInclusive: number],
   toRange: readonly [minInclusive: number, maxInclusive: number],
   fitToRange: readonly [minIncluseve: number, maxInclusive: number] = toRange
  )
  : number => fitRange(mapRange(value, fromRange, toRange), fitToRange)
  
  
  export const zeroBasedRange = (range: NumRange): NumRange => {
    const toRange: NumRange = [0, range[1] - range[0]]
    return [
      mapRange(range[0], range, toRange),
      mapRange(range[1], range, toRange),
    ]
  }
  
  
  // current+1 in range inclusive
  export const nextLooped = (curr: number, range: [min: number, max: number]) =>
    curr<=range[0] ? range[0]+1 : curr>=range[1] ? range[0] : curr+1
  
  // current-1 in range inclusive
  export const prevLooped = (curr: number, range: [min: number, max: number]) =>
    curr<=range[0] ? range[1] : curr>=range[1] ? range[1]-1 : curr-1
  
  
  
  // useful when you try to pick the next or prev value and want it to loops in range when exceeded
  export const loopRange = (curr: number, range: [min: number, max: number]) => {
    if (curr<range[0]) return range[1]
    if (curr>range[1]) return range[0]
    return curr
  }
  
  
  
  
  /**
   * Возвращение случайного числа в диапазоне [{@linkcode from},{@linkcode to})
   * @param [from=0] - начало диапазона включительно
   * @param [to=1] - конец диапазона не включительно, {@linkcode to} должно быть больше чем {@linkcode from}
   * @returns {number} - случайное число из диапазона [{@linkcode from},{@linkcode to})
   */
  export function random(from: number, to: number): number
  export function random(to?: number): number
  export function random(a?: number, b?: number): number {
    let from = 0, to = 1
    if (typeof a === 'number' && typeof b === 'number'){
      from = a
      to = b
    } else if (typeof a === 'number'){
      to = a
    }
    if (from>=to) throw new Error(`'to'=${to} must be greater than 'from'=${from}`)
    return (to-from)*Math.random() + from
  }
  
  
  
  /**
   * Возвращение целого случайного числа в диапазоне [{@linkcode from},{@linkcode to}]
   * @param [from=0] - начало диапазона включительно
   * @param [to=1] - конец диапазона включительно, {@linkcode to} должно быть больше-равно чем {@linkcode from}
   * @returns {number} - случайное число из диапазона [{@linkcode from},{@linkcode to}]
   */
  export function randomInt(from: number, to: number): number
  export function randomInt(to?: number): number
  export function randomInt(a?: number, b?: number): number {
    let from = 0, to = 1
    if (typeof a === 'number' && typeof b === 'number'){
      from = floorTo0(a)
      to = floorTo0(b)
    }
    else if (typeof a === 'number'){
      to = floorTo0(a)
    }
    if (from>to) throw new Error(`'to'=${to} must be greater-equal than 'from'=${from}`)
    return floorTo0(random(from,to+1))
  }
  
  
  
  
  
}