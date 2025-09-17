import { falsy } from 'src/utils/base/typeUtils.ts'
import { isnumber } from 'src/utils/base/typeUtils.ts'



export type W = { w: number }
export type H = { h: number }
export type B = { b: number }

export type WH = W & H
export type XY = { x: number, y: number }


export type CssColor = string
export type CssLength = number | string


export const cssToPx = <T>(value: T | number): T | string => {
  if (isnumber(value)) return `${value}px`
  return value
}


export const cssMax = (...values: (string | falsy)[]): string => {
  const vs = values.filter(v => !!v) as string[]
  if (vs.length === 0) return ''
  if (vs.length === 1) return vs[0]
  return `max(${vs.join(', ')})`
}

export const cssPlus = (...values: (string | falsy)[]): string => {
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
export function cssAbsDiff(a: string, b: string): string {
  return `max( ${a} - ${b}, ${b} - ${a} )`
}



// Adaptive element size
/*
 .cssClass {
 width: ${s('var(--w)', 'var(--h)')};
 height: ${s('var(--w)', 'var(--h)')};
 }
 */
export const cssSz = (w: string, h: string) => {
  return `calc( min(${w}, ${h}) + ${cssAbsDiff(w, h)} / 3 )`
}
export const cssjsSz = (w: number, h: number): number => {
  return Math.min(w, h) + Math.abs(w - h) / 2
}



type ClampRatioP = {
  minRatio?: number | undefined
  maxRatio: number
  w: number
  h: number
}
export const cssjsClampRatio = ({ minRatio = 0, maxRatio, w, h }: ClampRatioP): WH => {
  const maxContainerRatio = w / h
  if (maxContainerRatio > maxRatio) return { w: h * maxRatio, h }
  if (maxContainerRatio < minRatio) return { w, h: w / minRatio }
  return { w, h }
}



/* export function cssStretchWithin(aspectRatio: string, maxW: string, maxH: string) {
 return ``
 } */
