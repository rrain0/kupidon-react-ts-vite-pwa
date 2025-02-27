import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import rowC = EmotionCommon.rowC
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Txt = EmotionCommon.Txt
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import HandsetIc = SvgIconsPack.HandsetIc
import TelegramIc = SvgIconsPack.TelegramIc
import WhatsappIc = SvgIconsPack.WhatsappIc
import EnvelopeIc = SvgIconsPack.EnvelopeIc



const uiVals = {
  writeToTelegram: {
    'en-US': 'Write to Telegram',
    'ru-RU': 'Написать в Телеграм',
  },
  writeToWhatsapp: {
    'en-US': 'Write to Whatsapp',
    'ru-RU': 'Написать в Whatsapp',
  },
} satisfies UiValues





export type ContactType =
  | 'telegram'
  | 'whatsapp'
  | 'phone'
  | 'email'

export type ContactButtonProps = ClassStyle & {
  type: ContactType
  value: string
}
export const ContactButton = React.memo((props: ContactButtonProps) => {
  const {
    className,
    style,
    type,
    value,
  } = props
  
  const uiValues = useMemo(() => ({
    writeToTelegram: uiVals.writeToTelegram,
    writeToWhatsapp: uiVals.writeToWhatsapp,
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  const color = ({
    telegram: '#34aadf',
    whatsapp: '#67d449',
    phone: '#ef9a15',
    email: '#008080',
  } satisfies Record<ContactType, React.ReactNode>)[type]
  
  return (
    <Button
      css={ButtonS6.t([btnS, {
        //borderBdColor: color,
      }])}
      className={className}
      style={style}
      data-display-name="ContactButton"
    >
      {({
        telegram: <TelegramIc css={SvgIconS6.t([contactIconS, { iconColor: color }])} />,
        whatsapp: <WhatsappIc css={SvgIconS6.t([contactIconS, { iconColor: color }])} />,
        phone: <HandsetIc css={SvgIconS6.t([contactIconS, { iconColor: color }])} />,
        email: <EnvelopeIc css={SvgIconS6.t([contactIconS, { iconColor: color }])} />,
      } satisfies Record<ContactType, React.ReactNode>)[type]}
      <ContactText>
        {({
          telegram: uiText.writeToTelegram,
          whatsapp: uiText.writeToWhatsapp,
          phone: value,
          email: value,
        } satisfies Record<ContactType, string>)[type]}
      </ContactText>
    </Button>
  )
})
ContactButton.displayName = 'ContactButton'
export default ContactButton




const btnS: AppWidgetStyle = t => [
  ButtonS6.S.outlined.rounded.md.accent, {
    buttonPl: 14,
  
    // variant 2
    //borderBdColor: '#232020',
    borderBdColor: '#bbbbbb',
    
  },
]


const contactIconS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full, [
    {
      // TODO Theme
      icon: { sz: 26, color: '#cb3357' },
    },
  ],
]
const ContactText = styled.div`
  // TODO Theme
  color: #232020;
  ${Txt.s17};
`