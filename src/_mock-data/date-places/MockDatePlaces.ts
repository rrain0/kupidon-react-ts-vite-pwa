import { DatePlace } from 'src/ui-data/special/date-place/DatePlacesData.ts'

import bezBokalaNetShagala from './bez-bokala-net-shagala-2f15ebe1-ed25-445e-866a-45b1c12bc14a.jpg'
import ibisKitchen from './ibis-kitchen-30258560112733222_ea8f.jpg'
import etika from './etika-30258560173284876_9170.jpg'
import etikaVideo from './clip-by-etika.cakes happy valentine\'s day 480p.mp4'



export const MockDatePlaces: DatePlace[] = [
  {
    id: 'Без бокала нет Шагала ул. Октябрьской революции, 11а',
    types: ['all', 'nonstandard', 'masterClasses'],
    name: {
      'ru-RU': 'Без бокала нет Шагала',
    },
    picture: bezBokalaNetShagala,
    uiAddress: {
      'ru-RU': 'ул. Октябрьской революции, 11а',
    },
    locationMap: {
      lat: 52.290160,
      lon: 104.304376,
      q: 'Без бокала нет Шагала, Иркутск, ул. Октябрьской революции, 11а',
    },
    locationPlaces: [
      { type: 'doubleGis', link: 'https://2gis.ru/irkutsk/firm/70000001035047870' },
      { type: 'yandexMaps', link: 'https://yandex.ru/maps/org/bez_bokala_net_shagala/214012371037' },
    ],
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
      { type: 'phone', phone: '+79246029191' },
      { type: 'phone', phone: '+73952648481' },
      { type: 'telegram', nick: '+79246029191' },
      { type: 'whatsapp', phone: '79246029191' },
    ],
  },
  
  
  {
    id: 'Ibis Kitchen ул. Осипенко, 5, Отель Ibis',
    types: ['all', 'romantic', 'tableRomantic', 'restaurant'],
    name: {
      'ru-RU': 'Ibis Kitchen',
    },
    picture: ibisKitchen,
    uiAddress: {
      'ru-RU': 'ул. Осипенко, 5, Отель Ibis',
    },
    locationMap: {
      lat: 52.287561,
      lon: 104.270522,
      q: 'Ibis Kitchen, Иркутск, ул. Осипенко, 5, Отель Ibis',
    },
    locationPlaces: [
      { type: 'doubleGis', link: 'https://2gis.ru/irkutsk/firm/70000001067930277' },
      { type: 'yandexMaps', link: 'https://yandex.ru/maps/org/ibis_kitchen_restaurant/54371029015' },
    ],
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
      { type: 'phone', phone: '+73952703177' },
      { type: 'phone', phone: '+79021706500' },
      { type: 'telegram', nick: 'ibis_irkutsk' },
      { type: 'whatsapp', phone: '79021706500' },
    ],
  },
  
  
  {
    id: 'Etika ул. Лызина, 9',
    types: ['all', 'romantic', 'tableRomantic', 'cafe', 'coffeeHouse'],
    name: {
      'ru-RU': 'Etika',
    },
    picture: etika,
    video: etikaVideo,
    uiAddress: {
      'ru-RU': 'ул. Лызина, 9',
    },
    locationMap: {
      lat: 52.281736,
      lon: 104.323286,
      q: 'Etika, Иркутск, ул. Лызина, 9',
    },
    locationPlaces: [
      { type: 'doubleGis', link: 'https://2gis.ru/irkutsk/firm/70000001051571907' },
      { type: 'yandexMaps', link: 'https://yandex.ru/maps/org/etika/240235466985' },
    ],
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
      { type: 'phone', phone: '+73952990800' },
      { type: 'telegram', nick: 'etikacakes' },
      { type: 'whatsapp', phone: '79149563551' },
      
      
      //{ type: 'email', email: 'etika.cakes@gmail.com' },
    ],
  },
]
