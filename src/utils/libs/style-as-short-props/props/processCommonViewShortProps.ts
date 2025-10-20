import {
  type ContentShortProps,
  processContentShortProps,
} from 'src/utils/libs/style-as-short-props/base/processContentShortProps.ts'
import {
  type PlacedShortProps,
  processPlacedShortProps,
} from 'src/utils/libs/style-as-short-props/base/processPlacedShortProps.ts'
import {
  type PointerShortProps,
  processPointerShortProps,
} from 'src/utils/libs/style-as-short-props/base/processPointerShortProps.ts'
import {
  type PositionShortProps,
  processPositionShortProps,
} from 'src/utils/libs/style-as-short-props/base/processPositionShortProps.ts'
import {
  processSizeShortProps,
  type SizeShortProps,
} from 'src/utils/libs/style-as-short-props/base/processSizeShortProps.ts'
import {
  type TextShortProps,
  processTextShortProps,
} from 'src/utils/libs/style-as-short-props/base/processTextShortProps.ts'




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
  const { pointerCss, pointerRest } = processPointerShortProps(props)
  const { positionCss, positionRest } = processPositionShortProps(pointerRest)
  const { sizeCss, sizeRest } = processSizeShortProps(positionRest)
  const { placedCss, placedRest } = processPlacedShortProps(sizeRest)
  const { contentCss, contentRest } = processContentShortProps(placedRest)
  const { textCss, textRest } = processTextShortProps(contentRest)
  
  return {
    css: [pointerCss, positionCss, sizeCss, placedCss, contentCss, textCss],
    commonViewRest: textRest,
  }
}



