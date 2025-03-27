import { UiText } from 'src/mini-libs/ui-text/UiText.ts'

import noImage from '@im/ic/no-image.jpg'



export type DateArticleType =
  // Level 0
  | 'all' // Идеи и места
  
  // Level 1
  | 'gettingToKnow' // Знакомство
  | 'date' // Свидание
  | 'aboutRelationships' // Про отношения
  | 'psychologyOfRelationships' // Психология отношений
  | 'sexualityAndIntimateRelationships' // Сексуальность и интимные отношения
  | 'successStories' // Истории успеха
  
  // Level 2 - gettingToKnow
  | 'profileCreationAdvices' // Советы по созданию профиля
  | 'firstContact' // Первый контакт
  | 'onlineDatingEtiquette' // Этикет онлайн-знакомств
  
  // Level 2 - date
  | 'preparingForTheFirstDate' // Подготовка к первому свиданию
  | 'haveFirstDate' // Как провести первое свидание
  | 'isFirstDateSuccessful' // Как понять, что свидание прошло успешно или нет
  
  // Level 2 - aboutRelationships
  | 'keepingRomanceAlive' // Поддержание романтики
  | 'communicationInRelationships' // Общение в отношениях
  | 'sharedHobbies' // Совместные хобби
  
  // Level 2 - psychologyOfRelationships
  | 'psychologicalAspectsOfDating' // Психологические аспекты знакомств
  | 'emotionalSupport' // Эмоциональная поддержка
  | 'personalGrowth' // Личностный рост
  
  // Level 2 - sexualityAndIntimateRelationships
  | 'gettingToKnowIntimatePreferences' // Знакомство с интимными предпочтениями
  | 'healthyIntimateRelationships' // Здоровые интимные отношения
  | 'solvingIntimateProblems' // Решение интимных проблем
  
  // Level 2 - successStories
  | 'realStories' // Реальные истории
  | 'userExperience' // Опыт пользователей
  | 'interviewsWithExperts' // Интервью с экспертами
  




export const DateArticleTypesData: Record<DateArticleType, {
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
      'ru-RU': 'Знакомства',
    },
  },
  date: {
    picture: noImage,
    name: {
      'ru-RU': 'Свидание',
    },
  },
  aboutRelationships: {
    picture: noImage,
    name: {
      'ru-RU': 'Про отношения',
    },
  },
  psychologyOfRelationships: {
    picture: noImage,
    name: {
      'ru-RU': 'Психология отношений',
    },
  },
  sexualityAndIntimateRelationships: {
    picture: noImage,
    name: {
      'ru-RU': 'Сексуальность и интимные отношения',
    },
  },
  successStories: {
    picture: noImage,
    name: {
      'ru-RU': 'Истории успеха',
    },
  },
  
  
  profileCreationAdvices: {
    picture: noImage,
    name: {
      'ru-RU': 'Советы по созданию профиля',
    },
  },
  firstContact: {
    picture: noImage,
    name: {
      'ru-RU': 'Первый контакт',
    },
  },
  onlineDatingEtiquette: {
    picture: noImage,
    name: {
      'ru-RU': 'Этикет онлайн-знакомств',
    },
  },
  
  
  preparingForTheFirstDate: {
    picture: noImage,
    name: {
      'ru-RU': 'Подготовка к первому свиданию',
    },
  },
  haveFirstDate: {
    picture: noImage,
    name: {
      'ru-RU': 'Как провести первое свидание',
    },
  },
  isFirstDateSuccessful: {
    picture: noImage,
    name: {
      'ru-RU': 'Как понять, прошло свидание успешно или нет',
    },
  },
  
  
  keepingRomanceAlive: {
    picture: noImage,
    name: {
      'ru-RU': 'Поддержание романтики',
    },
  },
  communicationInRelationships: {
    picture: noImage,
    name: {
      'ru-RU': 'Общение в отношениях',
    },
  },
  sharedHobbies: {
    picture: noImage,
    name: {
      'ru-RU': 'Совместные хобби',
    },
  },
  
  
  psychologicalAspectsOfDating: {
    picture: noImage,
    name: {
      'ru-RU': 'Психологические аспекты знакомств',
    },
  },
  emotionalSupport: {
    picture: noImage,
    name: {
      'ru-RU': 'Эмоциональная поддержка',
    },
  },
  personalGrowth: {
    picture: noImage,
    name: {
      'ru-RU': 'Личностный рост',
    },
  },
  
  
  gettingToKnowIntimatePreferences: {
    picture: noImage,
    name: {
      'ru-RU': 'Знакомство с интимными предпочтениями',
    },
  },
  healthyIntimateRelationships: {
    picture: noImage,
    name: {
      'ru-RU': 'Здоровые интимные отношения',
    },
  },
  solvingIntimateProblems: {
    picture: noImage,
    name: {
      'ru-RU': 'Решение интимных проблем',
    },
  },
  
  
  realStories: {
    picture: noImage,
    name: {
      'ru-RU': 'Реальные истории',
    },
  },
  userExperience: {
    picture: noImage,
    name: {
      'ru-RU': 'Опыт пользователей',
    },
  },
  interviewsWithExperts: {
    picture: noImage,
    name: {
      'ru-RU': 'Интервью с экспертами',
    },
  },
  
}

