import { isdef, ifBool, type Pu } from 'src/utils/base/tsUtils.ts'




export type GridShortProps = Pu<{
  grid: string // { grid }
  areas: string // { gridTemplateAreas }
  rows: string // { gridTemplateRows }
  cols: string // { gridTemplateColumns }
  
  autoRows: string // { gridAutoRows }
  autoCols: string // { gridAutoColumns }
  
  
  align: string | boolean // alignItems // true => 'center'
  justify: string | boolean // justifyItems // true => 'center'
  place: string | boolean // true => { placeItems: 'center' }
  
  alignCt: string | boolean // alignContent // true => 'center'
  justifyCt: string | boolean // justifyContent // true => 'center'
  placeCt: string | boolean // true => { placeContent: 'center' }
  
  alignStart: boolean // true => { alignItems: 'start' }
  alignEnd: boolean // true => { alignItems: 'end' }
  alignStretch: boolean // true => { alignItems: 'stretch' }
  
  start: boolean // true => { placeItems: 'start' }
  center: boolean // true => { placeItems: 'center' }
  stretch: boolean // true => { placeItems: 'stretch' }
  
  endStretch: boolean // true => { placeItems: 'end stretch' }
  
  gap: number | string // { gap }
  g: number | string // { gap }
  gRow: number | string // { rowGap }
  gCol: number | string // { columnGap }
}>



export const processGridShortProps = <P extends object>(
  props: P & GridShortProps
) => {
  const {
    grid, areas, rows, cols,
    autoRows, autoCols,
    align, justify, place,
    alignCt, justifyCt, placeCt,
    alignStart, alignEnd, alignStretch,
    start, center, stretch, endStretch,
    gap, g, gRow, gCol,
    ...gridRest
  } = props
  
  
  
  const gridCss = {
    ...isdef(grid) && { grid },
    ...isdef(areas) && { gridTemplateAreas: areas },
    ...isdef(rows) && { gridTemplateRows: rows },
    ...isdef(cols) && { gridTemplateColumns: cols },
    
    ...isdef(autoRows) && { gridAutoRows: autoRows },
    ...isdef(autoCols) && { gridAutoColumns: autoCols },
    
    
    ...alignStart && { alignItems: 'start' },
    ...alignEnd && { alignItems: 'end' },
    ...alignStretch && { alignItems: 'stretch' },
    
    ...start && { placeItems: 'start' },
    ...center && { placeItems: 'center' },
    ...stretch && { placeItems: 'stretch' },
    
    ...endStretch && { placeItems: 'end stretch' },
    
    ...isdef(place) && { placeItems: ifBool(place, 'center') },
    ...isdef(align) && { alignItems: ifBool(align, 'center') },
    ...isdef(justify) && { justifyItems: ifBool(align, 'center') },
    
    ...isdef(placeCt) && { placeContent: ifBool(placeCt, 'center') },
    ...isdef(alignCt) && { alignContent: ifBool(alignCt, 'center') },
    ...isdef(justifyCt) && { justifyContent: ifBool(justifyCt, 'center') },
    
    ...isdef(gap) && { gap: gap },
    ...isdef(g) && { gap: g },
    ...isdef(gRow) && { rowGap: gRow },
    ...isdef(gCol) && { columnGap: gCol },
  }
  
  return { gridCss, gridRest }
}



