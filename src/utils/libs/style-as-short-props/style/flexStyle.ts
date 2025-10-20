import {
  type FlexViewShortProps,
  processFlexViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processFlexViewShortProps.ts'



export const flexStyle = <P extends object>(
  flexShortProps: P & FlexViewShortProps
) => {
  const { css, flexViewRest } = processFlexViewShortProps(flexShortProps)
  return [{ display: 'flex' }, ...css, flexViewRest ]
}
