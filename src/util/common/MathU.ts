import { TypeU } from 'src/util/common/TypeU.ts'
import isnumber = TypeU.isnumber



export namespace MathU {
  
  
  
  /**
   * Функция округления
   * !!! Деление после округления всё равно может всё сломать
   * @param n Значение
   * @param scale - округлить до {scale} числа после запятой
   * @returns {number}
   */
  // export const round = (n: number, scale: number = 0): number => {
  //   const mult = (n < 0 ? -1 : 1) * 10 ** scale
  //   return Math.round(n * mult) / mult
  // }
  // export const round1 = (n: number) => round(n, 1)
  // export const round3 = (n: number) => round(n, 3)
  
  
  // Round using toFixed
  // It rounds halfUp to +Inf
  // Scale must be 0..100
  export const rf = (n: number, scale: number = 0): number => {
    return +n.toFixed(scale)
  }
  export const rf1 = (n: number) => rf(n, 1)
  export const rf3 = (n: number) => rf(n, 3)
  export const rf5 = (n: number) => rf(n, 5)
  
  
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
   * Остаток от деления - альтернативная версия
   * Можно назвать это rem (remainder)
   * mod(2, 8) => 2
   * mod(-2, 8) => 6
   * mod(10, 8) => 2
   * mod(-10, 8) => 6 ( то есть 8 * 2 + (-10) )
   * @param a Делимое
   * @param b Делитель
   * @returns {number} Остаток
   */
  export function mod(a: number, b: number): number {
    return ((a % b) + b) % b
  }
  
  // Целочисленное деление
  export function div(a: number, b: number): number {
    return MathU.floorTo0(a / b)
  }
  
  // Целочисленное деление с округлением вверх
  export function divCeil(a: number, b: number): number {
    return MathU.ceilToInfs(a / b)
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
    if (isnumber(a) && isnumber(b)) {
      from = a
      to = b
    }
    else if (isnumber(a)) {
      to = a
    }
    if (from >= to) throw new Error(`'to'=${to} must be gt than 'from'=${from}`)
    return (to - from) * Math.random() + from
  }
  
  
  
  /**
   * Возвращение целого случайного числа в диапазоне [{@linkcode from},{@linkcode to}]
   * @param [from=0] - начало диапазона включительно
   * @param [to=1] - конец диапазона включительно,
   *                 {@linkcode to} должно быть больше-равно чем {@linkcode from}
   * @returns {number} - случайное число из диапазона [{@linkcode from},{@linkcode to}]
   */
  export function randomInt(from: number, to: number): number
  export function randomInt(to?: number): number
  export function randomInt(a?: number, b?: number): number {
    let from = 0, to = 1
    if (isnumber(a) && isnumber(b)) {
      from = a
      to = b
    }
    else if (isnumber(a)) {
      to = a
    }
    if (from > to) throw new Error(`'to'=${to} must be gte than 'from'=${from}`)
    return floorTo0(random(from, to + 1))
  }
  
  export function randomNonNegInt() {
    return randomInt(0, Number.MAX_SAFE_INTEGER)
  }
  
  
  
}
