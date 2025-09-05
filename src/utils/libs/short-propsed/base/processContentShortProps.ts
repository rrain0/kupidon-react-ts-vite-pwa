import { Pu } from 'src/utils/base/typeUtils.ts'
import { isdef } from 'src/utils/base/typeUtils.ts'




export type ContentShortProps = Pu<{
  
  bg: string // background
  bgColor: string // backgroundColor
  color: string // color
  
  noOverflow: boolean // true => { overflow: 'hidden' }
  overflowAuto: boolean // true => { overflow: 'auto' }
}>



export const processContentShortProps = <P extends object>(
  props: P & ContentShortProps
) => {
  const {
    bg, bgColor, color,
    noOverflow,
    ...contentRest
  } = props
  
  
  
  const content = {
    ...isdef(bg) && { background: bg },
    ...isdef(bgColor) && { backgroundColor: bgColor },
    ...isdef(color) && { color: color },
    
    ...noOverflow && { overflow: 'hidden' },
  }
  
  return { content, contentRest }
}



