import { ObjectU } from '@util/common/ObjectU.ts'
import { UiText } from 'src/mini-libs/ui-text/UiText.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ObjectKeys = ObjectU.ObjectKeys
import GlassAndDishIc = SvgIconsPack.GlassAndDishIc
import SimpleSvgIconProps = SvgIconsPack.SimpleSvgIconProps
import SoupIc = SvgIconsPack.SoupIc
import CoffeeCupIc = SvgIconsPack.CoffeeCupIc
import FountainIc = SvgIconsPack.FountainIc
import VaseMuseumIc = SvgIconsPack.VaseMuseumIc
import PictureArtIc = SvgIconsPack.PictureArtIc
import MasksTheatreIc = SvgIconsPack.MasksTheatreIc
import Film2Ic = SvgIconsPack.Film2Ic
import PresentationScreenIc = SvgIconsPack.PresentationScreenIc

import tableRomantic from '@im/date-type/1.1. Романтика за столом 44e5c3ec-6c0a-4959-8135-51709f0808a7.webp'
import walking from '@im/date-type/1.2. Прогулки на свежем воздухе c30b56ad-72d6-45fc-aa64-d41ce77ea4e3.webp'

import museum from '@im/date-type/2.1. Музеи d768f6de-6661-41a7-94e2-cb179d465435.webp'
import gallery from '@im/date-type/2.2. Галереи ebde5ab8-6ac1-483c-8f8b-06f84fd2e6cf.webp'
import theatre from '@im/date-type/2.3. Театры 69e030f1-5592-4d32-b061-2faa62b624ba.webp'
import cinema from '@im/date-type/2.4. Кинотеатры 8aea6846-ae03-494a-bfcd-76f6b6e3a67c.webp'

import sports from '@im/date-type/3.1. Спортивные развлечения 650273a1-f25d-4660-bffe-f341b7e0a99f.webp'
import extreme from '@im/date-type/3.2. Экстремальные развлечения cd51405f-3e84-40f1-bedd-db0a95a704db.webp'
import outdoorActivities from '@im/date-type/3.3. Активный отдых на свежем воздухе ad830606-85a1-43c2-ab0c-6766da533640.webp'

import excitingEntertainment from '@im/date-type/4.1. Драйвовые развлечения 27f2dd2f-7532-4713-8052-f53c9a58be09.webp'
import interactive from '@im/date-type/4.2. Игровые развлечения 8ae41137-acb2-44c5-babe-b7a764f6f3a7.webp'
import eveningEntertainment from '@im/date-type/4.3. Вечерние развлечения a3cb1d02-2ff9-4135-b51d-9ac7980f93ec.webp'

import masterClasses from '@im/date-type/5.1. Мастер-классы 35dbb0ff-e440-4979-8656-66de7c0f8912.webp'
import streamCocktails from '@im/date-type/5.2. Центры паровых коктейлей 68277041-65e8-4934-b0db-19b0c05ac23d.webp'
import volunteering from '@im/date-type/5.3. Волонтёрство efc027cf-cb81-411a-8943-3dbb337c0da1.webp'



export type DateType =
  // romantic
  | 'restaurant'
  | 'cafe'
  | 'coffeeHouse' // Кофейня
  | 'walking' // Прогулки на свежем воздухе
  // cultural
  | 'museum'
  | 'gallery'
  | 'theatre'
  | 'cinema'
  // active
  //// | 'sports'
  //// | 'extreme'
  //// | 'outdoorActivities' // Активный отдых на свежем воздухе
  // entertaining
  //// | 'excitingEntertainment' // Драйвовые развлечения
  //// | 'interactive' // Интерактивные развлечения
  //// | 'eveningEntertainment' // Вечерние развлечения
  // nonstandard
  | 'masterClasses' // Мастер-классы
  //// | 'streamCocktails' // Центры паровых коктейлей
  //// | 'volunteering' // Волонтёрство



export const DateTypeData: Record<DateType, {
  color: string
  icon: React.FC<SimpleSvgIconProps>
  name: UiText
}> = {
  
  restaurant: {
    color: '#AA0A0A',
    icon: GlassAndDishIc,
    name: {
      'ru-RU': 'Ресторан',
    },
  },
  cafe: {
    color: '#FFB422',
    icon: SoupIc,
    name: {
      'ru-RU': 'Кафе',
    },
  },
  coffeeHouse: {
    color: '#754010',
    icon: CoffeeCupIc,
    name: {
      'ru-RU': 'Кофейня',
    },
  },
  walking: {
    color: '#1888AB',
    icon: FountainIc,
    name: {
      'ru-RU': 'Прогулки на свежем воздухе',
    },
  },
  
  
  museum: {
    color: '#754010',
    icon: VaseMuseumIc,
    name: {
      'ru-RU': 'Музеи',
    },
  },
  gallery: {
    color: '#1888AB',
    icon: PictureArtIc,
    name: {
      'ru-RU': 'Галереи',
    },
  },
  theatre: {
    color: '#FFB422',
    icon: MasksTheatreIc,
    name: {
      'ru-RU': 'Театры',
    },
  },
  cinema: {
    color: '#AA0A0A',
    icon: Film2Ic,
    name: {
      'ru-RU': 'Кинотеатры',
    },
  },
  
  
  masterClasses: {
    color: '#1888AB',
    icon: PresentationScreenIc,
    name: {
      'ru-RU': 'Мастер-классы',
    },
  },
}


export const allDateTypes: DateType[] = ObjectKeys(DateTypeData)