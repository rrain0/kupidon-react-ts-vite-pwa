import { isIOS } from 'react-device-detect'





export type Contact =
  | { type: 'phone', phone: string } // '+79998887766'
  | { type: 'telegram', nick: string } // 'nickname' or '+79998887766'
  | { type: 'whatsapp', phone: string } // '79998887766'
  | { type: 'email', email: string } // 'email@email.email'
  | { type: 'doubleGis', link: string } // 'https://2gis.ru/irkutsk/firm/xxxxxxxxxxxxxxxxx'
  | { type: 'yandexMaps', link: string } // 'https://yandex.ru/maps/org/xxxxxxxxxxxx'
  // lat: 52.281736, lon: 104.323286, q: Etika, Иркутск, ул. Лызина, 9
  // lat & lon например используются приложением такси maxim
  | { type: 'map', lat: number, lon: number, q: string }
  | { type: 'address', text: string }
  | { type: 'copy', text: string, data: string }

export type ContactType = Contact['type']



export function getContactLink(c: Contact): string {
  const t = c.type
  if (t === 'phone') return `tel:${c.phone}`
  if (t === 'telegram') return `https://t.me/${c.nick}`
  if (t === 'whatsapp') return `https://wa.me/${c.phone}`
  if (t === 'email') return `mailto:${c.email}`
  if (t === 'doubleGis') return c.link
  if (t === 'yandexMaps') return c.link
  if (t === 'map') {
    if (isIOS) return `http://maps.apple.com/?ll=${c.lat},${c.lon}&q=${c.q}`
    return `geo:${c.lat},${c.lon}?q=${c.q}`
  }
  if (t === 'address') return ''
  if (t === 'copy') return ''
  throw new Error(`Unsupported contact link type: ${t}`)
}




