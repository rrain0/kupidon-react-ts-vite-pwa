import { TypeU } from 'src/util/common/TypeU.ts'
import falsy = TypeU.falsy
import isnumber = TypeU.isnumber



export namespace CssU {
  
  
  export const toPx = (value?: number | string): string => {
    if (isnumber(value)) return `${value}px`
    return value ?? ''
  }
  
  
  export const max = (...values: (string | falsy)[]): string => {
    const vs = values.filter(v => !!v) as string[]
    if (vs.length === 0) return ''
    if (vs.length === 1) return vs[0]
    return `max(${vs.join(', ')})`
  }
  
  export const plus = (...values: (string | falsy)[]): string => {
    const vs = values.filter(v => !!v) as string[]
    if (vs.length === 0) return ''
    if (vs.length === 1) return vs[0]
    return `calc(${vs.join(' + ')})`
  }
  
  
  
  /*
  .cssClass {
     width: ${abs('var(--w)', 'var(--h)')};
     height: ${abs('var(--w)', 'var(--h)')};
   }
   */
  export function absDiff(a: string, b: string): string {
    return `max( ${a} - ${b}, ${b} - ${a} )`
  }
  
  
  
  /*
   .cssClass {
     width: ${s('var(--w)', 'var(--h)')};
     height: ${s('var(--w)', 'var(--h)')};
   }
  */
  export const sz = (w: string, h: string) => {
    return `calc( min(${w}, ${h}) + ${absDiff(w, h)} / 3 )`
  }
  
  
  
  /* export function stretchWithin(aspectRatio: string, maxW: string, maxH: string) {
    return ``
  } */
  
  
  
}

