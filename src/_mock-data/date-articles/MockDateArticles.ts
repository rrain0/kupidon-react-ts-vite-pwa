import { DateArticle } from 'src/ui-data/special/date-article/DateArticlesData.ts'

import noImage from '@im/ic/no-image.jpg'

import candlesFlowersTable
  from 'src/_mock-data/date-articles/candles-flowers-table-icon--lon-christensen-GVGBs3oN6pg-unsplash.webp'
import mountainsBridgeCouple
  from 'src/_mock-data/date-articles/moutains-bridge-couple-icon--daniel-j-schwarz-YtY724tdl7Y-unsplash.webp'



export const MockDateArticles: DateArticle[] = [
  {
    id: 'Как создать привлекательный профиль',
    types: ['gettingToKnow', 'profileCreationAdvices'],
    title: {
      'ru-RU': 'Как создать привлекательный профиль',
    },
    picture: candlesFlowersTable,
    shortDescription: {
      'ru-RU': 'Подробные шаги как создать привлекательный профиль',
    },
    content: 'Здесь будет контент статьи',
  },
  
  /* {
    id: 'Статья про профиль 2',
    types: ['gettingToKnow', 'profileCreationAdvices'],
    title: {
      'ru-RU': 'Статья про профиль 2',
    },
    picture: noImage,
    shortDescription: {
      'ru-RU': 'Короткое описание статьи про профиль 2',
    },
    content: 'Здесь будет контент статьи',
  }, */
  
]


