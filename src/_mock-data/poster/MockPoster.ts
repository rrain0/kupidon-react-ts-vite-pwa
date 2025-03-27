import { PosterItem } from 'src/ui-data/special/poster/PosterData.ts'

import concert from 'src/_mock-data/poster/concert-icon-nainoa-shizuru-NcdG9mK3PBY-unsplash.webp'
import theatre from './theatre-icon--ca0e77b5b5394ea439ab1d3c5c4be985.webp'
import liveMusic from './live-music-2--icon.webp'
import movieNight from './movie-night-2--icon.webp'



export const MockPoster: PosterItem[] = [
  {
    date: '13 марта',
    location: 'Ресторан Ibis',
    price: '',
    description: 'Живая музыка и вкусная кухня. Проведите красивый вечер с вашей второй половиной!',
    previewImg: liveMusic,
  },
  {
    date: '15 марта',
    location: 'Паста-бар Penny',
    price: '',
    description: 'Готовимся встречать выходные с любимыми фильмами. Кинопоказ в Penny — отличная идея для свидания!',
    previewImg: movieNight,
  },
  /* {
   date: '12 марта',
   location: 'ВТБ Арена',
   price: 'от 2599 ₽',
   description: 'Известные артисты исполнят для вас свои песни. Отличная идея для свидания!',
   previewImg: concert,
   }, */
]

