import styled from '@emotion/styled'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import {
  FlexShortProps,
  processFlexShortProps,
} from 'src/ui/0-elements/basic-elements/processFlexShortProps.ts'
import Children = ReactU.Children
import ClassStyle = ReactU.ClassStyle



export type FlexExtraProps = FlexShortProps & ClassStyle & Children

export type FlexProps = React.ComponentProps<'div'> & FlexExtraProps



export const Flex = React.memo((props: FlexProps) => {
  const { flex, rest: { children, ...restProps } } = processFlexShortProps(props)
  
  return (
    <F
      data-display-name='Flex'
      {...restProps}
      css={flex}
    >
      {children}
    </F>
  )
})
Flex.displayName = 'Flex'
export default Flex


const F = styled.div({ display: 'flex' })




