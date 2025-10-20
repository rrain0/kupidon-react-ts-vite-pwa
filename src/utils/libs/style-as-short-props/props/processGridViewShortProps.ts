import {
  type GridShortProps,
  processGridShortProps,
} from 'src/utils/libs/style-as-short-props/base/processGridShortProps.ts'
import {
  type CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processCommonViewShortProps.ts'



export type GridViewShortProps =
  & CommonViewShortProps
  & GridShortProps

export const processGridViewShortProps = <P extends object>(
  props: P & GridViewShortProps
) => {
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { gridCss, gridRest } = processGridShortProps(commonViewRest)
  
  return { css: [...css, gridCss], gridViewRest: gridRest }
}



