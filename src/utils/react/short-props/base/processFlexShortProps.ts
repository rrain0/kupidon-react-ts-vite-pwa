import { TypeU } from 'src/utils/common/TypeU.ts'
import Pu = TypeU.Pu
import mapBool = TypeU.mapBool
import isdef = TypeU.isdef




export type FlexShortProps = Pu<{
  row: boolean
  col: boolean
  rowRev: boolean
  colRev: boolean
  wrap: boolean
  wrapRev: boolean
  
  
  align: string | boolean // alignItems // true => 'center'
  alignCt: string | boolean // alignContent // true => 'center'
  justifyCt: string | boolean // justifyContent // true => 'center'
  justify: string | boolean // justifyContent // true => 'center'
  
  alignStart: boolean // true => { alignItems: 'start' }
  alignEnd: boolean // true => { alignItems: 'end' }
  alignStretch: boolean // true => { alignItems: 'stretch' }
  
  // justify-content: stretch; does not exist for flex
  justifyStart: boolean // true => { justifyContent: 'start' }
  justifyEnd: boolean // true => { justifyContent: 'end' }
  justifySpaceBetween: boolean // true => { justifyContent: 'space-between' }
  justifySpaceAround: boolean // true => { justifyContent: 'space-around' }
  
  start: boolean // true => { alignItems: 'start', justifyContent: 'start' }
  startStart: boolean // true => { alignItems: 'start', justifyContent: 'start' }
  startCenter: boolean // true => { alignItems: 'start', justifyContent: 'center' }
  startEnd: boolean // true => { alignItems: 'start', justifyContent: 'end' }
  
  centerStart: boolean // true => { alignItems: 'center', justifyContent: 'start' }
  center: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  centerEnd: boolean // true => { alignItems: 'center', justifyContent: 'end' }
  
  end: boolean // true => { alignItems: 'end', justifyContent: 'end' }
  endStart: boolean // true => { alignItems: 'end', justifyContent: 'start' }
  endCenter: boolean // true => { alignItems: 'end', justifyContent: 'center' }
  endEnd: boolean // true => { alignItems: 'end', justifyContent: 'end' }
  
  stretchEnd: boolean // true => { alignItems: 'stretch', justifyContent: 'end' }
  
  gap: number | string
  g: number | string
  gRow: number | string
  gCol: number | string
}>



export const processFlexShortProps = <P extends object>(
  props: P & FlexShortProps
) => {
  const {
    row, col, rowRev, colRev, wrap, wrapRev,
    align, alignCt, justifyCt, justify,
    alignStart, alignEnd, alignStretch,
    justifyStart, justifyEnd, justifySpaceBetween, justifySpaceAround,
    start, startStart, startCenter, startEnd,
    centerStart, center, centerEnd,
    end, endStart, endCenter, endEnd,
    stretchEnd,
    gap, g, gRow, gCol,
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
    
    ...end && { alignItems: 'end', justifyContent: 'end' },
    ...endStart && { alignItems: 'end', justifyContent: 'start' },
    ...endCenter && { alignItems: 'end', justifyContent: 'center' },
    ...endEnd && { alignItems: 'end', justifyContent: 'end' },
    
    ...stretchEnd && { alignItems: 'stretch', justifyContent: 'end' },
    
    ...alignStart && { alignItems: 'start' },
    ...alignEnd && { alignItems: 'end' },
    ...alignStretch && { alignItems: 'stretch' },
    
    ...justifyStart && { justifyContent: 'start' },
    ...justifyEnd && { justifyContent: 'end' },
    ...justifySpaceBetween && { justifyContent: 'space-between' },
    ...justifySpaceAround && { justifyContent: 'space-around' },
    
    ...isdef(justify) && { justifyContent: mapBool(justify, 'center') },
    
    ...isdef(align) && { alignItems: mapBool(align, 'center') },
    ...isdef(alignCt) && { alignContent: mapBool(alignCt, 'center') },
    ...isdef(justifyCt) && { justifyContent: mapBool(justifyCt, 'center') },
    
    ...isdef(gap) && { gap: gap },
    ...isdef(g) && { gap: g },
    ...isdef(gRow) && { rowGap: gRow },
    ...isdef(gCol) && { columnGap: gCol },
  }
  
  return { flex, flexRest }
}



