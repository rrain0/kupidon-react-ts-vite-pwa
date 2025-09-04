import styled from '@emotion/styled'

import React, { useEffect, useMemo, useState } from 'react'
import { UiValues } from '@libs/ui-text/UiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import EnvelopeIc from 'src/components/elems/icons/SvgIcons/pack/special/EnvelopeIc.tsx'
import HandsetIc from 'src/components/elems/icons/SvgIcons/pack/special/HandsetIc.tsx'
import TelegramIc from 'src/components/elems/icons/SvgIcons/pack/special/TelegramIc.tsx'
import WhatsappIc from 'src/components/elems/icons/SvgIcons/pack/special/Whatsapp.tsx'
import CopyIc from 'src/components/elems/icons/SvgIcons/pack/ui/CopyIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import ClassStyle = ReactU.ClassStyle
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import Txt = EmotionCommon.Txt
import parsePhoneNumber from 'libphonenumber-js'
import { Contact, ContactType, getContactLink } from 'src/components/widgets/ContactButton/Contact.ts'
import _2gisLogo from '@im/ic/2gis-logo.webp'
import yandexMapsLogo from '@im/ic/yandex-maps-logo.webp'
import LocationIc from 'src/components/elems/icons/SvgIcons/pack/ui/LocationIc.tsx'
import CheckmarkBoldIc from 'src/components/elems/icons/SvgIcons/pack/ui/CheckmarkBoldIc.tsx'
import { Callback } from '@utils/base/math/typeUtils.ts'




