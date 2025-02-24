import { ObjectU } from '@util/common/ObjectU.ts'
import { UiText } from 'src/mini-libs/ui-text/UiText.ts'
import ObjectKeys = ObjectU.ObjectKeys




export type DateType =
  // romantic
  | 'restaurant'
  | 'cafe'
  | 'coffeeHouse' // Кофейня
  //// | 'walking' // Прогулки на свежем воздухе
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
  name: UiText,
}> = {
  
  restaurant: {
    color: '#AA0A0A',
    name: {
      'ru-RU': 'Ресторан',
    },
  },
  cafe: {
    color: '#FFB422',
    name: {
      'ru-RU': 'Кафе',
    },
  },
  coffeeHouse: {
    color: '#754010',
    name: {
      'ru-RU': 'Кофейня',
    },
  },
  
  
  museum: {
    color: '#754010',
    name: {
      'ru-RU': 'Музеи',
    },
  },
  gallery: {
    color: '#1888AB',
    name: {
      'ru-RU': 'Галереи',
    },
  },
  theatre: {
    color: '#FFB422',
    name: {
      'ru-RU': 'Театры',
    },
  },
  cinema: {
    color: '#AA0A0A',
    name: {
      'ru-RU': 'Кинотеатры',
    },
  },
  
  
  masterClasses: {
    color: '#1888AB',
    name: {
      'ru-RU': 'Мастер-классы',
    },
  },
}


export const allDateTypes: DateType[] = ObjectKeys(DateTypeData)