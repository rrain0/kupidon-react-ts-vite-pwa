import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import mapBool = TypeU.mapBool




export type FlexShortProps = Pu<{
  w: number | string
  h: number | string
  wFull: boolean // true => { width: '100%' }
  hFull: boolean // true => { height: '100%' }
  full: boolean // true => { width: '100%', height: '100%' }
  wMin: number | string
  hMin: number | string
  wMax: number | string
  hMax: number | string
  
  row: boolean
  rowRev: boolean
  col: boolean
  colRev: boolean
  wrap: boolean
  wrapRev: boolean
  
  align: string | boolean // true => 'center'
  alignCt: string | boolean // true => 'center'
  alignSelf: string | boolean // true => 'center'
  justifyCt: string | boolean // true => 'center'
  
  center: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  
  g: number | string
  order: number | string
  grow: number | string | boolean // true => 1
  shrink: number | string | boolean // true => 1
  noShrink: boolean // true => { flexShrink: 0 }
}>



export const processFlexShortProps = <P extends object>(
  props: P & FlexShortProps
) => {
  const {
    w, h, wFull, hFull, full, wMin, hMin, wMax, hMax,
    row, rowRev, col, colRev, wrap, wrapRev,
    align, alignCt, alignSelf, justifyCt, center,
    g, order, grow, shrink, noShrink,
    ...rest
  } = props
  
  
  
  const flex = {
    width: w,
    height: h,
    ...wFull && { width: '100%' },
    ...hFull && { height: '100%' },
    ...full && { width: '100%', height: '100%' },
    minWidth: wMin,
    minHeight: hMin,
    maxWidth: wMax,
    maxHeight: hMax,
    
    ...row && { flexDirection: 'row' as const },
    ...rowRev && { flexDirection: 'row-reverse' as const },
    ...col && { flexDirection: 'column' as const },
    ...colRev && { flexDirection: 'column-reverse' as const },
    ...wrap && { flexWrap: 'wrap' as const },
    ...wrapRev && { flexWrap: 'wrap-reverse' as const },
    
    alignItems: mapBool(align, 'center'),
    alignContent: mapBool(alignCt, 'center'),
    alignSelf: mapBool(alignSelf, 'center'),
    justifyContent: mapBool(justifyCt, 'center'),
    ...center && { alignItems: 'center', justifyContent: 'center' },
    
    gap: g,
    order: order,
    flexGrow: mapBool(grow, 1),
    flexShrink: mapBool(shrink, 1),
    ...noShrink && { flexShrink: 0 },
  }
  
  return { flex, rest }
}


