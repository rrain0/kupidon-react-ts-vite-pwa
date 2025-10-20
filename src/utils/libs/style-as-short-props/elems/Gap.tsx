import {
  type CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processCommonViewShortProps.ts'
import React from 'react'



export type GapProps = React.ComponentProps<'div'> & CommonViewShortProps

const Gap = React.memo((props: GapProps) => {
  
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { children, ...restProps } = commonViewRest
  
  return (
    <div
      data-display-name='Gap'
      {...restProps}
      css={css}
    >
      {children}
    </div>
  )
})
Gap.displayName = 'Gap'
export default Gap
