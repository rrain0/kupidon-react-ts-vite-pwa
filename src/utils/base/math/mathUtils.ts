


export const posInf = Number.POSITIVE_INFINITY
export const negInf = Number.NEGATIVE_INFINITY

export const tg80deg = Math.tan(80 / 180 * Math.PI)
export const tg60deg = Math.sqrt(3)
export const tg45deg = 1
export const tg30deg = Math.sqrt(3) / 3



// Round half up to +Inf
// Round using toFixed
// Scale must be 0..100
export const rf = (n: number, scale = 0): number => +n.toFixed(scale)
export const rf1 = (n: number) => rf(n, 1)
export const rf3 = (n: number) => rf(n, 3)
export const rf5 = (n: number) => rf(n, 5)

/**
 * Round half up to +Inf
 * ⚠️ Деление после округления может дать погрешность
 * @param n Значение
 * @param scale - округлить до {scale} числа после запятой
 * @returns {number}
 */
export const rd = (n: number, scale: number = 0): number => {
  const mult = 10 ** scale
  return Math.round(n * mult) / mult
}
export const rd1 = (n: number) => round(n, 1)
export const rd3 = (n: number) => round(n, 3)
export const rd5 = (n: number) => round(n, 5)



/**
 * Round half up to nearest Inf
 * ⚠️ Деление после округления может дать погрешность
 * @param n Значение
 * @param scale - округлить до {scale} числа после запятой
 * @returns {number}
 */
export const round = (n: number, scale: number = 0): number => {
  const mult = (n < 0 ? -1 : 1) * 10 ** scale
  return Math.round(n * mult) / mult
}
export const round1 = (n: number) => round(n, 1)
export const round3 = (n: number) => round(n, 3)
export const round5 = (n: number) => round(n, 5)



/**
 * Round half up to 0
 * @param n - исходное число
 * @returns {number} - округлённое в сторону нуля число
 */
export const roundTo0 = (n: number): number => (
  n < 0 ? -Math.round(-n) : Math.round(n)
)

/**
 * Round floor to zero
 * @param n {number} - исходное число
 * @returns {number} - округлённое вниз в сторону нуля число
 */
export function floorTo0(n: number): number {
  if (n > 0) return Math.floor(n)
  if (n < 0) return -Math.floor(-n)
  return n
}

/**
 * Round ceil to nearest Inf
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
export const mod = (a: number, b: number): number => ((a % b) + b) % b

// Целочисленное деление
export const div = (a: number, b: number): number => floorTo0(a / b)

// Целочисленное деление с округлением вверх
export const divCeil = (a: number, b: number): number => ceilToInfs(a / b)





export const avg = (numbers: Iterable<number>): number => {
  let sum = 0, cnt = 0
  for (const n of numbers) { sum += n; cnt++ }
  return cnt && sum / cnt
}



