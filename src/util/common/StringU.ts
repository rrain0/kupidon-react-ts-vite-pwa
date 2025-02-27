import { MathU } from 'src/util/common/MathU.ts'



export namespace StringU {
  
  
  export const capitalize = (str: string) => str.length ? str[0].toUpperCase() + str.slice(1) : str
  export const uncapitalize = (str: string) => str.length ? str[0].toLowerCase() + str.slice(1) : str
  
  export const camelCaseToKebabCase = (str: string) => {
    const pattern = /\p{Lu}|\d+/gu
    // '$&' - заменяется на найденную подстроку
    str = str.replace(pattern, '-$&').toLowerCase()
    return str
  }
  
  // 'placeSubType0123aHTMLanguage'.split(/(?<=\p{Ll}|\p{Lu})(?=\p{Lu}|\d+)/u) =>
  // ['place', 'Sub', 'Type', '0123a', 'H', 'T', 'M', 'Language']
  export const camelCaseToWords = (str: string) => str.split(/(?<=\p{Ll}|\p{Lu})(?=\p{Lu}|\d+)/u)
  
  
  /** Обрезает у строки хвост {tail} с начала и с конца */
  export const trimTails = (str: string, tail: string) => str.replaceAll(
    RegExp(`^(${tail})|(${tail})$`, 'g'), ''
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
