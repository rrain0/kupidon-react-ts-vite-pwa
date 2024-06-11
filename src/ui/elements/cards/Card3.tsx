import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef
import col = EmotionCommon.col




export type Card3CustomProps = PartialUndef<{
  children: React.ReactNode
}>
export type ForwardRefProps = React.JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type Car3Props = Card3CustomProps & ForwardRefProps
const Card3 =
React.memo(
React.forwardRef<RefElement, Car3Props>(
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
export default Card3



export const card3Style = (t: AppTheme.Theme) => css`
  box-shadow: 0px 4px 15px 0px ${t.containerNormal.shadow[0]};
  border-radius: 15px;
  background: ${t.containerNormal.bgc[0]};
  padding: 16px 16px;
  ${col};
  gap: 10px;
`
const Frame = styled.article`
  ${p=>card3Style(p.theme)};
`
