import type { Pu } from 'src/utils/base/typeUtils.ts'
import { isdef } from 'src/utils/base/typeUtils.ts'
import { ifBool } from 'src/utils/base/typeUtils.ts'




export type TextShortProps = Pu<{
  textAlign: string | boolean // true => { textAlign: 'center' }
  textAlignLeft: boolean // true => { textAlign: 'left' }
  textAlignRight: boolean // true => { textAlign: 'right' }
  textAlignJustify: boolean // true => { textAlign: 'justify' }
  
  fontSz: number | string // fontSize
  fontWt: number | string // fontWeight
  lineH: number | string // lineHeight
}>



export const processTextShortProps = <P extends object>(
  props: P & TextShortProps
) => {
  const {
    textAlign, textAlignLeft, textAlignRight,  textAlignJustify,
    fontSz, fontWt, lineH,
    ...textRest
  } = props
  
  
  
  const text = {
    ...textAlignLeft && { textAlign: 'left' },
    ...textAlignRight && { textAlign: 'right' },
    ...textAlignJustify && { textAlign: 'justify' },
    ...isdef(textAlign) && { textAlign: ifBool(textAlign, 'center') },
    
    ...isdef(fontSz) && { fontSize: fontSz },
    ...isdef(fontWt) && { fontWeight: fontWt },
    ...isdef(lineH) && { lineHeight: lineH },
  }
  
  return { text, textRest }
}



