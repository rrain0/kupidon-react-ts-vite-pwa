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
  av: number | string // top & bottom
  ah: number | string // left & right
  a: number | string // top & right & bottom & left
  absTrbl: boolean // true => { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }
  absTlwh: boolean // true => { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
  absolute: boolean // true => { position: 'relative' }
  relative: boolean // true => { position: 'relative' }
}>



export const processPositionShortProps = <P extends object>(
  props: P & PositionShortProps
) => {
  const {
    pos, t, r, b, l, av, ah, a,
    absTrbl, absTlwh, absolute, relative,
    ...positionRest
  } = props
  
  
  
  const position = {
    ...absTrbl && { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
    ...absTlwh && { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
    
    ...absolute && { position: 'absolute' },
    ...relative && { position: 'relative' },
    ...isdef(pos) && {
      position: (() => {
        if (pos === 'rel') return 'relative'
        if (pos === 'abs') return 'absolute'
        return pos
      })(),
    },
    
    ...isdef(a) && { top: a, right: a, bottom: a, left: a },
    ...isdef(av) && { top: av, bottom: av },
    ...isdef(ah) && { right: ah, left: ah },
    
    ...isdef(t) && { top: t },
    ...isdef(r) && { right: r },
    ...isdef(b) && { bottom: b },
    ...isdef(l) && { left: l },
  }
  
  return { position, positionRest }
}


