import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { Hs } from 'src/ui/elements/basic-elements/Hs.tsx'
import Button, { ButtonProps } from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Card3, { card3Style } from 'src/ui/elements/cards/Card3.tsx'
import { SvgGradIconsStyle } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIconsStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import Ripple from 'src/ui/elements/Ripple/Ripple.tsx'
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable
import ArrowAngledRoundedIc = SvgIcons.ArrowAngledRoundedIc
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import Txt = EmotionCommon.Txt




export type EditableTextCardCustomProps = {
  title: string
  text: string
  placeholder: string
} & ElementStyle.Attr0.errorJsxProp
export type EditableTextCardForwardRefProps = ButtonProps
export type EditableTextCardRefElement = HTMLButtonElement

export type EditableTextCardProps = EditableTextCardCustomProps & EditableTextCardForwardRefProps
const EditableTextCard =
React.memo(
React.forwardRef<EditableTextCardRefElement, EditableTextCardProps>(
(props, forwardedRef)=>{
  const {
    title, text, placeholder,
    ...restProps
  } = props
  
  const elemRef = useRef<EditableTextCardRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  const showPlaceholder = !text.length
  
  return <Frame
    tabIndex={0}
    {...restProps}
    ref={elemRef}
  >
    {/* <Ripple
      targetElement={elemRef}
      mode='cursor'
    /> */}
    
    <Title>{title}</Title>
    <PencilIcon/>
    <Text isPlaceholder={showPlaceholder}>
      { showPlaceholder ? placeholder : text }
    </Text>
    
  </Frame>
}))
export default EditableTextCard



const Frame = styled(Button)`
  ${ButtonStyle.common};
  ${p=>ButtonStyle.Color.transparent(p.theme)};
  ${ButtonStyle.El.btn.thiz()}{
    ${p=>card3Style(p.theme)};
    width: 100%;
    height: fit-content;
    
    display: grid;
    grid: 'title icon' auto
        'text text' auto
       / 1fr  auto;
  }
`



const Title = styled(Hs.Card3)`
  grid-area: title;
  place-self: center start;
`
const PencilIcon = styled(PencilWrite2Ic)`
  ${SvgIconsStyle.El.icon.thiz()}{
    grid-area: icon;
    align-self: center;
    height: 20px;
    ${SvgIconsStyle.El.icon.props.color.name}: ${p=>p.theme.containerNormal.content4[0]};
  }
`
const Text = styled.div<{
  isPlaceholder: boolean
}>`
  grid-area: text;
  place-self: start stretch;
  
  ${Txt.normal1};
  
  text-align: start;
  
  color: ${p=>p.theme.containerNormal.content2b[0]};
  ${p=>p.isPlaceholder && css`color: ${p.theme.containerNormal.content4[0]};`}
`