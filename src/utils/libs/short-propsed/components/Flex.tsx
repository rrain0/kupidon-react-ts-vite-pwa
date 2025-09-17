import styled from '@emotion/styled'
import {
  type FlexViewShortProps,
  processFlexViewShortProps,
} from 'src/utils/libs/short-propsed/props/processFlexViewShortProps.ts'
import clsx from 'clsx'
import React from 'react'



export type FlexProps = React.ComponentProps<typeof FlexDiv> & FlexViewShortProps

const Flex = React.memo((props: FlexProps) => {
  
  const { css, flexViewRest } = processFlexViewShortProps(props)
  const { children, className, ...restProps } = flexViewRest
  
  const flexStyleClassName = 'flexStyle'
  
  return (
    <FlexDiv
      data-display-name='Flex'
      {...restProps}
      css={{
        [`&.${flexStyleClassName}`]: css,
      }}
      className={clsx(className, flexStyleClassName)}
    >
      {children}
    </FlexDiv>
  )
})
Flex.displayName = 'Flex'
export default Flex



const FlexDiv = styled.div({ display: 'flex' })
