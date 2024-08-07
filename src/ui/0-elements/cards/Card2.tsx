import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { ReactU } from 'src/util/common/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import col = EmotionCommon.col




export type Card2CustomProps = PartialUndef<{
  children: React.ReactNode
}>
export type ForwardRefProps = React.JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type Car2Props = Card2CustomProps & ForwardRefProps
const Card2 =
React.memo(
React.forwardRef<RefElement, Car2Props>(
(props, forwardedRef)=>{
  const {
    children,
    ...restProps
  } = props
  
  const elemRef = useRef<RefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <Frame
    {...restProps}
    ref={elemRef}
  >
    {children}
  </Frame>
}))
export default Card2



const Frame = styled.article`
  ${col};
  gap: inherit;
  padding: 16px 12px;
  border-radius: 16px;
  background: ${p=>p.theme.containerNormal.bg[0]};
`