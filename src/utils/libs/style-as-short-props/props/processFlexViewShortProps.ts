import {
  type FlexShortProps,
  processFlexShortProps,
} from 'src/utils/libs/style-as-short-props/base/processFlexShortProps.ts'
import {
  type CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processCommonViewShortProps.ts'



export type FlexViewShortProps =
  & CommonViewShortProps
  & FlexShortProps

export const processFlexViewShortProps = <P extends object>(
  props: P & FlexViewShortProps
) => {
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { flexCss, flexRest } = processFlexShortProps(commonViewRest)
  
  return { css: [...css, flexCss], flexViewRest: flexRest }
}



