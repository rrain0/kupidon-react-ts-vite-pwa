import { ObjectU } from '@util/common/ObjectU.ts'
import { UiText } from 'src/mini-libs/ui-text/UiText.ts'
import ObjectKeys = ObjectU.ObjectKeys

import romantic from '@im/date-place-type/romantic-icon-4bd31add75ca9eea70679dc07789c007.webp'
import cultural
  from '@im/date-place-type/cultural-icon-643a307e0ecc21f66df171166660090e.webp'
import natural
  from '@im/date-place-type/natural-icon-e14a85caf5b9247a00f61b2ce4060c9c.webp'
import entertaining
  from '@im/date-place-type/entertaining-icon-ea79c8191f6951dc83ed142725712206.webp'
import creative
  from '@im/date-place-type/creative-icon-d1e770dbf0ee9ba83777c47a5ff23cdd.webp'

import tableRomantic
  from '@im/date-place-type/1.1. Романтика за столом 44e5c3ec-6c0a-4959-8135-51709f0808a7.webp'
import walking
  from '@im/date-place-type/1.2. Прогулки на свежем воздухе c30b56ad-72d6-45fc-aa64-d41ce77ea4e3.webp'

import museum
  from '@im/date-place-type/2.1. Музеи d768f6de-6661-41a7-94e2-cb179d465435.webp'
import gallery
  from '@im/date-place-type/2.2. Галереи ebde5ab8-6ac1-483c-8f8b-06f84fd2e6cf.webp'
import theatre
  from '@im/date-place-type/2.3. Театры 69e030f1-5592-4d32-b061-2faa62b624ba.webp'
import cinema
  from '@im/date-place-type/2.4. Кинотеатры 8aea6846-ae03-494a-bfcd-76f6b6e3a67c.webp'

import sports
  from '@im/date-place-type/3.1. Спортивные развлечения 650273a1-f25d-4660-bffe-f341b7e0a99f.webp'
import extreme
  from '@im/date-place-type/3.2. Экстремальные развлечения cd51405f-3e84-40f1-bedd-db0a95a704db.webp'
import outdoorActivities
  from '@im/date-place-type/3.3. Активный отдых на свежем воздухе ad830606-85a1-43c2-ab0c-6766da533640.webp'

import excitingEntertainment
  from '@im/date-place-type/4.1. Драйвовые развлечения 27f2dd2f-7532-4713-8052-f53c9a58be09.webp'
import interactive
  from '@im/date-place-type/4.2. Игровые развлечения 8ae41137-acb2-44c5-babe-b7a764f6f3a7.webp'
import eveningEntertainment
  from '@im/date-place-type/4.3. Вечерние развлечения a3cb1d02-2ff9-4135-b51d-9ac7980f93ec.webp'

import masterClasses
  from '@im/date-place-type/5.1. Мастер-классы 35dbb0ff-e440-4979-8656-66de7c0f8912.webp'
import streamCocktails
  from '@im/date-place-type/5.2. Центры паровых коктейлей 68277041-65e8-4934-b0db-19b0c05ac23d.webp'
import volunteering
  from '@im/date-place-type/5.3. Волонтёрство efc027cf-cb81-411a-8943-3dbb337c0da1.webp'



export type DatePlaceType =
  | 'all'
  
  // common
  | 'romantic'
  | 'cultural'
  | 'active'
  | 'entertaining'
  | 'nonstandard'
  
  // romantic
  | 'tableRomantic'
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
  | 'sports'
  | 'extreme'
  | 'outdoorActivities' // Активный отдых на свежем воздухе
  
  // entertaining
  | 'excitingEntertainment' // Драйвовые развлечения
  | 'interactive' // Интерактивные развлечения: VR-игры, комп игры, квесты
  | 'eveningEntertainment' // Вечерние развлечения
  
  // nonstandard
  | 'masterClasses' // Мастер-классы
  | 'streamCocktails' // Центры паровых коктейлей
  | 'volunteering' // Волонтёрство




export const DatePlaceTypeData: Record<DatePlaceType, {
  picture: string,
  name: UiText,
}> = {
  all: {
    picture: '',
    name: {
      'ru-RU': 'Идеи и места для свиданий',
    },
  },
  
  
  romantic: {
    picture: romantic,
    name: {
      'ru-RU': 'Романтический',
    },
  },
  cultural: {
    picture: cultural,
    name: {
      'ru-RU': 'Культурный',
    },
  },
  active: {
    picture: natural,
    name: {
      'ru-RU': 'Активный',
    },
  },
  entertaining: {
    picture: entertaining,
    name: {
      'ru-RU': 'Развлекательный',
    },
  },
  nonstandard: {
    picture: creative,
    name: {
      'ru-RU': 'Нестандартный',
    },
  },
  
  
  tableRomantic: {
    picture: tableRomantic,
    name: {
      'ru-RU': 'Романтика за столом',
    },
  },
  restaurant: {
    picture: '',
    name: {
      'ru-RU': 'Рестораны',
    },
  },
  cafe: {
    picture: '',
    name: {
      'ru-RU': 'Кафе',
    },
  },
  coffeeHouse: {
    picture: '',
    name: {
      'ru-RU': 'Кофейни',
    },
  },
  walking: {
    picture: walking,
    name: {
      'ru-RU': 'Прогулки на свежем воздухе',
    },
  },
  
  
  museum: {
    picture: museum,
    name: {
      'ru-RU': 'Музеи',
    },
  },
  gallery: {
    picture: gallery,
    name: {
      'ru-RU': 'Галереи',
    },
  },
  theatre: {
    picture: theatre,
    name: {
      'ru-RU': 'Театры',
    },
  },
  cinema: {
    picture: cinema,
    name: {
      'ru-RU': 'Кинотеатры',
    },
  },
  
  
  sports: {
    picture: sports,
    name: {
      'ru-RU': 'Спортивные развлечения',
    },
  },
  extreme: {
    picture: extreme,
    name: {
      'ru-RU': 'Экстремальные развлечения',
    },
  },
  outdoorActivities: {
    picture: outdoorActivities,
    name: {
      'ru-RU': 'Активный отдых на природе',
    },
  },
  
  
  excitingEntertainment: {
    picture: excitingEntertainment,
    name: {
      'ru-RU': 'Драйвовые развлечения',
    },
  },
  interactive: {
    picture: interactive,
    name: {
      'ru-RU': 'Игровые развлечения',
    },
  },
  eveningEntertainment: {
    picture: eveningEntertainment,
    name: {
      'ru-RU': 'Вечерние развлечения',
    },
  },
  
  
  masterClasses: {
    picture: masterClasses,
    name: {
      'ru-RU': 'Мастер-классы',
    },
  },
  streamCocktails: {
    picture: streamCocktails,
    name: {
      'ru-RU': 'Центры паровых коктейлей',
    },
  },
  volunteering: {
    picture: volunteering,
    name: {
      'ru-RU': 'Волонтёрство',
    },
  },
  
}



export const allDateDatePlaceTypes: DatePlaceType[] = ObjectKeys(DatePlaceTypeData)