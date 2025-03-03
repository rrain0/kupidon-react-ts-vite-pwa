import { UiText } from 'src/mini-libs/ui-text/UiText.ts'

import noImage from '@im/ic/no-image.jpg'

import candlesFlowersTable
  from 'src/_mock-data/date-articles/candles-flowers-table-icon--lon-christensen-GVGBs3oN6pg-unsplash.webp'



export type DateArticleType =
  | 'all'
  
  // common
  | 'gettingToKnow' // Знакомство
  
  // gettingToKnow
  | 'profileCreationAdvices' // Советы по созданию профиля
  
  // profileCreationAdvices
  | 'howToCreateAttractiveProfile' // Как создать привлекательный профиль




export const DateArticleTypeData: Record<DateArticleType, {
  picture: string,
  name: UiText,
}> = {
  all: {
    picture: candlesFlowersTable,
    name: {
      'ru-RU': 'Заметки Купидона',
    },
  },
  
  
  gettingToKnow: {
    picture: candlesFlowersTable,
    name: {
      'ru-RU': 'Знакомство',
    },
  },
  
  
  profileCreationAdvices: {
    picture: candlesFlowersTable,
    name: {
      'ru-RU': 'Советы по созданию профиля',
    },
  },
  
  
  howToCreateAttractiveProfile: {
    picture: candlesFlowersTable,
    name: {
      'ru-RU': 'Как создать привлекательный профиль',
    },
  },
  
}

