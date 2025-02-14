import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import PencilWrite2Ic = SvgIconsPack.PencilWrite2Ic
import Txt = EmotionCommon.Txt
import Callback = TypeU.Callback
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import HtmlAttrExistence = TypeU.HtmlAttrExistence




type EditableTextCardProps = PartialUndef<{
  title: string
  text: string
  placeholder: string
  'data-error': HtmlAttrExistence
  onClick: Callback
}>

const EditableTextCard = React.memo((props: EditableTextCardProps) => {
  const {
    title, text, placeholder,
    ...restProps
  } = props
  
  const showPlaceholder = !text && !!placeholder
  const showAnyText = !!(text || placeholder)
  
  return (
    <Frame
      data-react-display-name="EditableTextCard"
      tabIndex={0}
      {...restProps}
      showAnyText={showAnyText}
    >
      
      <Title>{title}</Title>
      <PencilWrite2Ic css={SvgIconS6.t(pencilIconS)} />
      {showAnyText && (
        <Text isPlaceholder={showPlaceholder}>
          {showPlaceholder ? placeholder : text}
        </Text>
      )}
      
    </Frame>
  )
})
EditableTextCard.displayName = 'EditableTextCard'
export default EditableTextCard



const Frame = styled(Button, {
  shouldForwardProp: p => p !== 'showAnyText',
})<{ showAnyText?: boolean }>`
  ${p => ButtonS6.t(ButtonS6.S.text.rect.lg.normal)(p.theme)};
  ${ButtonS.W.use.s.normal().e.button().thisUse} {
    // TODO Style - need support for text / emotion styles
    ${p => CardS.card3S(p.theme)};
  }
  ${p => ButtonS6.W.t(p.theme, {
    button: {
      w: 'full', h: 'ct', hMin: 68,
      display: 'grid',
      grid:
        `'title icon' auto` +
        (p.showAnyText ? `'text  text' auto` : '') +
        `/1fr   auto`,
    },
  })}
`



const Title = styled(Hdrs.Card)`
  grid-area: title;
  place-self: center start;
  text-align: start;
`
const pencilIconS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  icon: {
    area: 'icon',
    alignSelf: 'center',
    sz: 20,
    color: t.boxNormal.ct4[0],
  },
}]
const Text = styled.div<{
  isPlaceholder: boolean
}>`
  grid-area: text;
  place-self: start stretch;
  
  ${Txt.s16Thin};
  
  text-align: start;
  
  color: ${p => p.theme.boxNormal.ct2b[0]};
  ${p => p.isPlaceholder && css`color: ${p.theme.boxNormal.ct4[0]};`}
`
