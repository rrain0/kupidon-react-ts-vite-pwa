import {
  GridShortProps,
  processGridShortProps,
} from 'src/util/react/short-props/base/processGridShortProps.ts'
import {
  CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/util/react/short-props/processCommonViewShortProps.ts'



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



