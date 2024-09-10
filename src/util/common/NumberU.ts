import numeral from 'numeral'


export namespace NumberU {
  
  
  /**
   *
   * @param v - float 0..100
   * @param scale - int 0..inf
   */
  export const formatProgress = (v: number, scale = 0): string => {
    const v2 = numeral(v).format('0.0')
    if (v <= 0) return '0'
    if (v >= 100) return '100'
    return ''
  }
  
  
}


