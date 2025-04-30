import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import Pu = TypeU.Pu
import Children = ReactU.Children
import ClassStyle = ReactU.ClassStyle
import mapBool = TypeU.mapBool




export type FlexExtraProps = Pu<{
  w: number | string
  h: number | string
  full: boolean // true => { width: '100%', height: '100%' }
  
  row: boolean
  rowRev: boolean
  col: boolean
  colRev: boolean
  wrap: boolean
  wrapRev: boolean
  
  align: string | boolean // true => 'center'
  alignCt: string | boolean // true => 'center'
  alignSelf: string | boolean // true => 'center'
  justifyCt: string | boolean // true => 'center'
  
  center: boolean // true => { alignItems: 'center', justifyContent: 'center' }
  
  g: number | string
  order: number | string
  grow: number | string | boolean // true => 1
  shrink: number | string | boolean // true => 1
  noShrink: boolean // true => { flexShrink: 0 }
}> & ClassStyle & Children

export type FlexProps = React.ComponentPropsWithRef<'div'> & FlexExtraProps

export const Flex = React.memo((props: FlexProps) => {
  const {
    children,
    w, h, full,
    row, rowRev, col, colRev, wrap, wrapRev,
    align, alignCt, alignSelf, justifyCt, center,
    g, order, grow, shrink, noShrink,
    ...restProps
  } = props
  
  
  
  const flex = {
    width: w,
    height: h,
    ...full && { width: '100%', height: '100%' },
    
    ...row && { flexDirection: 'row' as const },
    ...rowRev && { flexDirection: 'row-reverse' as const },
    ...col && { flexDirection: 'column' as const },
    ...colRev && { flexDirection: 'column-reverse' as const },
    ...wrap && { flexWrap: 'wrap' as const },
    ...wrapRev && { flexWrap: 'wrap-reverse' as const },
    
    alignItems: mapBool(align, 'center'),
    alignContent: mapBool(alignCt, 'center'),
    alignSelf: mapBool(alignSelf, 'center'),
    justifyContent: mapBool(justifyCt, 'center'),
    ...center && { alignItems: 'center', justifyContent: 'center' },
    
    gap: g,
    order: order,
    flexGrow: mapBool(grow, 1),
    flexShrink: mapBool(shrink, 1),
    ...noShrink && { flexShrink: 0 },
  }
  
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


const F = styled.div`
  display: flex;
`




