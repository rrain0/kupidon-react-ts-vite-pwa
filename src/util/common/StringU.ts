import { MathU } from 'src/util/common/MathU.ts'



export namespace StringU {
  
  
  export const capitalize = (str: string) => str.length ? str[0].toUpperCase() + str.slice(1) : str
  export const uncapitalize = (str: string) => str.length ? str[0].toLowerCase() + str.slice(1) : str
  
  export const camelCaseToKebabCase = (str: string) => {
    const pattern = /(\p{Lu})|(\d+)/gu
    // '$&' - заменяется на найденную подстроку
    str = str.replace(pattern, '-$&').toLowerCase()
    return str
  }
  
  
  /** Обрезает у строки хвост {tail} с начала и с конца */
  export const trimTails = (str: string, tail: string) =>
    str.replaceAll(RegExp(`^(${tail})|(${tail})$`, 'g'), '')
  
  /** Обрезает у строки '/' с начала и с конца */
  export const trimSlash = (str: string) => trimTails(str, '/')
  
  
  /**
   * Конвертация значения типа number в обычную строку (без сокращений типа 2e+67)
   * @param n Число
   * @returns {string} Число в виде обычной строки
   */
  export const numberToPlainString = (n: number) => {
    return n.toLocaleString(['fullwide', 'en-Us'], {
      useGrouping: false,
      maximumSignificantDigits: 21,
    })
  }
  
  
  
  
  /**
   * Получение процента в виде строки
   * @param value Значение
   * @param total Общее значение
   * @param scale Масштаб
   * @returns {string}
   */
  export const getPercent =
    (value: number, total: number, scale: number = 1): string => {
      return numberToPlainString(MathU.round((value * 100) / total, scale))
    }
  
  
    
  
  
  
}
