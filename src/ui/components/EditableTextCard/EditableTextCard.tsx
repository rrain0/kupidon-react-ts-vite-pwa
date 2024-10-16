import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import { Hs } from 'src/ui/0-elements/basic-elements/Hs.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { card3Style } from 'src/ui/0-elements/cards/Card3.tsx'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS.ts'
import PartialUndef = TypeU.PartialUndef
import PencilWrite2Ic = SvgIcons.PencilWrite2Ic
import Txt = EmotionCommon.Txt
import Callback = TypeU.Callback
import HtmlBool = TypeU.HtmlBool




type EditableTextCardProps = PartialUndef<{
  title: string
  text: string
  placeholder: string
  'data-error': HtmlBool
  onClick: Callback
}>

const EditableTextCard = React.memo(
  (props: EditableTextCardProps) => {
    const {
      title, text, placeholder,
      ...restProps
    } = props
    
    const showPlaceholder = !text && !!placeholder
    const showAnyText = !!(text || placeholder)
    
    return (
      <Frame
        tabIndex={0}
        {...restProps}
        showAnyText={showAnyText}
      >
        
        <Title>{title}</Title>
        <PencilIcon />
        {showAnyText && (
          <Text isPlaceholder={showPlaceholder}>
            {showPlaceholder ? placeholder : text}
          </Text>
        )}
        
      </Frame>
    )
  }
)
export default EditableTextCard



const Frame = styled(Button)<{ showAnyText?: boolean }>`
  ${p => ButtonS.textRectBigNormal(p.theme)};
  ${ButtonS.W.use.s.normal().e.button().thisUse} {
    ${p => card3Style(p.theme)};
    width: 100%;
    height: fit-content;
    min-height: 68px;
    
    display: grid;
    grid:
         'title icon' auto
      ${p => p.showAnyText &&
        `'text  text' auto`
      }
    /    1fr   auto;
  }
`



const Title = styled(Hs.Card3)`
  grid-area: title;
  place-self: center start;
  text-align: start;
`
const PencilIcon = styled(PencilWrite2Ic)`
  ${SvgIconS.El.icon.thiz()}{
    grid-area: icon;
    align-self: center;
    height: 20px;
    ${SvgIconS.El.icon.props.color.name}: ${p => p.theme.containerNormal.content4[0]};
  }
`
const Text = styled.div<{
  isPlaceholder: boolean
}>`
  grid-area: text;
  place-self: start stretch;
  
  ${Txt.normal1};
  
  text-align: start;
  
  color: ${p => p.theme.containerNormal.content2b[0]};
  ${p => p.isPlaceholder && css`color: ${p.theme.containerNormal.content4[0]};`}
`
