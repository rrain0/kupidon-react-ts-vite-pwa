import { getViewProps } from 'src/util/view/ViewProps'



export namespace ViewU {
  
  
  export type W = { w: number }
  export type H = { h: number }
  export type B = { b: number }
  
  export type WH = { w: number, h: number }
  export type XY = { x: number, y: number }
  
  
  export const wh = (elem: HTMLElement | null): WH => {
    if (!elem) return { w: 0, h: 0 }
    const elemProps = getViewProps(elem)
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
  
  
  
  
  type ClampRatioP = {
    minRatio: number
    maxRatio: number
    w: number
    h: number
  }
  export const clampRatio = ({ minRatio, maxRatio, w, h }: ClampRatioP): WH => {
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
