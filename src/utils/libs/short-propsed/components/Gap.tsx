import {
  CommonViewShortProps, processCommonViewShortProps,
} from 'src/utils/libs/short-propsed/props/processCommonViewShortProps.ts'
import clsx from 'clsx'
import React from 'react'



export type GapProps = React.ComponentProps<'div'> & CommonViewShortProps

const Gap = React.memo((props: GapProps) => {
  
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { children, className, ...restProps } = commonViewRest
  
  const commonStyleClassName = 'commonStyle'
  
  return (
    <div
      data-display-name='Flex'
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
Gap.displayName = 'Gap'
export default Gap
