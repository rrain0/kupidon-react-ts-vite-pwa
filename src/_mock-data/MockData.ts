import { Env } from '@util/app/Env.ts'
import avaChan1 from '@im/mock/ava chan d6535947482554bd0571ba485e4467d0.jpg'
import avaChan2 from '@im/mock/ava top chan 1cc31157191cfe279575176e2db4ff81.jpg'
import avaChan3 from '@im/mock/ava korathink x KXBRIGU - SENTENIAL 3.png'
import beastTamerNekoChan from '@im/mock/[08] Beast_Tamer.mp4_20221128_150447.115.jpg'
import blueLockIsagi from '@im/mock/[DC] Blue Lock - 19_Telegram.mp4_20230220_171742.815.jpg'
import animeChan from '@im/mock/anime-chan.jpg'
import banSmirks from '@im/mock/Ban smirks  Nanatsu no Taizai.jpg'
import chanAva from '@im/mock/chan ava 6868ff87e048ba80ad88c2746c4523e3 square.png'
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
    '@im/mock/people-avas/charming-woman-with-curly-hairstyle-make-up-studio  small ava.png'
import avaCheerfulGirl from
    '@im/mock/people-avas/cheerful-girl-cashmere-sweater-laughs-against-backdrop-blossoming-sakura-portrait-woman-yellow-hoodie-city-spring  small ava.png'
import avaCloseUpSmilingBlonde from
    '@im/mock/people-avas/close-up-smiling-blonde-young-woman-florist-shop  small ava.png'
import avaDarkHairedLady from
    '@im/mock/people-avas/dark-haired-lady-with-plump-lips-green-eyed-girl-with-long-eyelashes-crown-flowers-posing-blue-wall  small ava.png'
import avaAttractivePrettyWoman from
    '@im/mock/people-avas/indoor-studio-shot-attractive-pretty-woman-with-light-brown-hair-wearing-black-jacket-with-red-lips  small ava.png'
import avaBeautifulBusinessLady from
    '@im/mock/people-avas/portrait-young-beautiful-business-lady-smiling-touching-face  small ava.png'
import avaWomanPosingHouse from
    '@im/mock/people-avas/portrait-young-woman-posing-house  small ava.png'
import avaStylishBrunetteGirl from
    '@im/mock/people-avas/pretty-stylish-brunette-girl-wistfully-looking-camera-while-resting-city-street  small ava.png'
import avaWomanWalkingStreet from
    '@im/mock/people-avas/woman-portrait-walking-street  small ava.png'
import avaWomanWithCureSmile from
    '@im/mock/people-avas/young-pretty-woman-with-cute-smile-pink-sweater-sunglasses-isolated-pink-studio-background-spring-fashion-trend  small ava.png'




export const MockData = {
  
  account: {
    testUserAccessToken: (() => {
      // Токены созданы 2025-04-30 и будут жить 2 года (2 * 365 дней)
      // eslint-disable-next-line @stylistic/max-len
      if (Env.isDev) return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MDkwOTAwMDksInN1YiI6Ijc5NTQxNWRhLWEyY2ItNDM1Yi04MGVlLTk4YWYyOGIzZjBkMCIsInJvbGVzIjpbXX0.-Het9RLLDnoy72gh9BhLwA3eoH1_p_MVQTJKxkKWAjs'
      // eslint-disable-next-line @stylistic/max-len
      if (Env.isProd) return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MDkwOTYwNjYsInN1YiI6Ijc5NTQxNWRhLWEyY2ItNDM1Yi04MGVlLTk4YWYyOGIzZjBkMCIsInJvbGVzIjpbXX0.aEbvHu7P58Es1CfKKrtIZ-ys1tGAYRC5Iul5KfVlTSQ'
      return ''
    })(),
  },
  
  images: {
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
  },
  
  peopleAvas: {
    record: {
      avaCharmingWoman, avaCheerfulGirl, avaCloseUpSmilingBlonde,
      avaDarkHairedLady, avaAttractivePrettyWoman, avaBeautifulBusinessLady,
      avaWomanPosingHouse, avaStylishBrunetteGirl, avaWomanWalkingStreet,
      avaWomanWithCureSmile,
    },
  },
  
  date: '2000-08-23T14:33:55.609+07:00',
  
  profile: {
    ava: kakashiAndSatoru,
    name: 'Сатору',
    city: 'Токио',
    birthDate: '2000-08-23T14:33:55.609+07:00',
  },
  
  profile2: {
    ava: nextUp,
    name: 'Дмитрий',
    city: 'Иркутск',
    birthDate: '1998-02-16T03:20:36.458+08:00',
  },
  
  // eslint-disable-next-line @stylistic/max-len
  dataUrlRainbowCircle: 'data:image/webp;base64,UklGRqQBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSMcAAAABgKRt27Hlzq5FdDTr1yq4gYxRC2jcjDuwbdfItm3bjfxdeQ0RMQH6NdhsCtE/Xf1vRnd1i/M3j3QwSi+BfO8fKUfQccnPIknOnkeogY3m5rEPu9R7MMNN72nlksFJXZaCX6nioMMWV/QETPmZYHLqJVxKbhsFTCagvzVGijDGlsDsNwFc50RF1t1RxXuYsiuPMRbLTzqfGboakOzGeEvjFtTByahbUgE/d/thPVWSvPOB/VogzeuHZK+tGOSt16V/hphMwfoVAFZQOCC2AAAAcAMAnQEqEAAQAAIANCWwAnS3AETVewn5RhMyE/cLRAq84OQAAP7sJjZi2vltQVBtNESasiNNPNYI+PcqyMEU4i1/XVdYjQ4vQp/F40ttvfOzsGPdXqjTNaRZUQHdP3bDduNg0gtbNHTYFYCP/VOdNoX1/+ObtPOcjPnVjeNN/yOPz99Ks7xmS516zD7AO3/4y2OPif/oef1e3R0P4sXmRdv53iiSbRLc7R71eIXE78oaxJruAAA=',
  // eslint-disable-next-line @stylistic/max-len
  dataUrlSmallRedDot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
}

