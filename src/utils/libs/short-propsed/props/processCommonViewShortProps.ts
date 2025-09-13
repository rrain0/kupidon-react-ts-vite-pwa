import {
  type ContentShortProps,
  processContentShortProps,
} from 'src/utils/libs/short-propsed/base/processContentShortProps.ts'
import {
  type PlacedShortProps,
  processPlacedShortProps,
} from 'src/utils/libs/short-propsed/base/processPlacedShortProps.ts'
import {
  type PointerShortProps,
  processPointerShortProps,
} from 'src/utils/libs/short-propsed/base/processPointerShortProps.ts'
import {
  type PositionShortProps,
  processPositionShortProps,
} from 'src/utils/libs/short-propsed/base/processPositionShortProps.ts'
import {
  processSizeShortProps,
  type SizeShortProps,
} from 'src/utils/libs/short-propsed/base/processSizeShortProps.ts'
import {
  type TextShortProps,
  processTextShortProps,
} from 'src/utils/libs/short-propsed/base/processTextShortProps.ts'




export type CommonViewShortProps =
  & PointerShortProps
  & PositionShortProps
  & SizeShortProps
  & PlacedShortProps
  & ContentShortProps
  & TextShortProps

export const processCommonViewShortProps = <P extends object>(
  props: P & CommonViewShortProps
) => {
  const { pointer, pointerRest } = processPointerShortProps(props)
  const { position, positionRest } = processPositionShortProps(pointerRest)
  const { size, sizeRest } = processSizeShortProps(positionRest)
  const { placed, placedRest } = processPlacedShortProps(sizeRest)
  const { content, contentRest } = processContentShortProps(placedRest)
  const { text, textRest } = processTextShortProps(contentRest)
  
  return {
    css: [pointer, position, size, placed, content, text],
    commonViewRest: textRest,
  }
}



