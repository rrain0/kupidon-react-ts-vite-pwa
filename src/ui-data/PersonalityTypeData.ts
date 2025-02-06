import { TypeU } from '@util/common/TypeU.ts'
import { PersonalityType } from 'src/api/model/PersonalityType.ts'
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



export const PersonalityTypeData: RecordRo<PersonalityType, {
  icon: string 
  picture: string
  color: string
}> = {
  ESTJ: { 
    icon: secretary,
    picture: secretaryWithBg,
    color: '#3E94DA',
  },
  ESTP: { 
    icon: carpenter,
    picture: carpenterWithBg,
    color: '#EABF4B',
  },
  ESFJ: { 
    icon: showman,
    picture: showmanWithBg,
    color: '#3E94DA',
  },
  ESFP: { 
    icon: clown,
    picture: clownWithBg,
    color: '#EABF4B',
  },
  ENTJ: { 
    icon: manager,
    picture: managerWithBg,
    color: '#9C2B87',
  },
  ENTP: { 
    icon: politician,
    picture: politicianWithBg,
    color: '#9C2B87',
  },
  ENFJ: { 
    icon: pensioner,
    picture: pensionerWithBg,
    color: '#3E9C2B',
  },
  ENFP: { 
    icon: athlete,
    picture: athleteWithBg,
    color: '#3E9C2B',
  },
  ISTJ: { 
    icon: support,
    picture: supportWithBg,
    color: '#3E94DA',
  },
  ISTP: { 
    icon: mechanic,
    picture: mechanicWithBg,
    color: '#EABF4B',
  },
  ISFJ: { 
    icon: nurse,
    picture: nurseWithBg,
    color: '#3E94DA',
  },
  ISFP: { 
    icon: singer,
    picture: singerWithBg,
    color: '#EABF4B',
  },
  INTJ: { 
    icon: postman,
    picture: postmanWithBg,
    color: '#9C2B87',
  },
  INTP: { 
    icon: scientist,
    picture: scientistWithBg,
    color: '#9C2B87',
  },
  INFJ: { 
    icon: photographer,
    picture: photographerWithBg,
    color: '#3E9C2B',
  },
  INFP: { 
    icon: magician,
    picture: magicianWithBg,
    color: '#3E9C2B',
  },
}
