



export namespace StringU {
  
  
  export const capitalize = (str: string) => (
    str.replace(/^./, match => match.toUpperCase())
  )
  export const uncapitalize = (str: string) => (
    str.replace(/^./, match => match.toLowerCase())
  )
  
  export const camelCaseToKebabCase = (str: string) => (
    // '$&' - заменяется на найденную подстроку (найденный match)
    str.replace(/\p{Lu}|\d+/gu, '-$&').toLowerCase()
  )
  export const kebabCaseToCamelCase = (str: string) => (
    str.replace(/-./g, match => match[1].toUpperCase())
  )
  
  // 'placeSubType0123aHTMLanguage'.split(/(?<=\p{Ll}|\p{Lu})(?=\p{Lu}|\d+)/u) =>
  // ['place', 'Sub', 'Type', '0123a', 'H', 'T', 'M', 'Language']
  export const camelCaseToWords = (str: string) => (
    str.split(/(?<=\p{Ll}|\p{Lu})(?=\p{Lu}|\d+)/u)
  )
  
  
  
  
  
  /** Обрезает у строки хвост {tail} с начала и с конца */
  export const trimTails = (str: string, tail: string) => (
    str.replaceAll(RegExp(`^(${tail})|(${tail})$`, 'g'), '')
  )
  
  // 100.0 => 100, 123 => 123, 123.00 => 123, 123.12 => 123.12, 123.1200 => 123.12
  export const trimDotZerosEnd = (str: string) => (
    str.replaceAll(/[.]?0+$/g, '')
  )
  
  /** Обрезает у строки '/' с начала и с конца */
  export const trimSlash = (str: string) => trimTails(str, '/')
  
  
  /**
   * Конвертация значения типа number в обычную строку (без сокращений типа 2e+67)
   * @param n Число
   * @returns {string} Число в виде обычной строки
   */
  export const numberToPlainString = (n: number): string => {
    return n.toLocaleString(['fullwide', 'en-Us'], {
      useGrouping: false,
      maximumSignificantDigits: 21,
    })
  }
  
  
  
}
