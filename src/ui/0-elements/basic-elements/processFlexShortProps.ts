import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import mapBool = TypeU.mapBool




export type FlexShortProps = Pu<{
  pos: string | 'rel' | 'abs' // 'rel' => 'relative', 'abs' => 'absolute
  
  w: number | string | 'full' | 'ct' // 'full' => '100%', 'ct' => 'fit-content'
  h: number | string | 'full' | 'ct' // 'full' => '100%', 'ct' => 'fit-content'
  fullW: boolean // true => { width: '100%' }
  fullH: boolean // true => { height: '100%' }
  full: boolean // true => { width: '100%', height: '100%' }
  wMin: number | string | 'full' // 'full' => '100%'
  hMin: number | string | 'full' // 'full' => '100%'
  wMax: number | string | 'full' // 'full' => '100%'
  hMax: number | string | 'full' // 'full' => '100%'
  
  r: number | string
  
  m: number | string
  mv: number | string
  mh: number | string
  mt: number | string
  mr: number | string
  mb: number | string
  ml: number | string
  p: number | string
  pv: number | string
  ph: number | string
  pt: number | string
  pr: number | string
  pb: number | string
  pl: number | string
  
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
  
  basis: number | string
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
    pos,
    w, h, fullW, fullH, full, wMin, hMin, wMax, hMax,
    r,
    m, mv, mh, mt, mr, mb, ml,
    p, pv, ph, pt, pr, pb, pl,
    row, rowRev, col, colRev, wrap, wrapRev,
    align, alignCt, alignSelf, justifyCt, center,
    basis, g, order, grow, shrink, noShrink,
    ...rest
  } = props
  
  
  
  const flex = {
    position: (() => {
      if (pos === 'rel') return 'relative'
      if (pos === 'abs') return 'absolute'
      return pos
    })(),
    
    width: (() => {
      if (w === 'full') return '100%'
      if (w === 'ct') return 'fit-content'
      return w
    })(),
    height: (() => {
      if (h === 'full') return '100%'
      if (h === 'ct') return 'fit-content'
      return h
    })(),
    ...fullW && { width: '100%' },
    ...fullH && { height: '100%' },
    ...full && { width: '100%', height: '100%' },
    minWidth: (() => {
      if (wMin === 'full') return '100%'
      return wMin
    })(),
    minHeight: (() => {
      if (hMin === 'full') return '100%'
      return hMin
    })(),
    maxWidth: (() => {
      if (wMax === 'full') return '100%'
      return wMax
    })(),
    maxHeight: (() => {
      if (hMax === 'full') return '100%'
      return hMax
    })(),
    
    borderRadius: r,
    
    margin: m,
    marginTop: mt ?? mv,
    marginRight: mr ?? mh,
    marginBottom: mb ?? mv,
    marginLeft: ml ?? mh,
    padding: p,
    paddingTop: pt ?? pv,
    paddingRight: pr ?? ph,
    paddingBottop: pb ?? pv,
    paddingLeft: pl ?? ph,
    
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
    
    flexBasis: basis,
    gap: g,
    order: order,
    flexGrow: mapBool(grow, 1),
    flexShrink: mapBool(shrink, 1),
    ...noShrink && { flexShrink: 0 },
  }
  
  return { flex, rest }
}


