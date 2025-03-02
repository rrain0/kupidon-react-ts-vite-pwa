import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import ClassStyle = ReactU.ClassStyle
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import Txt = EmotionCommon.Txt
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import parsePhoneNumber from 'libphonenumber-js'
import { Contact, ContactType, getContactLink } from 'src/ui/1-widgets/ContactButton/Contact.ts'
import HandsetIc = SvgIconsPack.HandsetIc
import TelegramIc = SvgIconsPack.TelegramIc
import WhatsappIc = SvgIconsPack.WhatsappIc
import EnvelopeIc = SvgIconsPack.EnvelopeIc
import _2gisLogo from '@im/ic/2gis-logo.webp'
import yandexMapsLogo from '@im/ic/yandex-maps-logo.webp'
import LocationIc = SvgIconsPack.LocationIc
import CopyIc = SvgIconsPack.CopyIc
import CheckmarkBoldIc = SvgIconsPack.CheckmarkBoldIc
import Callback = TypeU.Callback




const uiVals = {
  writeToTelegram: {
    'en-US': 'Write to Telegram',
    'ru-RU': 'Написать в Телеграм',
  },
  writeToWhatsapp: {
    'en-US': 'Write to Whatsapp',
    'ru-RU': 'Написать в Whatsapp',
  },
  '2gis': {
    'en-US': '2GIS',
    'ru-RU': '2ГИС',
  },
  yandexMaps: {
    'en-US': 'Yandex Maps',
    'ru-RU': 'Яндекс Карты',
  },
  map: {
    'en-US': 'Map',
    'ru-RU': 'Карта',
  },
} satisfies UiValues




export type ContactButtonProps = ClassStyle & {
  contact: Contact
  onClick?: Callback | undefined
}
export const ContactButton = React.memo((props: ContactButtonProps) => {
  const {
    className,
    style,
    contact: c,
    onClick,
  } = props
  
  const uiValues = useMemo(() => ({
    writeToTelegram: uiVals.writeToTelegram,
    writeToWhatsapp: uiVals.writeToWhatsapp,
    '2gis': uiVals['2gis'],
    yandexMaps: uiVals.yandexMaps,
    location: uiVals.map,
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  const { ctAcc, ctAccSec, ctRipple } = contactButtonLocalTheme[c.type]
  const link = getContactLink(c)
  
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 3000)
      return () => clearTimeout(id)
    }
  }, [copied])
  
  const button = (
    <Button
      data-display-name="ContactButton"
      css={ButtonS6.t([btnS, {
        rippleColor: ctRipple,
        inFocus: {
          buttonBgColor: ctAccSec,
          bordBdColor: ctAcc,
        },
        ...copied && {
          buttonBgColor: ctAccSec,
          bordBdColor: ctAcc,
        },
      }])}
      className={className}
      style={style}
      onClick={(() => {
        if (c.type === 'copy') {
          navigator.clipboard.writeText(c.data)
          setCopied(true)
        }
        onClick?.()
      })}
    >
      {({
        phone: <HandsetIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
        telegram: <TelegramIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
        whatsapp: <WhatsappIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
        email: <EnvelopeIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
        doubleGis: <PictureContactIcon src={_2gisLogo} />,
        yandexMaps: <PictureContactIcon src={yandexMapsLogo} />,
        map: <LocationIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
        address: <LocationIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
        copy: !copied
          ? <CopyIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />
          : <CheckmarkBoldIc css={SvgIconS6.t([contactIconS, { iconColor: ctAcc }])} />,
      } satisfies Record<ContactType, React.ReactNode>)[c.type]}
      <ContactText>
        {(() => {
          if (c.type === 'phone') return parsePhoneNumber(c.phone)!.formatInternational()
          if (c.type === 'telegram') return uiText.writeToTelegram
          if (c.type === 'whatsapp') return uiText.writeToWhatsapp
          if (c.type === 'email') return c.email
          if (c.type === 'doubleGis') return uiText['2gis']
          if (c.type === 'yandexMaps') return uiText.yandexMaps
          if (c.type === 'map') return uiText.location
          if (c.type === 'address') return c.text
          if (c.type === 'copy') return c.text
        })()}
      </ContactText>
    </Button>
  )
  
  if (link) return <a href={link} target="_blank">{button}</a>
  return button
})
ContactButton.displayName = 'ContactButton'
export default ContactButton





// TODO Theme - Dark color or bg transparency?
const contactButtonLocalTheme: Record<ContactType, {
  ctAcc: string,
  ctAccSec: string
  ctRipple: string
}> = {
  telegram: {
    ctAcc: '#34aadf',
    ctAccSec: '#e5f7ff',
    ctRipple: '#e5f7ff88',
  },
  whatsapp: {
    ctAcc: '#67d449',
    ctAccSec: '#f2faf0',
    ctRipple: '#f2faf088',
  },
  phone: {
    ctAcc: '#ef9a15',
    ctAccSec: '#f5f1eb',
    ctRipple: '#f5f1eb88',
  },
  email: {
    ctAcc: '#008080',
    ctAccSec: '#f7fcfc',
    ctRipple: '#f7fcfc88',
  },
  doubleGis: {
    ctAcc: '#19aa1e',
    ctAccSec: '#f4f9f4',
    ctRipple: '#f4f9f488',
  },
  yandexMaps: {
    ctAcc: '#ff4433',
    ctAccSec: '#fff7f6',
    ctRipple: '#fff7f688',
  },
  map: {
    ctAcc: '#474c9d',
    ctAccSec: '#eff0fa',
    ctRipple: '#eff0fa88',
  },
  address: {
    ctAcc: '#232020',
    ctAccSec: '#fff9f9',
    ctRipple: '#fff9f988',
  },
  copy: {
    ctAcc: '#c69477',
    ctAccSec: '#fcf4f0',
    ctRipple: '#fcf4f088',
  },
}



const btnS: AppWidgetStyle = t => [
  ButtonS6.Parts.Type.outlined.Shape.rounded.Size.md,
  ButtonS6.Parts.Type.outlined.baseColor, {
    buttonPl: 14,
    // TODO Theme
    buttonColor: '#232020',
    // TODO Theme
    bordBdColor: '#bbbbbb',
    inFocus: {
      // TODO Theme
      buttonColor: '#232020',
    },
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
const PictureContactIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 20%;
`
const ContactText = styled.div`
  ${Txt.s17};
`