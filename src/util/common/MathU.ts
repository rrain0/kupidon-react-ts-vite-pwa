import { TypeU } from 'src/util/common/TypeU.ts'
import isArray = TypeU.isArray



export namespace MathU {
  
  
  
  export const ifNaN = <T = number>(n: number, replacement: T) => isNaN(n) ? replacement : n
  
  
  
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
    return n < 0 ? -Math.round(-n) : Math.round(n)
  }
  
  
  /**
   * Возвращение округлённого вниз в сторону нуля числа
   * @param n {number} - исходное число
   * @returns {number} - округлённое вниз в сторону нуля число
   */
  export function floorTo0(n: number): number {
    if (n > 0) return Math.floor(n)
    if (n < 0) return -Math.floor(-n)
    return n
  }
  
  /**
   * Округление числа в сторону бесконечности соответствующего знака
   * @param n {number} - исходное число
   */
  export function ceilToInfs(n: number): number {
    if (n > 0) return Math.ceil(n)
    if (n < 0) return -Math.ceil(-n)
    return n
  }
  
  
  
  export function maxAbs(a: number, b: number): number {
    if (Math.abs(a) > Math.abs(b)) return a
    if (Math.abs(a) < Math.abs(b)) return b
    return Math.max(a, b)
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
  }
  
  
  
  /**
   * Остаток от делния
   * @param a Значение a
   * @param b Значение b
   * @returns {number} (a + b) % b
   */
  export function mod(a: number, b: number): number {
    return (a + b) % b
  }
  
  // Целочисленное деление
  export function div(a: number, b: number): number {
    return MathU.floorTo0(a / b)
  }
  
  // Целочисленное деление с округлением вверх
  export function divCeil(a: number, b: number): number {
    return MathU.ceilToInfs(a / b)
  }
  
  
  
  // current+1 in range inclusive
  export const nextLooped = (curr: number, range: [min: number, max: number]) =>
    curr <= range[0] ? range[0] + 1 : curr >= range[1] ? range[0] : curr + 1
  
  // current-1 in range inclusive
  export const prevLooped = (curr: number, range: [min: number, max: number]) =>
    curr <= range[0] ? range[1] : curr >= range[1] ? range[1] - 1 : curr - 1
  
  
  
  // useful when you try to pick the next or prev value and want it to loops in range when exceeded
  export const loopRange = (curr: number, range: [min: number, max: number]) => {
    if (curr < range[0]) return range[1]
    if (curr > range[1]) return range[0]
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
    if (typeof a === 'number' && typeof b === 'number') {
      from = a
      to = b
    }
    else if (typeof a === 'number') {
      to = a
    }
    if (from >= to) throw new Error(`'to'=${to} must be greater than 'from'=${from}`)
    return (to - from) * Math.random() + from
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
    if (typeof a === 'number' && typeof b === 'number') {
      from = floorTo0(a)
      to = floorTo0(b)
    }
    else if (typeof a === 'number') {
      to = floorTo0(a)
    }
    if (from > to) throw new Error(`'to'=${to} must be greater-equal than 'from'=${from}`)
    return floorTo0(random(from, to + 1))
  }
  
  
  
}
