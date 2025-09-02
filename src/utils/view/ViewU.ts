



export namespace ViewU {
  
  
  export type W = { w: number }
  export type H = { h: number }
  export type B = { b: number }
  
  export type WH = W & H
  export type XY = { x: number, y: number }
  
  
  
  
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
  export const sz = (w: number, h: number): number => {
    return Math.min(w, h) + Math.abs(w - h) / 2
  }
  
  
  
  
}
