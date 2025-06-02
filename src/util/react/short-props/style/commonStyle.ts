import {
  CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/util/react/short-props/props/processCommonViewShortProps.ts'



export const commonStyle = <P extends object>(
  commonShortProps: P & CommonViewShortProps
) => {
  const { css, commonViewRest } = processCommonViewShortProps(commonShortProps)
  return [...css, commonViewRest ]
}
