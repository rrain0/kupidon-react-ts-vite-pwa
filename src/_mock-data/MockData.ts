import { Env } from '@util/app/Env.ts'
import avaChan1 from '@im/mock/ava chan d6535947482554bd0571ba485e4467d0.jpg'
import avaChan2 from '@im/mock/ava top chan 1cc31157191cfe279575176e2db4ff81.jpg'
import avaChan3 from '@im/mock/ava korathink x KXBRIGU - SENTENIAL 3.png'
import beastTamerNekoChan from '@im/mock/[08] Beast_Tamer.mp4_20221128_150447.115.jpg'
import blueLockIsagi from '@im/mock/[DC] Blue Lock - 19_Telegram.mp4_20230220_171742.815.jpg'
import animeChan from '@im/mock/anime-chan.jpg'
import banSmirks from '@im/mock/Ban smirks  Nanatsu no Taizai.jpg'
import chanAva from '@im/mock/Kazusa_Blue_Archive_ava_chan_c977d4e3aa32dcc8bb1f8de8d3e07f5f.jpg'
import cuteChanWithFlowers from '@im/mock/cute chan with flowers 118241319_p1.jpg'
import flatOut2 from '@im/mock/FlatOut 2.jpg'
import guyFawkesMask from '@im/mock/Guy Fawkes Mask.jpg'
import kakashiAndSatoru from '@im/mock/Hatake Kakashi & Satoru Goujo Cross-Over.full.3982603.jpg'
import blueLockIsagi2 from '@im/mock/Isagi - Blue Lock 250d5ed0b02d009af2f7fa46732b468b.jpg'
import needMoreAcid from '@im/mock/need_more_acid_mark_ii.jpg'
import nextUp from '@im/mock/NEXT UP.jpg'
import ourLastNight from '@im/mock/Our Last Night.jpg'
import retrowave2 from '@im/mock/Retrowave_(2).jpg'
import satoru from '@im/mock/Сатору Годзё photo_2023-07-31_22-35-02.jpg'

import avaCharmingWoman from
    '@im/mock/people/1/avas/charming-woman-with-curly-hairstyle-make-up-studio  small ava.png'
import avaCheerfulGirl from
    '@im/mock/people/1/avas/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring  small ava.png'
import avaCloseUpSmilingBlonde from
    '@im/mock/people/1/avas/close-up-smiling-blonde-young-woman-florist-shop  small ava.png'
import avaDarkHairedLady from
    '@im/mock/people/1/avas/dark-haired-lady-with-plump-lips-green-eyed-girl-with-long-eyelashes-crown-flowers-posing-blue-wall  small ava.png'
import avaAttractivePrettyWoman from
    '@im/mock/people/1/avas/indoor-studio-shot-attractive-pretty-woman-with-light-brown-hair-wearing-black-jacket-with-red-lips  small ava.png'
import avaBeautifulBusinessLady from
    '@im/mock/people/1/avas/portrait-young-beautiful-business-lady-smiling-touching-face  small ava.png'
import avaWomanPosingHouse from
    '@im/mock/people/1/avas/portrait-young-woman-posing-house  small ava.png'
import avaStylishBrunetteGirl from
    '@im/mock/people/1/avas/pretty-stylish-brunette-girl-wistfully-looking-camera-while-resting-city-street  small ava.png'
import avaWomanWalkingStreet from
    '@im/mock/people/1/avas/woman-portrait-walking-street  small ava.png'
import avaWomanWithCureSmile from
    '@im/mock/people/1/avas/young-pretty-woman-with-cute-smile-pink-sweater-sunglasses-isolated-pink-studio-background-spring-fashion-trend  small ava.png'

import portraitCharmingWoman from
    '@im/mock/people/1/portraits/charming-woman-with-curly-hairstyle-make-up-studio  portrait.webp'
import portraitCheerfulGirl from
    '@im/mock/people/1/portraits/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring  portrait.webp'
import portraitDarkHairedLady from
    '@im/mock/people/1/portraits/dark-haired-lady-with-plump-lips-green-eyed-girl-with-long-eyelashes-crown-flowers-posing-blue-wall  portrait.webp'
import portraitAttractivePrettyWoman from
    '@im/mock/people/1/portraits/indoor-studio-shot-attractive-pretty-woman-with-light-brown-hair-wearing-black-jacket-with-red-lips  portrait.webp'
