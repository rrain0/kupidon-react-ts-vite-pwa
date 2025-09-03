import styled from '@emotion/styled'
import {
  CommonViewShortProps, processCommonViewShortProps,
} from 'src/utils/libs/short-propsed/props/processCommonViewShortProps.ts'
import clsx from 'clsx'
import React from 'react'



export type GapProps = React.ComponentProps<typeof GapView> & CommonViewShortProps

export const Gap = React.memo((props: GapProps) => {
  
  const { css, commonViewRest } = processCommonViewShortProps(props)
  const { children, className, ...restProps } = commonViewRest
  
  const commonStyleClassName = 'commonStyle'
  
  return (
    <GapView
      data-display-name='Flex'
      {...restProps}
      css={{
        [`&.${commonStyleClassName}`]: css,
      }}
      className={clsx(className, commonStyleClassName)}
    >
      {children}
    </GapView>
  )
})
Gap.displayName = 'Gap'
export default Gap



const GapView = styled.div({ display: 'flex' })




