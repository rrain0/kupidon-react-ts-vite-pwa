import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import isdef = TypeU.isdef




export type ContentShortProps = Pu<{
  boxSizing: string
  contentBox: boolean // true => { boxSizing: 'content-box' }
  borderBox: boolean // true => { boxSizing: 'border-box' }
  
  bg: string // background
  bgColor: string // backgroundColor
  color: string // color
  
  noOverflow: boolean // true => { overflow: 'hidden' }
  overflowAuto: boolean // true => { overflow: 'auto' }
  noPointer: boolean // true => { pointerEvents: 'none' }
}>



export const processContentShortProps = <P extends object>(
  props: P & ContentShortProps
) => {
  const {
    boxSizing, contentBox, borderBox,
    bg, bgColor, color,
    noOverflow, noPointer,
    ...contentRest
  } = props
  
  
  
  const content = {
    ...contentBox && { boxSizing: 'content-box' },
    ...borderBox && { boxSizing: 'border-box' },
    ...isdef(boxSizing) && { boxSizing: boxSizing },
    
    ...isdef(bg) && { background: bg },
    ...isdef(bgColor) && { backgroundColor: bgColor },
    ...isdef(color) && { color: color },
    
    ...noOverflow && { overflow: 'hidden' },
    ...noPointer && { pointerEvents: 'none' },
  }
  
  return { content, contentRest }
}