import portraitWomanPosingHouse from
    '@im/mock/people/1/portraits/portrait-young-woman-posing-house  portrait.webp'
import portraitStylishBrunetteGirl from
    '@im/mock/people/1/portraits/pretty-stylish-brunette-girl-wistfully-looking-camera-while-resting-city-street  portrait.webp'
import { DateU } from '@util/date/DateU.ts'
import { OtherUserA } from 'src/model/api/UserA.ts'




export namespace MockData {
  
  export const account = {
    testUserAccessToken: (() => {
      // Токены созданы 2025-04-30 и будут жить 2 года (2 * 365 дней)
      // eslint-disable-next-line @stylistic/max-len
      if (Env.isDev) return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MDkwOTAwMDksInN1YiI6Ijc5NTQxNWRhLWEyY2ItNDM1Yi04MGVlLTk4YWYyOGIzZjBkMCIsInJvbGVzIjpbXX0.-Het9RLLDnoy72gh9BhLwA3eoH1_p_MVQTJKxkKWAjs'
      // eslint-disable-next-line @stylistic/max-len
      if (Env.isProd) return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MDkwOTYwNjYsInN1YiI6Ijc5NTQxNWRhLWEyY2ItNDM1Yi04MGVlLTk4YWYyOGIzZjBkMCIsInJvbGVzIjpbXX0.aEbvHu7P58Es1CfKKrtIZ-ys1tGAYRC5Iul5KfVlTSQ'
      return ''
    })(),
  }
  
  export const images = {
    record: {
      avaChan1, avaChan2, avaChan3,
      beastTamerNekoChan, blueLockIsagi,
      animeChan, banSmirks, chanAva, cuteChanWithFlowers, flatOut2,
      guyFawkesMask, kakashiAndSatoru, blueLockIsagi2,
      needMoreAcid, nextUp,
      ourLastNight, retrowave2, satoru,
    },
    
    sixImages: [
      cuteChanWithFlowers, flatOut2, blueLockIsagi2,
      kakashiAndSatoru, needMoreAcid, satoru,
    ],
    sixImages2: [
      flatOut2, animeChan, banSmirks,
      guyFawkesMask, nextUp, ourLastNight,
    ],
    sixImages3: [
      animeChan, banSmirks, guyFawkesMask,
      kakashiAndSatoru, needMoreAcid, beastTamerNekoChan,
    ],
  }
  
  export const peopleAvas = {
    record: {
      avaCharmingWoman, avaCheerfulGirl, avaCloseUpSmilingBlonde,
      avaDarkHairedLady, avaAttractivePrettyWoman, avaBeautifulBusinessLady,
      avaWomanPosingHouse, avaStylishBrunetteGirl, avaWomanWalkingStreet,
      avaWomanWithCureSmile,
    },
  }
  export const peoplePortraits = {
    record: {
      portraitCharmingWoman, portraitCheerfulGirl,
      portraitDarkHairedLady, portraitAttractivePrettyWoman, portraitWomanPosingHouse,
      portraitStylishBrunetteGirl,
    },
  }
  
  export namespace date {
    export const someDate = '2000-08-23T14:33:55.609+07:00'
    
