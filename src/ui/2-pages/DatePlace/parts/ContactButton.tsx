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
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Txt = EmotionCommon.Txt
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import parsePhoneNumber from 'libphonenumber-js'
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
  | 'phone'
  | 'telegram'
  | 'whatsapp'
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
  
  const { ct, ctSec, ctRipple } = contactButtonLocalTheme[type]
  const link = getContactLink(type, value)
  
  return (
    <a href={link} target="_blank">
      <Button
        css={ButtonS6.t([btnS, {
          inFocus: {
            buttonBg: ctSec,
            borderBdColor: ct,
            rippleColor: ctRipple,
          },
        }])}
        className={className}
        style={style}
        data-display-name="ContactButton"
      >
        {({
          telegram: <TelegramIc css={SvgIconS6.t([contactIconS, { iconColor: ct }])} />,
          whatsapp: <WhatsappIc css={SvgIconS6.t([contactIconS, { iconColor: ct }])} />,
          phone: <HandsetIc css={SvgIconS6.t([contactIconS, { iconColor: ct }])} />,
          email: <EnvelopeIc css={SvgIconS6.t([contactIconS, { iconColor: ct }])} />,
        } satisfies Record<ContactType, React.ReactNode>)[type]}
        <ContactText>
          {({
            phone: parsePhoneNumber(value)!.formatInternational(),
            telegram: uiText.writeToTelegram,
            whatsapp: uiText.writeToWhatsapp,
            email: value,
          } satisfies Record<ContactType, string>)[type]}
        </ContactText>
      </Button>
    </a>
  )
})
ContactButton.displayName = 'ContactButton'
export default ContactButton




function getContactLink(type: ContactType, value: string): string {
  if (type === 'phone') return `tel:${value}`
  if (type === 'telegram') return `https://t.me/${value}`
  if (type === 'whatsapp') return `https://wa.me/${value}`
  if (type === 'email') return `mailto:${value}`
  throw new Error(`Unknown contact type: ${type}`)
}




// TODO Theme - Dark or bg transparency?
const contactButtonLocalTheme: Record<ContactType, {
  ct: string,
  ctSec: string
  ctRipple: string
}> = {
  telegram: {
    ct: '#34aadf',
    ctSec: '#e5f7ff',
    ctRipple: '#e5f7ff88',
  },
  whatsapp: {
    ct: '#67d449',
    ctSec: '#f2faf0',
    ctRipple: '#f2faf088',
  },
  phone: {
    ct: '#ef9a15',
    ctSec: '#f5f1eb',
    ctRipple: '#f5f1eb88',
  },
  email: {
    ct: '#008080',
    ctSec: '#f7fcfc',
    ctRipple: '#f7fcfc88',
  },
}



const btnS: AppWidgetStyle = t => [
  ButtonS6.S.outlined.rounded.md.accent, {
    buttonPl: 14,
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