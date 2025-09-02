import {
  ContentShortProps,
  processContentShortProps,
} from 'src/utils/react/short-props/base/processContentShortProps.ts'
import {
  PlacedShortProps,
  processPlacedShortProps,
} from 'src/utils/react/short-props/base/processPlacedShortProps.ts'
import {
  PointerShortProps,
  processPointerShortProps,
} from 'src/utils/react/short-props/base/processPointerShortProps.ts'
import {
  PositionShortProps,
  processPositionShortProps,
} from 'src/utils/react/short-props/base/processPositionShortProps.ts'
import {
  processSizeShortProps,
  SizeShortProps,
} from 'src/utils/react/short-props/base/processSizeShortProps.ts'
import {
  processTextShortProps,
  TextShortProps,
} from 'src/utils/react/short-props/base/processTextShortProps.ts'




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



