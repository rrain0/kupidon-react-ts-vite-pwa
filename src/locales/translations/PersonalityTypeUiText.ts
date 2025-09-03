
import { MbtiType } from 'src/models/MbtiType.ts'
import { UiValues } from '@libs/ui-text/UiText.ts'
import { RecordRo } from '@utils/base/TypeUtils.ts'



// TODO MBTI remove
export const PersonalityTypeUiText = {
  ESTJ: {
    name: {
      'ru-RU': 'Менеджер',
    },
  },
  ESTP: {
    name: {
      'ru-RU': 'Делец',
    },
  },
  ESFJ: {
    name: {
      'ru-RU': 'Консул',
    },
  },
  ESFP: {
    name: {
      'ru-RU': 'Развлекатель',
    },
  },
  ENTJ: {
    name: {
      'ru-RU': 'Командир',
    },
  },
  ENTP: {
    name: {
      'ru-RU': 'Полемист',
    },
  },
  ENFJ: {
    name: {
      'ru-RU': 'Тренер',
    },
  },
  ENFP: {
    name: {
      'ru-RU': 'Борец',
    },
  },
  ISTJ: {
    name: {
      'ru-RU': 'Администратор',
    },
  },
  ISTP: {
    name: {
      'ru-RU': 'Виртуоз',
    },
  },
  ISFJ: {
    name: {
      'ru-RU': 'Защитник',
    },
  },
  ISFP: {
    name: {
      'ru-RU': 'Артист',
    },
  },
  INTJ: {
    name: {
      'ru-RU': 'Стратег',
    },
  },
  INTP: {
    name: {
      'ru-RU': 'Учёный',
    },
  },
  INFJ: {
    name: {
      'ru-RU': 'Активист',
    },
  },
  INFP: {
    name: {
      'ru-RU': 'Посредник',
    },
  },
} satisfies RecordRo<MbtiType, UiValues<'name'>>