import { DatePlace } from 'src/ui-data/special/DatePlacesData.ts'

import bezBokalaNetShagala from './bez-bokala-net-shagala-2f15ebe1-ed25-445e-866a-45b1c12bc14a.jpg'
import ibisKitchen from './ibis-kitchen-30258560112733222_ea8f.jpg'
import etika from './etika-30258560173284876_9170.jpg'



export const MockDatePlaces = {
  places: [
    {
      id: 'bez-bokala-net-shagala',
      type: ['masterClasses'],
      name: {
        'ru-RU': 'Без бокала нет Шагала',
      },
      picture: bezBokalaNetShagala,
      location: {
        'ru-RU': 'ул. Октябрьской революции, 11а',
      },
      isNear: true,
      shortDescription: {
        // eslint-disable-next-line @stylistic/max-len
        'ru-RU': 'Идеальное место для творческого свидания. Вы сможете расслабиться, попивая бокал вина, и раскрыть свои художественные таланты. Вместе создать картину – это не только романтично, но и запоминающийся опыт.',
      },
      description: {
        // eslint-disable-next-line @stylistic/max-len
        'ru-RU': 'Идеальное место для творческого свидания. Вы сможете расслабиться, попивая бокал вина, и раскрыть свои художественные таланты. Вместе создать картину – это не только романтично, но и запоминающийся опыт.',
      },
      features: [],
      kupidonBonuses: [
        {
          'ru-RU': 'Скидка 10% на арт-вечер при использовании промокода «Купидон»',
        },
      ],
      contacts: [
        { type: 'telegram', value: 'telegram' },
        { type: 'whatsapp', value: 'whatsapp' },
        { type: 'phone', value: 'phone' },
      ],
    },
    {
      id: 'ibis-kitchen',
      type: ['restaurant'],
      name: {
        'ru-RU': 'Ibis Kitchen',
      },
      picture: ibisKitchen,
      location: {
        'ru-RU': 'ул. Осипенко, 5, Отель Ibis',
      },
      isNear: false,
      shortDescription: {
        // eslint-disable-next-line @stylistic/max-len
        'ru-RU': 'Ibis Kitchen — это уютный ресторан, идеально подходящий для романтического ужина. Современный интерьер, мягкий свет и спокойная атмосфера создают комфортную обстановку для неспешной беседы. В меню — блюда европейской кухни, которые удивят утонченным вкусом, а внимательный персонал позаботится о вашем комфорте. Здесь можно провести стильное свидание, наслаждаясь изысканными блюдами и приятной музыкой, которая делает вечер особенным.',
      },
      description: {
        // eslint-disable-next-line @stylistic/max-len
        'ru-RU': 'Ibis Kitchen — это уютный ресторан, идеально подходящий для романтического ужина. Современный интерьер, мягкий свет и спокойная атмосфера создают комфортную обстановку для неспешной беседы. В меню — блюда европейской кухни, которые удивят утонченным вкусом, а внимательный персонал позаботится о вашем комфорте. Здесь можно провести стильное свидание, наслаждаясь изысканными блюдами и приятной музыкой, которая делает вечер особенным.',
      },
      features: [],
      kupidonBonuses: [],
      contacts: [
        { type: 'telegram', value: 'telegram' },
        { type: 'whatsapp', value: 'whatsapp' },
        { type: 'phone', value: 'phone' },
      ],
    },
    {
      id: 'etika',
      type: ['cafe', 'coffeeHouse'],
      name: {
        'ru-RU': 'Etika',
      },
      picture: etika,
      location: {
        'ru-RU': 'ул. Лызина, 9',
      },
      isNear: true,
      shortDescription: {
        // eslint-disable-next-line @stylistic/max-len
        'ru-RU': 'Кафе Etika — отличное место для лёгкого и уютного свидания. Интерьер в стиле минимализма, аромат свежесваренного кофе и десерты ручной работы создают атмосферу уюта. Здесь можно неспешно поговорить, насладиться авторскими напитками и попробовать вкусные блюда из свежих продуктов. Это место подойдёт как для первого свидания, так и для приятной встречи с любимым человеком в расслабленной обстановке.',
      },
      description: {
        // eslint-disable-next-line @stylistic/max-len
        'ru-RU': 'Кафе Etika — отличное место для лёгкого и уютного свидания. Интерьер в стиле минимализма, аромат свежесваренного кофе и десерты ручной работы создают атмосферу уюта. Здесь можно неспешно поговорить, насладиться авторскими напитками и попробовать вкусные блюда из свежих продуктов. Это место подойдёт как для первого свидания, так и для приятной встречи с любимым человеком в расслабленной обстановке.',
      },
      features: [],
      kupidonBonuses: [],
      contacts: [
        { type: 'telegram', value: 'telegram' },
        { type: 'whatsapp', value: 'whatsapp' },
        { type: 'phone', value: 'phone' },
      ],
    },
  ] satisfies DatePlace[],
}
