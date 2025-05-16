import styled from '@emotion/styled'
import {
  FlexViewShortProps,
  processFlexViewShortProps,
} from '@util/react/short-props/processFlexViewShortProps.ts'
import React from 'react'



export type FlexProps = React.ComponentProps<'div'> & FlexViewShortProps

export const Flex = React.memo((props: FlexProps) => {
  
  const { css, flexViewRest } = processFlexViewShortProps(props)
  const { children, ...restProps } = flexViewRest
  
  return (
    <FlexDiv
      data-display-name='Flex'
      css={css}
      {...restProps}
    >
      {children}
    </FlexDiv>
  )
})
Flex.displayName = 'Flex'
export default Flex


const FlexDiv = styled.div({ display: 'flex' })




