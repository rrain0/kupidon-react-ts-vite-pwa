import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import mapBool = TypeU.mapBool
import isdef = TypeU.isdef




export type FlexShortProps = Pu<{
  row: boolean
  rowRev: boolean
  col: boolean
  colRev: boolean
  wrap: boolean
  wrapRev: boolean
  
  
  align: string | boolean // alignItems // true => 'center'
  alignCt: string | boolean // alignContent // true => 'center'
  justifyCt: string | boolean // justifyContent // true => 'center'
  
  centerStart: boolean // true => { alignItems: 'center', justifyContent: 'start' }
  center: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  centerEnd: boolean // true => { alignItems: 'center', justifyContent: 'end' }
  
  g: number | string
}>



export const processFlexShortProps = <P extends object>(
  props: P & FlexShortProps
) => {
  const {
    row, rowRev, col, colRev, wrap, wrapRev,
    align, alignCt, justifyCt,
    centerStart, center, centerEnd,
    g,
    ...flexRest
  } = props
  
  
  
  const flex = {
    ...row && { flexDirection: 'row' as const },
    ...rowRev && { flexDirection: 'row-reverse' as const },
    ...col && { flexDirection: 'column' as const },
    ...colRev && { flexDirection: 'column-reverse' as const },
    ...wrap && { flexWrap: 'wrap' as const },
    ...wrapRev && { flexWrap: 'wrap-reverse' as const },
    
    ...centerStart && { alignItems: 'center', justifyContent: 'start' },
    ...center && { alignItems: 'center', justifyContent: 'center' },
    ...centerEnd && { alignItems: 'center', justifyContent: 'end' },
    
    ...isdef(align) && { alignItems: mapBool(align, 'center') },
    ...isdef(alignCt) && { alignContent: mapBool(alignCt, 'center') },
    ...isdef(justifyCt) && { justifyContent: mapBool(justifyCt, 'center') },
    
    ...isdef(g) && { gap: g },
  }
  
  return { flex, flexRest }
}



