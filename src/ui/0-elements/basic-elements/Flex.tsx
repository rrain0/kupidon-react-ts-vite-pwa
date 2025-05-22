import styled from '@emotion/styled'
import {
  FlexViewShortProps,
  processFlexViewShortProps,
} from '@util/react/short-props/processFlexViewShortProps.ts'
import React from 'react'



export type FlexProps = React.ComponentProps<typeof FlexBox> & FlexViewShortProps

export const Flex = React.memo((props: FlexProps) => {
  
  const { css, flexViewRest } = processFlexViewShortProps(props)
  const { children, ...restProps } = flexViewRest
  
  return (
    <FlexBox
      data-display-name='Flex'
      css={{ '&&': css }}
      {...restProps}
    >
      {children}
    </FlexBox>
  )
})
Flex.displayName = 'Flex'
export default Flex


const FlexBox = styled.div({ display: 'flex' })




