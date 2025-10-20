import { isdef, ifBool, type Pu } from 'src/utils/base/tsUtils.ts'




export type FlexShortProps = Pu<{
  row: boolean // true => { flexDirection: 'row' }
  col: boolean // true => { flexDirection: 'column' }
  rowRev: boolean // true => { flexDirection: 'row-reverse' }
  colRev: boolean // true => { flexDirection: 'column-reverse' }
  wrap: boolean // true => { flexWrap: 'wrap' }
  wrapRev: boolean // true => { flexWrap: 'wrap-reverse' }
  
  
  align: string | boolean // alignItems // true => 'center'
  alignCt: string | boolean // alignContent // true => 'center'
  justifyCt: string | boolean // justifyContent // true => 'center'
  justify: string | boolean // justifyContent // true => 'center'
  
  alignStart: boolean // true => { alignItems: 'start' }
  alignEnd: boolean // true => { alignItems: 'end' }
  alignStretch: boolean // true => { alignItems: 'stretch' }
  
  // 'justify-content: stretch;' does not exist for flex
  justifyStart: boolean // true => { justifyContent: 'start' }
  justifyEnd: boolean // true => { justifyContent: 'end' }
  justifySpaceBetween: boolean // true => { justifyContent: 'space-between' }
  justifySpaceAround: boolean // true => { justifyContent: 'space-around' }
  
  start: boolean // true => { alignItems: 'start', justifyContent: 'start' }
  center: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  end: boolean // true => { alignItems: 'end', justifyContent: 'end' }
  
  startStart: boolean // true => { alignItems: 'start', justifyContent: 'start' }
  startCenter: boolean // true => { alignItems: 'start', justifyContent: 'center' }
  startEnd: boolean // true => { alignItems: 'start', justifyContent: 'end' }
  
  centerStart: boolean // true => { alignItems: 'center', justifyContent: 'start' }
  centerCenter: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  centerEnd: boolean // true => { alignItems: 'center', justifyContent: 'end' }
  
  endStart: boolean // true => { alignItems: 'end', justifyContent: 'start' }
  endCenter: boolean // true => { alignItems: 'end', justifyContent: 'center' }
  endEnd: boolean // true => { alignItems: 'end', justifyContent: 'end' }
  
  stretchStart: boolean // true => { alignItems: 'stretch', justifyContent: 'start' }
  stretchCenter: boolean // true => { alignItems: 'stretch', justifyContent: 'center' }
  stretchEnd: boolean // true => { alignItems: 'stretch', justifyContent: 'end' }
  
  gap: number | string // { gap }
  g: number | string // { gap }
  gRow: number | string // { rowGap }
  gCol: number | string // { columnGap }
}>



export const processFlexShortProps = <P extends object>(
  props: P & FlexShortProps
) => {
  const {
    row, col, rowRev, colRev, wrap, wrapRev,
    align, alignCt, justifyCt, justify,
    alignStart, alignEnd, alignStretch,
    justifyStart, justifyEnd, justifySpaceBetween, justifySpaceAround,
    start, center, end,
    startStart, startCenter, startEnd,
    centerStart, centerCenter, centerEnd,
    endStart, endCenter, endEnd,
    stretchStart, stretchCenter, stretchEnd,
    gap, g, gRow, gCol,
    ...flexRest
  } = props
  
  
  
  const flexCss = {
    ...row && { flexDirection: 'row' as const },
    ...col && { flexDirection: 'column' as const },
    ...rowRev && { flexDirection: 'row-reverse' as const },
    ...colRev && { flexDirection: 'column-reverse' as const },
    ...wrap && { flexWrap: 'wrap' as const },
    ...wrapRev && { flexWrap: 'wrap-reverse' as const },
    
    ...start && { alignItems: 'start', justifyContent: 'start' },
    ...center && { alignItems: 'center', justifyContent: 'center' },
    ...end && { alignItems: 'end', justifyContent: 'end' },
    
    ...startStart && { alignItems: 'start', justifyContent: 'start' },
    ...startCenter && { alignItems: 'start', justifyContent: 'center' },
    ...startEnd && { alignItems: 'start', justifyContent: 'end' },
    
    ...centerStart && { alignItems: 'center', justifyContent: 'start' },
    ...centerCenter && { alignItems: 'center', justifyContent: 'center' },
    ...centerEnd && { alignItems: 'center', justifyContent: 'end' },
    
    ...endStart && { alignItems: 'end', justifyContent: 'start' },
    ...endCenter && { alignItems: 'end', justifyContent: 'center' },
    ...endEnd && { alignItems: 'end', justifyContent: 'end' },
    
    ...stretchStart && { alignItems: 'start', justifyContent: 'end' },
    ...stretchCenter && { alignItems: 'center', justifyContent: 'end' },
    ...stretchEnd && { alignItems: 'stretch', justifyContent: 'end' },
    
    ...alignStart && { alignItems: 'start' },
    ...alignEnd && { alignItems: 'end' },
    ...alignStretch && { alignItems: 'stretch' },
    
    ...justifyStart && { justifyContent: 'start' },
    ...justifyEnd && { justifyContent: 'end' },
    ...justifySpaceBetween && { justifyContent: 'space-between' },
    ...justifySpaceAround && { justifyContent: 'space-around' },
    
    ...isdef(justify) && { justifyContent: ifBool(justify, 'center') },
    
    ...isdef(align) && { alignItems: ifBool(align, 'center') },
    ...isdef(alignCt) && { alignContent: ifBool(alignCt, 'center') },
    ...isdef(justifyCt) && { justifyContent: ifBool(justifyCt, 'center') },
    
    ...isdef(gap) && { gap: gap },
    ...isdef(g) && { gap: g },
    ...isdef(gRow) && { rowGap: gRow },
    ...isdef(gCol) && { columnGap: gCol },
  }
  
  return { flexCss, flexRest }
}



