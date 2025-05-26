import {
  FlexShortProps,
  processFlexShortProps,
} from 'src/util/react/short-props/base/processFlexShortProps.ts'
import {
  CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/util/react/short-props/props/processCommonViewShortProps.ts'



export type FlexViewShortProps =
  & CommonViewShortProps
  & FlexShortProps

export const processFlexViewShortProps = <P extends object>(
  props: P & FlexViewShortProps
) => {
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { flex, flexRest } = processFlexShortProps(commonViewRest)
  
  return { css: [...css, flex], flexViewRest: flexRest }
}



