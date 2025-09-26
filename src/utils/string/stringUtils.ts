


/** Обрезает у строки хвост {tail} с начала и с конца */
export const trimTails = (str: string, tail: string) => (
  str.replaceAll(RegExp(`^(${tail})|(${tail})$`, 'g'), '')
)

// TODO may be it is number util
// 100.0 => 100, 123 => 123, 123.00 => 123, 123.12 => 123.12, 123.1200 => 123.12
export const trimDotZerosEnd = (str: string) => (
  str.replaceAll(/[.]?0+$/g, '')
)

// TODO may be it is number util
/**
 * Конвертация значения типа number в обычную строку (без сокращений типа 2e+67)
 * @param n Число
 * @returns {string} Число в виде обычной строки
 */
export const numberToPlainString = (n: number): string => (
  n.toLocaleString(['fullwide', 'en-Us'], {
    useGrouping: false,
    maximumSignificantDigits: 21,
  })
)


// TODO may be it is url util
/** Обрезает у строки '/' с начала и с конца */
export const trimSlash = (str: string) => trimTails(str, '/')

