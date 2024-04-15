import { Lang } from '@util/lang/Lang.ts'
import { UiText, UiValues } from '@util/ui-text/UiText.ts'
import AppLangEnum = Lang.AppLangEnum




export const TitleUiText = {
  
  
  
  profile: [
    {
      value: 'profile',
      lang: AppLangEnum.eng,
      text: 'Profile',
    },{
      value: 'profile',
      lang: AppLangEnum.rus,
      text: 'Профиль',
    },
  ] satisfies UiText<'profile'>[],
  
  chat: [
    {
      value: 'chat',
      lang: AppLangEnum.eng,
      text: 'Chat',
    },{
      value: 'chat',
      lang: AppLangEnum.rus,
      text: 'Чат',
    },
  ] satisfies UiText<'chat'>[],
  
  findCouples: [
    {
      value: 'findCouples',
      lang: AppLangEnum.eng,
      text: 'Find couples',
    },{
      value: 'findCouples',
      lang: AppLangEnum.rus,
      text: 'Найти пары',
    },
  ] as UiText<'findCouples'>[],
  
  advices: [
    {
      value: 'advices',
      lang: AppLangEnum.eng,
      text: 'Advice',
    },{
      value: 'advices',
      lang: AppLangEnum.rus,
      text: 'Советы',
    },
  ] as UiText<'advices'>[],
  
  bowAndArrows: [
    {
      value: 'bowAndArrows',
      lang: AppLangEnum.eng,
      text: 'Bow and arrows',
    },{
      value: 'bowAndArrows',
      lang: AppLangEnum.rus,
      text: 'Лук и стрелы',
    },
  ] as UiText<'bowAndArrows'>[],
  
  settings: [
    {
      value: 'settings',
      lang: AppLangEnum.eng,
      text: 'Settings',
    },{
      value: 'settings',
      lang: AppLangEnum.rus,
      text: 'Настройки',
    },
  ] satisfies UiText<'settings'>[],
  
  
  
} satisfies UiValues