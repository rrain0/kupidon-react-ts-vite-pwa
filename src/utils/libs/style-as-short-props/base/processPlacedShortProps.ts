import { isdef, ifBool, type Pu } from 'src/utils/base/tsUtils.ts'




export type PlacedShortProps = Pu<{
  aligned: string | boolean // alignSelf // true => 'center'
  alignedStart: boolean // true => { alignSelf: 'start' }
  alignedEnd: boolean // true => { alignSelf: 'end' }
  alignedStretch: boolean // true => { alignSelf: 'stretch' }
  
  justified: string | boolean // justifySelf // true => 'center'
  justifiedStart: boolean // true => { justifySelf: 'end' }
  justifiedEnd: boolean // true => { justifySelf: 'end' }
  justifiedStretch: boolean // true => { justifySelf: 'stretch' }
  
  placed: string | boolean // placeSelf // true => { placeSelf: 'center' }
  started: boolean // true => { placeSelf: 'start' }
  ended: boolean // true => { placeSelf: 'end' }
  stretched: boolean // true => { placeSelf: 'stretch' }
  
  basis: number | string // flexBasis
  order: number | string
  grow: number | string | boolean // true => 1
  shrink: number | string | boolean // true => 1
  noShrink: boolean // true => { flexShrink: 0 }
  
  gridRow: number | string // gridRow
  gridCol: number | string // gridCol
  gridArea: number | string // gridArea
}>



export const processPlacedShortProps = <P extends object>(
  props: P & PlacedShortProps
) => {
  const {
    aligned, alignedStart, alignedEnd, alignedStretch,
    justified, justifiedStart, justifiedEnd, justifiedStretch,
    placed, started, ended, stretched,
    basis, order, grow, shrink, noShrink,
    gridRow, gridCol, gridArea,
    ...placedRest
  } = props
  
  
  
  const placedCss = {
    ...isdef(aligned) && { alignSelf: ifBool(aligned, 'center') },
    ...alignedStart && { alignSelf: 'start' },
    ...alignedEnd && { alignSelf: 'end' },
    ...alignedStretch && { alignSelf: 'stretch' },
    
    ...isdef(justified) && { justifySelf: ifBool(justified, 'center') },
    ...justifiedStart && { justifySelf: 'start' },
    ...justifiedEnd && { justifySelf: 'end' },
    ...justifiedStretch && { justifySelf: 'stretch' },
    
    ...started && { placeSelf: 'start' },
    ...ended && { placeSelf: 'end' },
    ...stretched && { placeSelf: 'stretch' },
    ...isdef(placed) && { placeSelf: ifBool(placed, 'center') },
    
    ...noShrink && { flexShrink: 0 },
    ...isdef(basis) && { flexBasis: basis },
    ...isdef(order) && { order: order },
    ...isdef(grow) && { flexGrow: ifBool(grow, 1) },
    ...isdef(shrink) && { flexShrink: ifBool(shrink, 1) },
    
    ...isdef(gridRow) && { gridRow: gridRow },
    ...isdef(gridCol) && { gridColumn: gridCol },
    ...isdef(gridArea) && { gridArea: gridArea },
  }
  
  return { placedCss, placedRest }
}



