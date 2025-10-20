import {
  type CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processCommonViewShortProps.ts'



export const commonStyle = <P extends object>(
  commonShortProps: P & CommonViewShortProps
) => {
  const { css, commonViewRest } = processCommonViewShortProps(commonShortProps)
  return [...css, commonViewRest ]
}

export const shortStyle = commonStyle
