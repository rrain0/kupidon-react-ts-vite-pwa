import { getElemProps } from 'src/util/element/ElemProps'
import { ElemU } from 'src/util/element/ElemU'
import WH = ElemU.WH



export namespace JsElemUtils {
  
  
  
  export const wh = (elem: HTMLElement | null): WH => {
    if (!elem) return { w: 0, h: 0 }
    const elemProps = getElemProps(elem)
    return {
      w: elemProps.widthFloat,
      h: elemProps.heightFloat,
    }
  }
  
  
  
  export const stretchWithRatio =
  (aspectRatio: number, maxW: number, maxH: number): WH => {
    const maxRatio = maxW / maxH
    if (maxRatio > aspectRatio) return { w: aspectRatio * maxH, h: maxH }
    if (maxRatio < aspectRatio) return { w: maxW, h: maxW / aspectRatio }
    return { w: maxW, h: maxH }
  }
  
  
  
  
  export const clampRatio = (
    minRatio: number, maxRatio: number,
    w: number, h: number,
  ): WH => {
    const ratio = w / h
    if (ratio > maxRatio) return { w: h * maxRatio, h }
    if (ratio < minRatio) return { w, h: w / minRatio }
    return { w, h }
  }
  
  
  
  // Adaptive element size
  export const s = (w: number, h: number): number => {
    return Math.min(w, h) + Math.abs(w - h) / 2
  }
  
  
  
}



