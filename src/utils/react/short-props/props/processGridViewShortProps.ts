import {
  GridShortProps,
  processGridShortProps,
} from 'src/utils/react/short-props/base/processGridShortProps.ts'
import {
  CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/react/short-props/props/processCommonViewShortProps.ts'



export type GridViewShortProps =
  & CommonViewShortProps
  & GridShortProps

export const processGridViewShortProps = <P extends object>(
  props: P & GridViewShortProps
) => {
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { grid, gridRest } = processGridShortProps(commonViewRest)
  
  return { css: [...css, grid], gridViewRest: gridRest }
}



