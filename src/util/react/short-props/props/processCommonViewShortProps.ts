import {
  ContentShortProps,
  processContentShortProps,
} from 'src/util/react/short-props/base/processContentShortProps.ts'
import {
  PlacedShortProps,
  processPlacedShortProps,
} from 'src/util/react/short-props/base/processPlacedShortProps.ts'
import {
  PositionShortProps,
  processPositionShortProps,
} from 'src/util/react/short-props/base/processPositionShortProps.ts'
import {
  processSizeShortProps,
  SizeShortProps,
} from 'src/util/react/short-props/base/processSizeShortProps.ts'
import {
  processTextShortProps,
  TextShortProps,
} from 'src/util/react/short-props/base/processTextShortProps.ts'




export type CommonViewShortProps =
  & PositionShortProps
  & SizeShortProps
  & PlacedShortProps
  & ContentShortProps
  & TextShortProps

export const processCommonViewShortProps = <P extends object>(
  props: P & CommonViewShortProps
) => {
  const { position, positionRest } = processPositionShortProps(props)
  const { size, sizeRest } = processSizeShortProps(positionRest)
  const { placed, placedRest } = processPlacedShortProps(sizeRest)
  const { content, contentRest } = processContentShortProps(placedRest)
  const { text, textRest } = processTextShortProps(contentRest)
  
  return {
    css: [position, size, placed, content, text],
    commonViewRest: textRest,
  }
}



