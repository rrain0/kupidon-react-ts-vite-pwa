import { DateArticle } from 'src/ui-data/special/date-article/DateArticlesData.ts'

import noImage from '@im/ic/no-image.jpg'

import candlesFlowersTable
  from 'src/_mock-data/date-articles/candles-flowers-table-icon--lon-christensen-GVGBs3oN6pg-unsplash.webp'
import mountainsBridgeCouple
  from 'src/_mock-data/date-articles/moutains-bridge-couple-icon--daniel-j-schwarz-YtY724tdl7Y-unsplash.webp'



export const MockDateArticles: DateArticle[] = [
  {
    id: 'Как создать привлекательный профиль',
    types: ['gettingToKnow', 'profileCreationAdvices', 'howToCreateAttractiveProfile'],
    title: {
      'ru-RU': 'Как создать привлекательный профиль',
    },
    picture: noImage,
    shortDescription: {
      'ru-RU': 'Подробные шаги как создать привлекательный профиль',
    },
    content: 'Здесь будет контент статьи',
  },
]


