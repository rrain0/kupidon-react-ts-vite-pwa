
import { MbtiType } from 'src/models/MbtiType.ts'
import { RecordRo } from '@utils/base/tsUtils.ts'

import scientist from '@im/mbti-type/scientist.svg'
import scientistWithBg from '@im/mbti-type/scientist-with-bg.svg'

import photographer from '@im/mbti-type/photographer.svg'
import photographerWithBg from '@im/mbti-type/photographer-with-bg.svg'

import support from '@im/mbti-type/support.svg'
import supportWithBg from '@im/mbti-type/support-with-bg.svg'

import mechanic from '@im/mbti-type/mechanic.svg'
import mechanicWithBg from '@im/mbti-type/mechanic-with-bg.svg'

import postman from '@im/mbti-type/postman.svg'
import postmanWithBg from '@im/mbti-type/postman-with-bg.svg'

import magician from '@im/mbti-type/magician.svg'
import magicianWithBg from '@im/mbti-type/magician-with-bg.svg'

import nurse from '@im/mbti-type/nurse.svg'
import nurseWithBg from '@im/mbti-type/nurse-with-bg.svg'

import singer from '@im/mbti-type/singer.svg'
import singerWithBg from '@im/mbti-type/singer-with-bg.svg'

import manager from '@im/mbti-type/manager.svg'
import managerWithBg from '@im/mbti-type/manager-with-bg.svg'

import pensioner from '@im/mbti-type/pensioner.svg'
import pensionerWithBg from '@im/mbti-type/pensioner-with-bg.svg'

import secretary from '@im/mbti-type/secretary.svg'
import secretaryWithBg from '@im/mbti-type/secretary-with-bg.svg'

import carpenter from '@im/mbti-type/carpenter.svg'
import carpenterWithBg from '@im/mbti-type/carpenter-with-bg.svg'

import politician from '@im/mbti-type/politician.svg'
import politicianWithBg from '@im/mbti-type/politician-with-bg.svg'

import athlete from '@im/mbti-type/athlete.svg'
import athleteWithBg from '@im/mbti-type/athlete-with-bg.svg'

import showman from '@im/mbti-type/showman.svg'
import showmanWithBg from '@im/mbti-type/showman-with-bg.svg'

import clown from '@im/mbti-type/clown.svg'
import clownWithBg from '@im/mbti-type/clown-with-bg.svg'
import { UiTextValues } from '@libs/ui-text/UiText.ts'




