import { isdef, type Pu } from 'src/utils/base/tsUtils.ts'




export type SizeShortProps = Pu<{
  boxSizing: string
  contentBox: boolean // true => { boxSizing: 'content-box' }
  borderBox: boolean // true => { boxSizing: 'border-box' }
  
  w: number | string | 'full' | 'ct' // 'full' => '100%', 'ct' => 'fit-content'
  h: number | string | 'full' | 'ct' // 'full' => '100%', 'ct' => 'fit-content'
  sz: number | string | 'full' | 'ct' // w & h
  wMin: number | string | 'full' // 'full' => '100%'
  hMin: number | string | 'full' // 'full' => '100%'
  szMin: number | string | 'full' // 'full' => '100%'
  wMax: number | string | 'full' // 'full' => '100%'
  hMax: number | string | 'full' // 'full' => '100%'
  szMax: number | string | 'full' // 'full' => '100%'
  
  fullWMin: boolean // true => { min-width: '100%' }
  fullHMin: boolean // true => { min-height: '100%' }
  fullW: boolean // true => { width: '100%' }
  fullH: boolean // true => { height: '100%' }
  wFull: boolean // true => { width: '100%' }
  hFull: boolean // true => { height: '100%' }
  full: boolean // true => { width: '100%', height: '100%' }
  fullWMax: boolean // true => { max-width: '100%' }
  fullHMax: boolean // true => { max-height: '100%' }
  wCt: boolean // true => { width: 'fit-content' }
  hCt: boolean // true => { height: 'fit-content' }
  szCt: boolean // true => { width: 'fit-content', height: 'fit-content' }
  
  ratio: number | string // => { aspectRatio: ratio }
  rad: number | string // => { borderRadius: rad }
  
  round: boolean // true => { borderRadius: 999999 }
  
  // margins
  m: number | string
  mv: number | string
  mh: number | string
  mt: number | string
  mr: number | string
  mb: number | string
  ml: number | string
  // paddings
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
    boxSizing, contentBox, borderBox,
    
    w, h, sz, wMin, hMin, szMin, wMax, hMax, szMax,
    
    fullWMin, fullHMin,
    fullW, fullH, wFull, hFull, full,
    fullWMax, fullHMax,
    
    wCt, hCt, szCt,
    
    ratio, rad, round,
    m, mv, mh, mt, mr, mb, ml,
    p, pv, ph, pt, pr, pb, pl,
    ...sizeRest
  } = props
  
  
  
  
  
  const sizeCss = {
    ...contentBox && { boxSizing: 'content-box' },
    ...borderBox && { boxSizing: 'border-box' },
    ...isdef(boxSizing) && { boxSizing: boxSizing },
    
    ...full && { width: '100%', height: '100%' },
    ...szCt && { width: 'fit-content', height: 'fit-content' },
    ...isdef(sz) && { width: processAnySz(sz), height: processAnySz(sz) },
    ...isdef(szMin) && { minWidth: processAnySz(szMin), minHeight: processAnySz(szMin) },
    ...isdef(szMax) && { maxWidth: processAnySz(szMax), maxHeight: processAnySz(szMax) },
    
    ...fullW && { width: '100%' },
    ...fullH && { height: '100%' },
    ...wFull && { width: '100%' },
    ...hFull && { height: '100%' },
    ...wCt && { width: 'fit-content' },
    ...hCt && { height: 'fit-content' },
    ...fullWMin && { minWidth: '100%' },
    ...fullHMin && { minHeight: '100%' },
    ...fullWMax && { maxWidth: '100%' },
    ...fullHMax && { maxHeight: '100%' },
    
    ...isdef(w) && { width: processAnySz(w) },
    ...isdef(h) && { height: processAnySz(h) },
    ...isdef(wMin) && { minWidth: processAnySz(wMin) },
    ...isdef(hMin) && { minHeight: processAnySz(hMin) },
    ...isdef(wMax) && { maxWidth: processAnySz(wMax) },
    ...isdef(hMax) && { maxHeight: processAnySz(hMax) },
    
    ...round && { borderRadius: 999999 },
    
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
  
  return { sizeCss, sizeRest }
}



const processAnySz = (sz?: number | string | 'full' | 'ct') => {
  if (sz === 'full') return '100%'
  if (sz === 'ct') return 'fit-content'
  return sz
}
