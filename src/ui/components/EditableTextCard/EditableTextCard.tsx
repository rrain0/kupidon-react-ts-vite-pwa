import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import { Hs } from 'src/ui/elements/basic-elements/Hs.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { card3Style } from 'src/ui/elements/cards/Card3.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import PartialUndef = TypeUtils.PartialUndef
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import Txt = EmotionCommon.Txt
import Callback = TypeUtils.Callback




type EditableTextCardProps = PartialUndef<{
  title: string
  text: string
  placeholder: string
  'data-error': true | undefined
  onClick: Callback
}>

const EditableTextCard =
React.memo(
(props: EditableTextCardProps) => {
  const {
    title, text, placeholder,
    ...restProps
  } = props
  
  const showPlaceholder = !text?.length
  
  return <Frame
    tabIndex={0}
    {...restProps}
  >
    
    <Title>{title}</Title>
    <PencilIcon/>
    <Text isPlaceholder={showPlaceholder}>
      { showPlaceholder ? placeholder : text }
    </Text>
    
  </Frame>
})
export default EditableTextCard



const Frame = styled(Button)`
  ${ButtonStyle.basic};
  ${p=>ButtonStyle.textRectBigNormal(p.theme)};
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