// MBTI data by type with uiText & LocalTheme
export const MbtiTypeData: RecordRo<MbtiType, {
  icon: string 
  picture: string
  color: string
  highCompatibility: MbtiType[],
  mediumCompatibility: MbtiType[],
  uiText: UiTextValues<'name' | 'shortDescription'>
}> = {
  ESTJ: { 
    icon: secretary,
    picture: secretaryWithBg,
    color: '#3E94DA',
    highCompatibility: ['ISTJ', 'ESFJ'],
    mediumCompatibility: ['INFP', 'ENFP'],
    uiText: {
      name: {
        'ru-RU': 'Руководитель',
      },
      shortDescription: {
        'ru-RU': 'Организованные, практичные, склонные к лидерству и ответственности',
      },
    },
  },
  ESTP: { 
    icon: carpenter,
    picture: carpenterWithBg,
    color: '#EABF4B',
    highCompatibility: ['ISTP', 'ESFP'],
    mediumCompatibility: ['INTJ', 'ISTJ'],
    uiText: {
      name: {
        'ru-RU': 'Динамик',
      },
      shortDescription: {
        'ru-RU': 'Энергичные, практичные, любят новые впечатления и приключения',
      },
    },
  },
  ESFJ: { 
    icon: showman,
    picture: showmanWithBg,
    color: '#3E94DA',
    highCompatibility: ['ISFJ', 'ESTJ'],
    mediumCompatibility: ['INTP', 'INTJ'],
    uiText: {
      name: {
        'ru-RU': 'Консул',
      },
      shortDescription: {
        'ru-RU': 'Заботливые, организованные, стремящиеся к гармонии в отношениях',
      },
    },
  },
  ESFP: { 
    icon: clown,
    picture: clownWithBg,
    color: '#EABF4B',
    highCompatibility: ['ISFP', 'ESTP'],
    mediumCompatibility: ['INTJ', 'ISTJ'],
    uiText: {
      name: {
        'ru-RU': 'Артист',
      },
      shortDescription: {
        'ru-RU': 'Живые, общительные, любящие наслаждаться жизнью и развлекать других',
      },
    },
  },
  ENTJ: { 
    icon: manager,
    picture: managerWithBg,
    color: '#9C2B87',
    highCompatibility: ['INTJ', 'ENTP'],
    mediumCompatibility: ['ISFP', 'INFP'],
    uiText: {
      name: {
        'ru-RU': 'Командир',
      },
      shortDescription: {
        'ru-RU': 'Лидеры, стратегически мыслящие, нацеленные на достижение целей',
      },
    },
  },
  ENTP: { 
    icon: politician,
    picture: politicianWithBg,
    color: '#9C2B87',
    highCompatibility: ['INTP', 'INFJ'],
    mediumCompatibility: ['ISFJ', 'ESTJ'],
    uiText: {
      name: {
        'ru-RU': 'Инноватор',
      },
      shortDescription: {
        'ru-RU': 'Изобретательные, любящие обсуждения и новые идеи, склонные к вызовам',
      },
    },
  },
  ENFJ: { 
    icon: pensioner,
    picture: pensionerWithBg,
    color: '#3E9C2B',
    highCompatibility: ['INFP', 'ENFP'],
    mediumCompatibility: ['ISTP', 'ESTP'],
    uiText: {
      name: {
        'ru-RU': 'Наставник',
      },
      shortDescription: {
        'ru-RU': 'Эмпатичные, организованные, умеющие вдохновлять и вести за собой',
      },
    },
  },
  ENFP: {
    icon: athlete,
    picture: athleteWithBg,
    color: '#3E9C2B',
    highCompatibility: ['INFJ', 'INTJ'],
    mediumCompatibility: ['ISTJ', 'ESTJ'],
    uiText: {
      name: {
        'ru-RU': 'Вдохновитель',
      },
      shortDescription: {
        'ru-RU': 'Энергичные, креативные, ориентированные на идеи и возможности',
      },
    },
  },
  ISTJ: {
    icon: support,
    picture: supportWithBg,
    color: '#3E94DA',
    highCompatibility: ['ESTJ', 'ISFJ'],
    mediumCompatibility: ['ENFP', 'INFP'],
    uiText: {
      name: {
        'ru-RU': 'Инспектор',
      },
      shortDescription: {
        'ru-RU': 'Практичные, организованные, надежные, ценят порядок и традиции',
      },
    },
  },
  ISTP: {
    icon: mechanic,
    picture: mechanicWithBg,
    color: '#EABF4B',
    highCompatibility: ['ESTP', 'ISFP'],
    mediumCompatibility: ['ENFJ', 'INFJ'],
    uiText: {
      name: {
        'ru-RU': 'Мастерица',
      },
      shortDescription: {
        'ru-RU': 'Практичные, решительные, стремящиеся к действию и приключениям',
      },
    },
  },
  ISFJ: {
    icon: nurse,
    picture: nurseWithBg,
    color: '#3E94DA',
    highCompatibility: ['ESFJ', 'ISTJ'],
    mediumCompatibility: ['ENTP', 'INTP'],
    uiText: {
      name: {
        'ru-RU': 'Защитник',
      },
      shortDescription: {
        'ru-RU': 'Заботливые, преданные, внимательные к деталям, ориентированные на других',
      },
    },
  },
  ISFP: {
    icon: singer,
    picture: singerWithBg,
    color: '#EABF4B',
    highCompatibility: ['ESFP', 'ISTP'],
    mediumCompatibility: ['ESTJ', 'ENTJ'],
    uiText: {
      name: {
        'ru-RU': 'Творец',
      },
      shortDescription: {
        'ru-RU': 'Творческие, чувствительные, ценят гармонию и эстетику',
      },
    },
  },
  INTJ: {
    icon: postman,
    picture: postmanWithBg,
    color: '#9C2B87',
    highCompatibility: ['ENFP', 'INFJ'],
    mediumCompatibility: ['ESFJ', 'ESTP'],
    uiText: {
      name: {
        'ru-RU': 'Стратег',
      },
      shortDescription: {
        'ru-RU': 'Независимые, стратегически мыслящие, ориентированные на долгосрочные цели',
      },
    },
  },
  INTP: {
    icon: scientist,
    picture: scientistWithBg,
    color: '#9C2B87',
    highCompatibility: ['ENTP', 'INFJ'],
    mediumCompatibility: ['ESFJ', 'ISFJ'],
    uiText: {
      name: {
        'ru-RU': 'Логик',
      },
      shortDescription: {
        'ru-RU': 'Аналитические, любящие идеи и теории, стремящиеся к глубокому пониманию',
      },
    },
  },
  INFJ: {
    icon: photographer,
    picture: photographerWithBg,
    color: '#3E9C2B',
    highCompatibility: ['ENFP', 'INTJ'],
    mediumCompatibility: ['ESTP', 'ISTP'],
    uiText: {
      name: {
        'ru-RU': 'Советчик',
      },
      shortDescription: {
        'ru-RU': 'Интуитивные, идеалистичные, стремящиеся к пониманию других',
      },
    },
  },
  INFP: {
    icon: magician,
    picture: magicianWithBg,
    color: '#3E9C2B',
    highCompatibility: ['ENFJ', 'INFJ'],
    mediumCompatibility: ['ESTP', 'ENTJ'],
    uiText: {
      name: {
        'ru-RU': 'Мечтатель',
      },
      shortDescription: {
        'ru-RU': 'Идеалистичные, чувствительные, стремящиеся к внутреннему пониманию',
      },
    },
  },
}
