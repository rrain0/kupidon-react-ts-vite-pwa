import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import mapBool = TypeU.mapBool
import isdef = TypeU.isdef




export type GridShortProps = Pu<{
  cols: string
  
  align: string | boolean // alignItems // true => 'center'
  justify: string | boolean // justifyItems // true => 'center'
  place: string | boolean // true => { alignItems: 'center', justifyItems: 'center' }
  center: boolean // true => { alignItems: 'center', justifyItems: 'center' }
  stretch: boolean // true => { alignItems: 'stretch', justifyItems: 'stretch' }
  
  alignCt: string | boolean // alignContent // true => 'center'
  justifyCt: string | boolean // justifyContent // true => 'center'
  
  g: number | string
}>



export const processGridShortProps = <P extends object>(
  props: P & GridShortProps
) => {
  const {
    cols,
    align, justify,
    alignCt, justifyCt,
    place, center, stretch,
    g,
    ...gridRest
  } = props
  
  
  
  const grid = {
    ...isdef(cols) && { gridTemplateColumns: cols },
    
    ...center && { placeItems: 'center' },
    ...stretch && { placeItems: 'stretch' },
    ...isdef(place) && { placeItems: mapBool(place, 'center') },
    
    ...isdef(align) && { alignItems: mapBool(align, 'center') },
    ...isdef(justify) && { justifyItems: mapBool(align, 'center') },
    ...isdef(alignCt) && { alignContent: mapBool(alignCt, 'center') },
    ...isdef(justifyCt) && { justifyContent: mapBool(justifyCt, 'center') },
    
    ...isdef(g) && { gap: g },
  }
  
  return { grid, gridRest }
}