const uiVals = {
  writeToTelegram: {
    'en-US': 'Write to Telegram',
    'ru-RU': 'Написать в Телеграм',
  },
  writeToWhatsapp: {
    'en-US': 'Write to Whatsapp',
    'ru-RU': 'Написать в Whatsapp',
  },
  doubleGis: {
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
    doubleGis: uiVals.doubleGis,
    yandexMaps: uiVals.yandexMaps,
    location: uiVals.map,
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  const theme = contactButtonLocalTheme[c.type]
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
      data-display-name='ContactButton'
      css={ButtonS6.t([btnS, t => {
        const { ctAcc, ctAccSec, ctRipple } = theme[t.type]
        return {
          rippleColor: ctRipple,
          inFocus: {
            buttonBgColor: ctAccSec,
            bordBdColor: ctAcc,
          },
          ...copied && {
            bordBdColor: ctAcc,
          },
        }
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
      {(() => {
        const commonS = (t: AppTheme.Theme) => ({
          iconColor: theme[t.type].ctAcc,
        })
        return ({
          phone: <HandsetIc css={SvgIconS6.t([contactIconS, commonS])}/>,
          telegram: <TelegramIc css={SvgIconS6.t([contactIconS, commonS])}/>,
          whatsapp: <WhatsappIc css={SvgIconS6.t([contactIconS, commonS])}/>,
          email: <EnvelopeIc css={SvgIconS6.t([contactIconS, commonS])}/>,
          doubleGis: <PictureContactIcon src={_2gisLogo}/>,
          yandexMaps: <PictureContactIcon src={yandexMapsLogo}/>,
          map: <LocationIc css={SvgIconS6.t([contactIconS, commonS])}/>,
          address: <LocationIc css={SvgIconS6.t([contactIconS, commonS])}/>,
          copy: !copied
            ? <CopyIc css={SvgIconS6.t([contactIconS, commonS])}/>
            : <CheckmarkBoldIc css={SvgIconS6.t([contactIconS, commonS])}/>,
        } satisfies Record<ContactType, React.ReactNode>)[c.type]
      })()}
      <ContactText>
        {(() => {
          if (c.type === 'phone') return parsePhoneNumber(c.phone)!.formatInternational()
          if (c.type === 'telegram') return uiText.writeToTelegram
          if (c.type === 'whatsapp') return uiText.writeToWhatsapp
          if (c.type === 'email') return c.email
          if (c.type === 'doubleGis') return uiText.doubleGis
          if (c.type === 'yandexMaps') return uiText.yandexMaps
          if (c.type === 'map') return uiText.location
          if (c.type === 'address') return c.text
          if (c.type === 'copy') return c.text
        })()}
      </ContactText>
    </Button>
  )
  
  if (link) return <a href={link} target='_blank'>{button}</a>
  return button
})
ContactButton.displayName = 'ContactButton'
export default ContactButton





// TODO Theme - Dark color or bg transparency?
// TODO Theme - extract to themes
const contactButtonLocalTheme: Record<ContactType, Record<AppTheme.Type, {
  ctAcc: string
  ctAccSec: string
  ctRipple: string
}>> = {
  telegram: {
    light: {
      ctAcc: '#34aadf',
      ctAccSec: '#e5f7ff',
      ctRipple: '#86c9e788',
    },
    dark: {
      ctAcc: '#34aadf',
      ctAccSec: '#3f5058',
      ctRipple: '#3c6e8588',
    },
  },
  whatsapp: {
    light: {
      ctAcc: '#67d449',
      ctAccSec: '#f2faf0',
      ctRipple: '#83da6d88',
    },
    dark: {
      ctAcc: '#67d449',
      ctAccSec: '#3e5238',
      ctRipple: '#528e4288',
    },
  },
  phone: {
    light: {
      ctAcc: '#ef9a15',
      ctAccSec: '#f5f1eb',
      ctRipple: '#eec27d88',
    },
    dark: {
      ctAcc: '#ef9a15',
      ctAccSec: '#544836',
      ctRipple: '#876c4288',
    },
  },
  email: {
    light: {
      ctAcc: '#008080',
      ctAccSec: '#f7fcfc',
      ctRipple: '#60c6c688',
    },
    dark: {
      ctAcc: '#008080',
      ctAccSec: '#294040',
      ctRipple: '#3a7c7c88',
    },
  },
  doubleGis: {
    light: {
      ctAcc: '#19aa1e',
      ctAccSec: '#f4f9f4',
      ctRipple: '#5abb5d88',
    },
    dark: {
      ctAcc: '#19aa1e',
      ctAccSec: '#2a432b',
      ctRipple: '#28692a88',
    },
  },
  yandexMaps: {
    light: {
      ctAcc: '#ff4433',
      ctAccSec: '#fff7f6',
      ctRipple: '#ec807688',
    },
    dark: {
      ctAcc: '#ff4433',
      ctAccSec: '#543c3a',
      ctRipple: '#94504a88',
    },
  },
  map: {
    light: {
      ctAcc: '#474c9d',
      ctAccSec: '#eff0fa',
      ctRipple: '#9da1e388',
    },
    dark: {
      ctAcc: '#474c9d',
      ctAccSec: '#282938',
      ctRipple: '#3f427488',
    },
  },
  address: {
    light: {
      ctAcc: '#c8990e',
      ctAccSec: '#f5f0e3',
      ctRipple: '#f4d57988',
    },
    dark: {
      ctAcc: '#caa128',
      ctAccSec: '#6f6239',
      ctRipple: '#4d473688',
    },
  },
  copy: {
    light: {
      ctAcc: '#c69477',
      ctAccSec: '#fcf4f0',
      ctRipple: '#f2d0bd88',
    },
    dark: {
      ctAcc: '#c69477',
      ctAccSec: '#746054',
      ctRipple: '#423a3588',
    },
  },
}



const btnS: AppWidgetStyle = [
  ButtonS6.Parts.Type.outlined.Shape.rounded.Size.md,
  ButtonS6.Parts.Type.outlined.baseColor,
  { buttonPl: 14 },
  t => ({
    light: {
      buttonColor: '#232020',
      bordBdColor: '#bbbbbb',
      inFocus: {
        buttonColor: '#232020',
      },
    },
    dark: {
      buttonColor: '#bbbbbb',
      bordBdColor: '#bbbbbb',
      inFocus: {
        buttonColor: '#bdbdbd',
      },
    },
  }[t.type]),
]


const contactIconS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full, [
    { icon: { sz: 26 } },
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