    export const date0sAgo = new Date().toISOString()
    export const date1sAgo = new Date(+new Date() - 1000).toISOString()
    export const date1mAgo = new Date(+new Date() - 1000 * 60).toISOString()
    export const date8mAgo = new Date(+new Date() - 1000 * 60 * 8).toISOString()
    export const date12mAgo = new Date(+new Date() - 1000 * 60 * 12).toISOString()
    export const date57mAgo = new Date(+new Date() - 1000 * 60 * 57).toISOString()
    export const date1hAgo = new Date(+new Date() - 1000 * 60 * 60).toISOString()
    export const date17hAgo = new Date(+new Date() - 1000 * 60 * 60 * 17).toISOString()
    export const date1dAgo = new Date(+new Date() - 1000 * 60 * 60 * 24).toISOString()
    export const date3dAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 3).toISOString()
    export const date1wAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 7).toISOString()
    export const date3wAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 7 * 3).toISOString()
    export const date1MAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30).toISOString()
    export const date6MAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString()
    export const date2yAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 2).toISOString()
    export const date8yAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 8).toISOString()
  }
  
  export const profile = {
    ava: kakashiAndSatoru,
    name: 'Сатору',
    city: 'Токио',
    birthDate: '2000-08-23T14:33:55.609+07:00',
  }
  
  export const profile2 = {
    ava: nextUp,
    name: 'Дмитрий',
    city: 'Иркутск',
    birthDate: '1998-02-16T03:20:36.458+08:00',
  }
  
  
  
  export const users: OtherUserA[] = [
    {
      id: '175dc7be-3f56-4b9d-9403-e994b72624dc',
      name: 'Алиса',
      birthDate: '2001-05-15', age: DateU.age('2001-05-15') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [{
        id: '93723057-eee2-4a75-9095-e5b3219f0885', index: 0, name: '', mimeType: 'image/png',
        url: portraitAttractivePrettyWoman,
      }],
    },
    {
      id: '97bd2cee-decf-4774-8768-b576118af713',
      name: 'Мария',
      birthDate: '2000-05-15', age: DateU.age('2000-05-15') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [{
        id: 'd5b6d377-2f7c-4fd8-8166-7ec9ca691023', index: 0, name: '', mimeType: 'image/png',
        url: portraitStylishBrunetteGirl,
      }],
    },
    {
      id: '5ac18ba3-fc4a-4983-a662-7b8134885ed6',
      name: 'Ксюша',
      birthDate: '2001-05-15', age: DateU.age('2001-05-15') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [{
        id: '69184b79-2fa5-4270-a407-8405b1972dc9', index: 0, name: '', mimeType: 'image/png',
        url: portraitWomanPosingHouse,
      }],
    },
    {
      id: 'ee8d201d-789b-4c89-a28b-e78b282bca70',
      name: 'Влада',
      birthDate: '2003-05-15', age: DateU.age('2003-05-15') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [{
        id: 'ee389d55-d1aa-411e-bd47-d9b86c7ed102', index: 0, name: '', mimeType: 'image/png',
        url: portraitCheerfulGirl,
      }],
    },
    {
      id: '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d',
      name: 'Лера',
      birthDate: '2004-05-15', age: DateU.age('2004-05-15') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [{
        id: '714e70ba-f328-4df4-9468-48ec874e8500', index: 0, name: '', mimeType: 'image/png',
        url: portraitCharmingWoman,
      }],
    },
    {
      id: 'a503343a-4759-441d-aae0-3f61e2335337',
      name: 'Настя',
      birthDate: '2002-05-15', age: DateU.age('2002-05-15') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [{
        id: 'f967f0e7-05e1-44bd-83af-0bef3ee9f63d', index: 0, name: '', mimeType: 'image/png',
        url: portraitDarkHairedLady,
      }],
    },
    {
      id: 'c866cb44-bb50-4701-87e2-36b8967a3201',
      name: 'Саша',
      birthDate: '2000-02-12', age: DateU.age('2000-02-12') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [],
    },
    {
      id: '84b5d4ab-2bce-4988-9674-8a7b878f3266',
      name: 'Аня',
      birthDate: '2001-05-09', age: DateU.age('2001-05-09') ?? 0,
      gender: 'FEMALE',
      aboutMe: '',
      photos: [],
    },
  ]
  
  
  
  export const dataUrlRainbowCircle =
    'data:image/webp;base64,UklGRqQBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSMcAAAABgKRt27Hlzq5FdDTr1yq4gYxRC2jcjDuwbdfItm3bjfxdeQ0RMQH6NdhsCtE/Xf1vRnd1i/M3j3QwSi+BfO8fKUfQccnPIknOnkeogY3m5rEPu9R7MMNN72nlksFJXZaCX6nioMMWV/QETPmZYHLqJVxKbhsFTCagvzVGijDGlsDsNwFc50RF1t1RxXuYsiuPMRbLTzqfGboakOzGeEvjFtTByahbUgE/d/thPVWSvPOB/VogzeuHZK+tGOSt16V/hphMwfoVAFZQOCC2AAAAcAMAnQEqEAAQAAIANCWwAnS3AETVewn5RhMyE/cLRAq84OQAAP7sJjZi2vltQVBtNESasiNNPNYI+PcqyMEU4i1/XVdYjQ4vQp/F40ttvfOzsGPdXqjTNaRZUQHdP3bDduNg0gtbNHTYFYCP/VOdNoX1/+ObtPOcjPnVjeNN/yOPz99Ks7xmS516zD7AO3/4y2OPif/oef1e3R0P4sXmRdv53iiSbRLc7R71eIXE78oaxJruAAA='
  export const dataUrlSmallRedDot =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  
}

