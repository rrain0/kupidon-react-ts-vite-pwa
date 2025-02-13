import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { CardS } from 'src/ui/0-elements/cards/CardS.ts'
import PartialUndef = TypeU.PartialUndef




export type CardCustomProps = PartialUndef<{
  children: React.ReactNode
}>
export type ForwardRefProps = React.JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type CardProps = CardCustomProps & ForwardRefProps
const Card = React.memo(React.forwardRef<RefElement, CardProps>(
  (props, forwardedRef) => {
    const {
      children,
      ...restProps
    } = props
    
    const elemRef = useRef<RefElement>(null)
    useImperativeHandle(forwardedRef, () => elemRef.current!, [])
    
    
    return (
      <Frame
        {...restProps}
        ref={elemRef}
      >
        {children}
      </Frame>
    )
  }
))
export default Card



const Frame = styled.article`
  ${p => CardS.card3S(p.theme)};
`
