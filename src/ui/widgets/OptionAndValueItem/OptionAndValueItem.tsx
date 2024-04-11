import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
import Ripple from 'src/ui/elements/Ripple/Ripple.tsx'
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable




export type OptionItemCustomProps = PartialUndef<{
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
  nextIcon: React.ReactNode
}> & ElementStyle.Attr0.errorJsxProp
export type OptionItemForwardRefProps = React.JSX.IntrinsicElements['article']
export type OptionItemRefElement = HTMLDivElement

export type OptionItemProps = OptionItemCustomProps & OptionItemForwardRefProps
const OptionAndValueItem =
React.memo(
React.forwardRef<OptionItemRefElement, OptionItemProps>(
(props, forwardedRef)=>{
  const {
    icon, title, value, nextIcon,
    ...restProps
  } = props
  
  const elemRef = useRef<OptionItemRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <Frame
    tabIndex={0}
    {...restProps}
    ref={elemRef}
  >
    <Ripple
      targetElement={elemRef}
      mode='cursor'
    />
    
    <IconFrame>{icon}</IconFrame>
    <TitleFrame>{title}</TitleFrame>
    <ValueFrame>{value}</ValueFrame>
    <NextIconFrame>{nextIcon}</NextIconFrame>
  </Frame>
}))
export default OptionAndValueItem



const Frame = styled.article`
  container: option-item / size;
  display: grid;
  grid: 'icon title next' 1fr
        'icon value next' 1fr
       / 50px 1fr   40px;
  place-items: center;
  
  // appearance
  width: 100%;
  height: 50px;
  border-radius: 15px;
  padding: 2px 0;
  cursor: pointer;
  
  // color
  background: none;

  ${RippleStyle.El.framePath}{
    ${RippleStyle.Prop.color}: ${p=>p.theme.ripple.contentOnTransparent[0]};
  }
  
  ${hoverable}{:hover{
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  }}
  :focus-visible {
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  }
  
  ${ElementStyle.Attr0.selThis.error}{
    background: ${p=>p.theme.input.bgcError[0]};
  }
`



const IconFrame = styled.div`
  grid-area: icon;
  place-self: stretch;
  display: grid;
  place-items: center center;

  ${SvgIcStyle.Prop.prop.color}: ${p=>p.theme.containerNormal.content3[0]};
`
const TitleFrame = styled.div`
  grid-area: title;
  justify-self: start;
  display: grid;
  place-items: center start;
  
  color: ${p=>p.theme.containerNormal.content[0]};
`
const ValueFrame = styled.div`
  grid-area: value;
  justify-self: start;
  display: grid;
  place-items: center start;

  color: ${p=>p.theme.containerNormal.content3[0]};
`
const NextIconFrame = styled.div`
  grid-area: next;
  place-self: stretch;
  display: grid;
  place-items: center end;

  ${SvgIcStyle.Prop.prop.color}: ${p=>p.theme.containerNormal.content3[0]};
`