import { getViewProps } from 'src/util/view/ViewProps'



export namespace ViewU {
  
  
  export type W = { w: number }
  export type H = { h: number }
  export type B = { b: number }
  
  export type WH = W & H
  export type XY = { x: number, y: number }
  
  
  export const wh = (elem: HTMLElement | null | undefined): WH => {
    if (!elem) return { w: 0, h: 0 }
    const { w, h } = getViewProps(elem)
    return { w, h }
  }
  
  
  
  
  type ClampRatioP = {
    minRatio?: number | undefined
    maxRatio: number
    w: number
    h: number
  }
  export const clampRatio = ({ minRatio = 0, maxRatio, w, h }: ClampRatioP): WH => {
    const maxContainerRatio = w / h
    if (maxContainerRatio > maxRatio) return { w: h * maxRatio, h }
    if (maxContainerRatio < minRatio) return { w, h: w / minRatio }
    return { w, h }
  }
  
  
  
  // Adaptive element size
  export const s = (w: number, h: number): number => {
    return Math.min(w, h) + Math.abs(w - h) / 2
  }
  
  
  
  
}
