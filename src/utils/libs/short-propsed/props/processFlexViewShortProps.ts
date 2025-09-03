import {
  FlexShortProps,
  processFlexShortProps,
} from 'src/utils/libs/short-propsed/base/processFlexShortProps.ts'
import {
  CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/short-propsed/props/processCommonViewShortProps.ts'



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



