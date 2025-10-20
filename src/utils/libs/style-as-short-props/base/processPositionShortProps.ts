import { isdef, type Pu } from 'src/utils/base/tsUtils.ts'




export type PositionShortProps = Pu<{
  // { position }
  // 'rel' => { position: 'relative' }
  // 'abs' => { position: 'absolute }
  pos: string | 'rel' | 'abs'
  fixed: boolean // true => { position: 'fixed' }
  absolute: boolean // true => { position: 'absolute' }
  relative: boolean // true => { position: 'relative' }
  abs: boolean // true => { position: 'absolute' }
  // 'rel' уже занято html атрибутом
  rela: boolean // true => { position: 'relative' }
  
  t: number | string // => { top }
  r: number | string // => { right }
  b: number | string // => { bottom }
  l: number | string // => { left }
  z: number | string // => { zIndex }
  av: number | string // absolute vertical // => { top, bottom }
  ah: number | string // absolute horizontal // => { left, right }
  a: number | string // absolute all // => { top, right, bottom, left }
  
  fixedTop: boolean // true => { position: 'fixed', top: 0, left: 0, right: 0 }
  fixedBottom: boolean // true => { position: 'fixed', bottom: 0, left: 0, right: 0 }
  
  // true => { position: 'absolute', top: 0, left: 0 }
  absTl: boolean
  // true => { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }
  absTrbl: boolean
  // true => { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
  absTlwh: boolean
}>



export const processPositionShortProps = <P extends object>(
  props: P & PositionShortProps
) => {
  const {
    pos, fixed, absolute, relative, abs, rela,
    t, r, b, l, z, av, ah, a,
    fixedTop, fixedBottom,
    absTl, absTrbl, absTlwh,
    ...positionRest
  } = props
  
  
  
  const positionCss = {
    ...fixedTop && { position: 'fixed', top: 0, left: 0, right: 0 },
    ...fixedBottom && { position: 'fixed', bottom: 0, left: 0, right: 0 },
    
    ...absTl && { position: 'absolute', top: 0, left: 0 },
    ...absTrbl && { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
    ...absTlwh && { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
    
    ...abs && { position: 'absolute' },
    ...rela && { position: 'relative' },
    ...fixed && { position: 'fixed' },
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
    ...isdef(z) && { zIndex: z },
  }
  
  return { positionCss, positionRest }
}


