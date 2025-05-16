import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import mapBool = TypeU.mapBool
import isdef = TypeU.isdef




export type PositionShortProps = Pu<{
  pos: string | 'rel' | 'abs' // 'rel' => 'relative', 'abs' => 'absolute
  t: number | string
  r: number | string
  b: number | string
  l: number | string
  absTrbl: boolean // true => { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }
  absTlwh: boolean // true => { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
}>



export const processPositionShortProps = <P extends object>(
  props: P & PositionShortProps
) => {
  const {
    pos, t, r, b, l,
    absTrbl, absTlwh,
    ...positionRest
  } = props
  
  
  
  const position = {
    ...absTrbl && { position: 'absolute', top: 0, right: 0, bottom: 0,  left: 0 },
    ...absTlwh && { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
    
    ...isdef(pos) && {
      position: (() => {
        if (pos === 'rel') return 'relative'
        if (pos === 'abs') return 'absolute'
        return pos
      })(),
    },
    ...isdef(t) && { top: t },
    ...isdef(r) && { right: r },
    ...isdef(b) && { bottom: b },
    ...isdef(l) && { left: l },
  }
  
  return { position, positionRest }
}


