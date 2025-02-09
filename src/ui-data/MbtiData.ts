import { TypeU } from '@util/common/TypeU.ts'
import { MbtiType } from 'src/api/model/MbtiType.ts'
import RecordRo = TypeU.RecordRo

import scientist from '@im/personality-type/scientist.svg'
import scientistWithBg from '@im/personality-type/scientist-with-bg.svg'

import photographer from '@im/personality-type/photographer.svg'
import photographerWithBg from '@im/personality-type/photographer-with-bg.svg'

import support from '@im/personality-type/support.svg'
import supportWithBg from '@im/personality-type/support-with-bg.svg'

import mechanic from '@im/personality-type/mechanic.svg'
import mechanicWithBg from '@im/personality-type/mechanic-with-bg.svg'

import postman from '@im/personality-type/postman.svg'
import postmanWithBg from '@im/personality-type/postman-with-bg.svg'

import magician from '@im/personality-type/magician.svg'
import magicianWithBg from '@im/personality-type/magician-with-bg.svg'

import nurse from '@im/personality-type/nurse.svg'
import nurseWithBg from '@im/personality-type/nurse-with-bg.svg'

import singer from '@im/personality-type/singer.svg'
import singerWithBg from '@im/personality-type/singer-with-bg.svg'

import manager from '@im/personality-type/manager.svg'
import managerWithBg from '@im/personality-type/manager-with-bg.svg'

import pensioner from '@im/personality-type/pensioner.svg'
import pensionerWithBg from '@im/personality-type/pensioner-with-bg.svg'

import secretary from '@im/personality-type/secretary.svg'
import secretaryWithBg from '@im/personality-type/secretary-with-bg.svg'

import carpenter from '@im/personality-type/carpenter.svg'
import carpenterWithBg from '@im/personality-type/carpenter-with-bg.svg'

import politician from '@im/personality-type/politician.svg'
import politicianWithBg from '@im/personality-type/politician-with-bg.svg'

import athlete from '@im/personality-type/athlete.svg'
import athleteWithBg from '@im/personality-type/athlete-with-bg.svg'

import showman from '@im/personality-type/showman.svg'
import showmanWithBg from '@im/personality-type/showman-with-bg.svg'

import clown from '@im/personality-type/clown.svg'
import clownWithBg from '@im/personality-type/clown-with-bg.svg'



export const MbtiData: RecordRo<MbtiType, {
  icon: string 
  picture: string
  color: string
  highCompatibility: MbtiType[],
  mediumCompatibility: MbtiType[],
}> = {
  ESTJ: { 
    icon: secretary,
    picture: secretaryWithBg,
    color: '#3E94DA',
    highCompatibility: ['ISTJ', 'ESFJ'],
    mediumCompatibility: ['INFP', 'ENFP'],
  },
  ESTP: { 
    icon: carpenter,
    picture: carpenterWithBg,
    color: '#EABF4B',
    highCompatibility: ['ISTP', 'ESFP'],
    mediumCompatibility: ['INTJ', 'ISTJ'],
  },
  ESFJ: { 
    icon: showman,
    picture: showmanWithBg,
    color: '#3E94DA',
    highCompatibility: ['ISFJ', 'ESTJ'],
    mediumCompatibility: ['INTP', 'INTJ'],
  },
  ESFP: { 
    icon: clown,
    picture: clownWithBg,
    color: '#EABF4B',
    highCompatibility: ['ISFP', 'ESTP'],
    mediumCompatibility: ['INTJ', 'ISTJ'],
  },
  ENTJ: { 
    icon: manager,
    picture: managerWithBg,
    color: '#9C2B87',
    highCompatibility: ['INTJ', 'ENTP'],
    mediumCompatibility: ['ISFP', 'INFP'],
  },
  ENTP: { 
    icon: politician,
    picture: politicianWithBg,
    color: '#9C2B87',
    highCompatibility: ['INTP', 'INFJ'],
    mediumCompatibility: ['ISFJ', 'ESTJ'],
  },
  ENFJ: { 
    icon: pensioner,
    picture: pensionerWithBg,
    color: '#3E9C2B',
    highCompatibility: ['INFP', 'ENFP'],
    mediumCompatibility: ['ISTP', 'ESTP'],
  },
  ENFP: { 
    icon: athlete,
    picture: athleteWithBg,
    color: '#3E9C2B',
    highCompatibility: ['INFJ', 'INTJ'],
    mediumCompatibility: ['ISTJ', 'ESTJ'],
  },
  ISTJ: { 
    icon: support,
    picture: supportWithBg,
    color: '#3E94DA',
    highCompatibility: ['ESTJ', 'ISFJ'],
    mediumCompatibility: ['ENFP', 'INFP'],
  },
  ISTP: { 
    icon: mechanic,
    picture: mechanicWithBg,
    color: '#EABF4B',
    highCompatibility: ['ESTP', 'ISFP'],
    mediumCompatibility: ['ENFJ', 'INFJ'],
  },
  ISFJ: { 
    icon: nurse,
    picture: nurseWithBg,
    color: '#3E94DA',
    highCompatibility: ['ESFJ', 'ISTJ'],
    mediumCompatibility: ['ENTP', 'INTP'],
  },
  ISFP: { 
    icon: singer,
    picture: singerWithBg,
    color: '#EABF4B',
    highCompatibility: ['ESFP', 'ISTP'],
    mediumCompatibility: ['ESTJ', 'ENTJ'],
  },
  INTJ: { 
    icon: postman,
    picture: postmanWithBg,
    color: '#9C2B87',
    highCompatibility: ['ENFP', 'INFJ'],
    mediumCompatibility: ['ESFJ', 'ESTP'],
  },
  INTP: { 
    icon: scientist,
    picture: scientistWithBg,
    color: '#9C2B87',
    highCompatibility: ['ENTP', 'INFJ'],
    mediumCompatibility: ['ESFJ', 'ISFJ'],
  },
  INFJ: { 
    icon: photographer,
    picture: photographerWithBg,
    color: '#3E9C2B',
    highCompatibility: ['ENFP', 'INTJ'],
    mediumCompatibility: ['ESTP', 'ISTP'],
  },
  INFP: { 
    icon: magician,
    picture: magicianWithBg,
    color: '#3E9C2B',
    highCompatibility: ['ENFJ', 'INFJ'],
    mediumCompatibility: ['ESTP', 'ENTJ'],
  },
}
