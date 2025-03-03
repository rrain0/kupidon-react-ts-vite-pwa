import { UiText } from 'src/mini-libs/ui-text/UiText.ts'

import noImage from '@im/ic/no-image.jpg'

import romantic
  from '@im/date-place-type/romantic-icon-4bd31add75ca9eea70679dc07789c007.webp'



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
    picture: noImage,
    name: {
      'ru-RU': 'Заметки Купидона',
    },
  },
  
  
  gettingToKnow: {
    picture: noImage,
    name: {
      'ru-RU': 'Знакомство',
    },
  },
  
  
  profileCreationAdvices: {
    picture: noImage,
    name: {
      'ru-RU': 'Советы по созданию профиля',
    },
  },
  
  
  howToCreateAttractiveProfile: {
    picture: noImage,
    name: {
      'ru-RU': 'Как создать привлекательный профиль',
    },
  },
  
}

