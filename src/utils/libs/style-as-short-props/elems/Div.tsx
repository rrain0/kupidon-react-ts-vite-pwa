import {
  type CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processCommonViewShortProps.ts'
import React from 'react'



export type DivProps = React.ComponentProps<'div'> & CommonViewShortProps

const Div = React.memo((props: DivProps) => {
  
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { children, ...restProps } = commonViewRest
  
  return (
    <div
      data-display-name='Div'
      {...restProps}
      css={css}
    >
      {children}
    </div>
  )
})
Div.displayName = 'Div'
export default Div
