import { TypeU } from 'src/util/common/TypeU.ts'
import falsy = TypeU.falsy
import isnumber = TypeU.isnumber




export namespace CssU {
  
  
  import isdef = TypeU.isdef
  export type CssColor = string
  export type CssLength = number | string
  
  
  
  
  export const toPx = (value?: CssLength): string => {
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
  
  
  
  export const virtualOffset = ({
    t = undefined as CssLength | undefined, r = undefined as CssLength | undefined,
    b = undefined as CssLength | undefined, l = undefined as CssLength | undefined,
    h = undefined as CssLength | undefined, v = undefined as CssLength | undefined,
  }) => {
    const m = {
      ...isdef(t) && { marginTop: `calc(-1 * ${t})` },
      ...isdef(r) && { marginRight: `calc(-1 * ${r})` },
      ...isdef(b) && { marginBottom: `calc(-1 * ${b})` },
      ...isdef(l) && { marginLeft: `calc(-1 * ${l})` },
      ...isdef(h) && { marginLeft: `calc(-1 * ${h})`, marginRight: `calc(-1 * ${h})` },
      ...isdef(v) && { marginTop: `calc(-1 * ${v})`, marginBottom: `calc(-1 * ${v})` },
    }
    const p = {
      ...isdef(t) && { paddingTop: t },
      ...isdef(r) && { paddingRight: r },
      ...isdef(b) && { paddingBottom: b },
      ...isdef(l) && { paddingLeft: l },
      ...isdef(h) && { paddingLeft: h, paddingRight: h },
      ...isdef(v) && { paddingTop: v, paddingBottom: v },
    }
    return { ...m, ...p }
  }
  
  
}

