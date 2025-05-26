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
  
  alignStart: boolean // true => { alignItems: 'start' }
  alignEnd: boolean // true => { alignItems: 'end' }
  alignStretch: boolean // true => { alignItems: 'stretch' }
  
  // justify-content: stretch; does not exist for flex
  justifyCtStart: boolean // true => { justifyContent: 'start' }
  justifyCtEnd: boolean // true => { justifyContent: 'end' }
  justifyCtSpaceBetween: boolean // true => { justifyContent: 'space-between' }
  justifyCtSpaceAround: boolean // true => { justifyContent: 'space-around' }
  
  centerStart: boolean // true => { alignItems: 'center', justifyContent: 'start' }
  center: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  centerEnd: boolean // true => { alignItems: 'center', justifyContent: 'end' }
  
  stretchEnd: boolean // true => { alignItems: 'stretch', justifyContent: 'end' }
  
  g: number | string
}>



export const processFlexShortProps = <P extends object>(
  props: P & FlexShortProps
) => {
  const {
    row, rowRev, col, colRev, wrap, wrapRev,
    align, alignCt, justifyCt,
    alignStart, alignEnd, alignStretch,
    justifyCtStart, justifyCtEnd, justifyCtSpaceBetween, justifyCtSpaceAround,
    centerStart, center, centerEnd,
    stretchEnd,
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
    
    ...stretchEnd && { alignItems: 'stretch', justifyContent: 'end' },
    
    ...alignStart && { alignItems: 'start' },
    ...alignEnd && { alignItems: 'end' },
    ...alignStretch && { alignItems: 'stretch' },
    
    ...justifyCtStart && { justifyContent: 'start' },
    ...justifyCtEnd && { justifyContent: 'end' },
    ...justifyCtSpaceBetween && { justifyContent: 'space-between' },
    ...justifyCtSpaceAround && { justifyContent: 'space-around' },
    
    ...isdef(align) && { alignItems: mapBool(align, 'center') },
    ...isdef(alignCt) && { alignContent: mapBool(alignCt, 'center') },
    ...isdef(justifyCt) && { justifyContent: mapBool(justifyCt, 'center') },
    
    ...isdef(g) && { gap: g },
  }
  
  return { flex, flexRest }
}



