import {
  type CommonViewShortProps,
  processCommonViewShortProps,
} from 'src/utils/libs/short-propsed/props/processCommonViewShortProps.ts'
import clsx from 'clsx'
import React from 'react'



export type DivProps = React.ComponentProps<'div'> & CommonViewShortProps

const Div = React.memo((props: DivProps) => {
  
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { children, className, ...restProps } = commonViewRest
  
  const commonStyleClassName = 'commonStyle'
  
  return (
    <div
      data-display-name='Div'
      {...restProps}
      css={{
        [`&.${commonStyleClassName}`]: css,
      }}
      className={clsx(className, commonStyleClassName)}
    >
      {children}
    </div>
  )
})
Div.displayName = 'Div'
export default Div
