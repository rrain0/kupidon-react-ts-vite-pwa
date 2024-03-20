import { MathUtils } from 'src/utils/common/NumberUtils'


export namespace StringUtils {
  
  
  /**
   * Конвертация значения типа number в обычную строку (без сокращений типа 2e+67)
   * @param n Число
   * @returns {string} Число в виде обычной строки
   */
  export const numberToPlainString = (n: number) => {
    return n.toLocaleString(["fullwide", "en-Us"], {
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
      return numberToPlainString(MathUtils.round((value * 100) / total, scale))
    }
  
  
  
  
  
  /**
   *   Обрезает у строки хвост {tail} с начала и с конца
   */
  export const trimTails = (str: string, tail: string) =>
    str.replaceAll(RegExp(`^(${tail})|(${tail})$`,'g'),'')
  
  /**
   *   Обрезает у строки '/' с начала и с конца
   */
  export const trimSlash = (str: string) => trimTails(str,'/')
  
  
}