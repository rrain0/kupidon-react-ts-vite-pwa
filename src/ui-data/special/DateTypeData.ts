import { ObjectU } from '@util/common/ObjectU.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import ObjectKeys = ObjectU.ObjectKeys




export type DateType =
  // romantic
  //// | 'restaurant'
  | 'cafe'
  //// | 'coffeeHouse' // Кофейня
  //// | 'walking' // Прогулки на свежем воздухе
  // cultural
  //// | 'museum'
  //// | 'gallery'
  //// | 'theatre'
  //// | 'cinema'
  // active
  //// | 'sports'
  //// | 'extreme'
  //// | 'outdoorActivities' // Активный отдых на свежем воздухе
  // entertaining
  //// | 'excitingEntertainment' // Драйвовые развлечения
  //// | 'interactive' // Интерактивные развлечения
  //// | 'eveningEntertainment' // Вечерние развлечения
  // nonstandard
  //// | 'masterClasses' // Мастер-классы
  //// | 'streamCocktails' // Центры паровых коктейлей
  //// | 'volunteering' // Волонтёрство



export const DateTypeData: Record<DateType, {
  color: string
  uiText: UiTextValues<'name'>
}> = {
  cafe: {
    color: '#FFB422',
    uiText: {
      name: {
        'ru-RU': 'Кафе',
      },
    },
  },
}


export const allDateTypes: DateType[] = ObjectKeys(DateTypeData)