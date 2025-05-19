import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import isdef = TypeU.isdef




export type SizeShortProps = Pu<{
  w: number | string | 'full' | 'ct' // 'full' => '100%', 'ct' => 'fit-content'
  h: number | string | 'full' | 'ct' // 'full' => '100%', 'ct' => 'fit-content'
  sz: number | string | 'full' | 'ct' // w & h
  wMin: number | string | 'full' // 'full' => '100%'
  hMin: number | string | 'full' // 'full' => '100%'
  szMin: number | string | 'full' // 'full' => '100%'
  wMax: number | string | 'full' // 'full' => '100%'
  hMax: number | string | 'full' // 'full' => '100%'
  szMax: number | string | 'full' // 'full' => '100%'
  
  fullW: boolean // true => { width: '100%' }
  fullH: boolean // true => { height: '100%' }
  full: boolean // true => { width: '100%', height: '100%' }
  
  ratio: number | string
  rad: number | string
  
  m: number | string
  mv: number | string
  mh: number | string
  mt: number | string
  mr: number | string
  mb: number | string
  ml: number | string
  p: number | string
  pv: number | string
  ph: number | string
  pt: number | string
  pr: number | string
  pb: number | string
  pl: number | string
}>



export const processSizeShortProps = <P extends object>(
  props: P & SizeShortProps
) => {
  const {
    w, h, sz, wMin, hMin, szMin, wMax, hMax, szMax, fullW, fullH, full,
    ratio, rad,
    m, mv, mh, mt, mr, mb, ml,
    p, pv, ph, pt, pr, pb, pl,
    ...sizeRest
  } = props
  
  
  
  
  
  const size = {
    ...full && { width: '100%', height: '100%' },
    ...isdef(sz) && { width: processAnySz(sz), height: processAnySz(sz) },
    ...isdef(szMin) && { minWidth: processAnySz(szMin), minHeight: processAnySz(szMin) },
    ...isdef(szMax) && { maxWidth: processAnySz(szMax), maxHeight: processAnySz(szMax) },
    
    ...fullW && { width: '100%' },
    ...fullH && { height: '100%' },
    
    ...isdef(w) && { width: processAnySz(w) },
    ...isdef(h) && { height: processAnySz(h) },
    ...isdef(wMin) && { minWidth: processAnySz(wMin) },
    ...isdef(hMin) && { minHeight: processAnySz(hMin) },
    ...isdef(wMax) && { maxWidth: processAnySz(wMax) },
    ...isdef(hMax) && { maxHeight: processAnySz(hMax) },
    
    
    ...isdef(ratio) && { aspectRatio: ratio },
    ...isdef(rad) && { borderRadius: rad },
    
    
    ...isdef(m) && { margin: m },
    ...isdef(mv) && { marginTop: mv, marginBottom: mv },
    ...isdef(mh) && { marginLeft: mh, marginRight: mh },
    ...isdef(mt) && { marginTop: mt },
    ...isdef(mr) && { marginRight: mr },
    ...isdef(mb) && { marginBottom: mb },
    ...isdef(ml) && { marginLeft: ml },
    
    ...isdef(p) && { padding: p },
    ...isdef(pv) && { paddingTop: pv, paddingBottom: pv },
    ...isdef(ph) && { paddingLeft: ph, paddingRight: ph },
    ...isdef(pt) && { paddingTop: pt },
    ...isdef(pr) && { paddingRight: pr },
    ...isdef(pb) && { paddingBottom: pb },
    ...isdef(pl) && { paddingLeft: pl },
  }
  
  return { size, sizeRest }
}



const processAnySz = (sz?: number | string | 'full' | 'ct') => {
  if (sz === 'full') return '100%'
  if (sz === 'ct') return 'fit-content'
  return sz
}
