import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import Pu = TypeU.Pu
import Children = ReactU.Children
import isdef = TypeU.isdef
import ClassStyle = ReactU.ClassStyle




export type FlexExtraProps = Pu<{
  row: boolean
  rowRev: boolean
  col: boolean
  colRev: boolean
  wrap: boolean
  wrapRev: boolean
  align: string
  alignCt: string
  alignSelf: string
  justifyCt: string
  g: number | string
  order: number | string
  grow: number | string
  shrink: number | string
}> & ClassStyle & Children

export type FlexProps = React.ComponentPropsWithRef<'div'> & FlexExtraProps

export const Flex = React.memo((props: FlexProps) => {
  const {
    children,
    row, rowRev, col, colRev, wrap, wrapRev,
    align, alignCt, alignSelf, justifyCt, g, order, grow, shrink,
    ...restProps
  } = props
  
  
  
  const flex = {
    ...row && { flexDirection: 'row' as const },
    ...rowRev && { flexDirection: 'row-reverse' as const },
    ...col && { flexDirection: 'column' as const },
    ...colRev && { flexDirection: 'column-reverse' as const },
    ...wrap && { flexWrap: 'wrap' as const },
    ...wrapRev && { flexWrap: 'wrap-reverse' as const },
    
    ...align && { alignItems: align },
    ...alignCt && { alignContent: alignCt },
    ...alignSelf && { alignSelf: alignSelf },
    ...justifyCt && { justifyContent: justifyCt },
    ...isdef(g) && { gap: g },
    ...isdef(order) && { order: order },
    ...isdef(grow) && { flexGrow: grow },
    ...isdef(shrink) && { flexShrink: shrink },
  }
  
  return (
    <F
      data-display-name="Flex"
      {...restProps}
      css={flex}
    >
      {children}
    </F>
  )
})
Flex.displayName = 'Flex'
export default Flex


const F = styled.div`
  display: flex;
`
