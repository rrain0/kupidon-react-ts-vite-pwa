import styled from '@emotion/styled'
import {
  type FlexViewShortProps,
  processFlexViewShortProps,
} from 'src/utils/libs/style-as-short-props/props/processFlexViewShortProps.ts'
import React from 'react'



export type FlexProps = React.ComponentProps<typeof FlexDiv> & FlexViewShortProps

const Flex = React.memo((props: FlexProps) => {
  
  const { css, flexViewRest } = processFlexViewShortProps(props)
  const { children, ...restProps } = flexViewRest
  
  return (
    <FlexDiv
      data-display-name='Flex'
      {...restProps}
      css={css}
    >
      {children}
    </FlexDiv>
  )
})
Flex.displayName = 'Flex'
export default Flex



const FlexDiv = styled.div({ display: 'flex' })
