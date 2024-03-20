import { CommonUiText } from 'src/utils/lang/ui-values/CommonUiText'
import { UiText, UiValues } from 'src/utils/lang/UiText'



export const BottomNavBarUiText = {
  
  
  profile: CommonUiText.profile,
  
  
  chat: CommonUiText.chat,
  
  
  findCouples: [
    {
      value: 'findCouples',
      lang: 'en-US',
      text: 'Find couples',
    },{
      value: 'findCouples',
      lang: 'ru-RU',
      text: 'Найти пары',
    },
  ] as UiText<'findCouples'>[],
  
  
  advices: [
    {
      value: 'advices',
      lang: 'en-US',
      text: 'Advice',
    },{
      value: 'advices',
      lang: 'ru-RU',
      text: 'Советы',
    },
  ] as UiText<'advices'>[],
  
  
  bowAndArrows: [
    {
      value: 'bowAndArrows',
      lang: 'en-US',
      text: 'Bow and arrows',
    },{
      value: 'bowAndArrows',
      lang: 'ru-RU',
      text: 'Лук и стрелы',
    },
  ] as UiText<'bowAndArrows'>[],
  
  
  settings: CommonUiText.settings,
  
  
  
  
} satisfies UiValues