import { Lang } from 'src/utils/lang/Lang'
import { UiText, UiTextValues } from 'src/utils/lang/UiText'
import { AllThemeNamesType } from 'src/utils/theme/ThemeCollection'
import AppLangEnum = Lang.AppLangEnum




export const ThemeNameUiText = {
  
  
  'Light Simple': [
    {
      value: 'Light Simple',
      lang: AppLangEnum.eng,
      text: 'Light',
    },{
      value: 'Light Simple',
      lang: AppLangEnum.rus,
      text: 'Светлая',
    },
  ] satisfies UiText<'Light Simple'>[],
  
  
  'Dark Simple': [
    {
      value: 'Dark Simple',
      lang: AppLangEnum.eng,
      text: 'Dark',
    },{
      value: 'Dark Simple',
      lang: AppLangEnum.rus,
      text: 'Тёмная',
    },
  ] satisfies UiText<'Dark Simple'>[],
  
  
  'Light Simple Pink': [
    {
      value: 'Light Simple Pink',
      lang: AppLangEnum.eng,
      text: 'Light Simple Pink',
    },{
      value: 'Light Simple Pink',
      lang: AppLangEnum.rus,
      text: 'Светлая с розовым',
    },
  ] satisfies UiText<'Light Simple Pink'>[],
  
  
  'Dark Simple Pink': [
    {
      value: 'Dark Simple Pink',
      lang: AppLangEnum.eng,
      text: 'Dark Simple Pink',
    },{
      value: 'Dark Simple Pink',
      lang: AppLangEnum.rus,
      text: 'Тёмная с розовым',
    },
  ] satisfies UiText<'Dark Simple Pink'>[],
  
  
  'Light Pink': [
    {
      value: 'Light Pink',
      lang: AppLangEnum.eng,
      text: 'Light Pink',
    },{
      value: 'Light Pink',
      lang: AppLangEnum.rus,
      text: 'Светлая Розовая',
    },
  ] satisfies UiText<'Light Pink'>[],
  
  
  'Dark Pink': [
    {
      value: 'Dark Pink',
      lang: AppLangEnum.eng,
      text: 'Dark Pink',
    },{
      value: 'Dark Pink',
      lang: AppLangEnum.rus,
      text: 'Тёмная Розовая',
    },
  ] satisfies UiText<'Dark Pink'>[],
  
  
  'Light Pink Gradient': [
    {
      value: 'Light Pink Gradient',
      lang: AppLangEnum.eng,
      text: 'Light Pink Gradient',
    },{
      value: 'Light Pink Gradient',
      lang: AppLangEnum.rus,
      text: 'Светлая Розовая Градиент',
    },
  ] satisfies UiText<'Light Pink Gradient'>[],
  
  
  'Dark Pink Gradient': [
    {
      value: 'Dark Pink Gradient',
      lang: AppLangEnum.eng,
      text: 'Dark Pink Gradient',
    },{
      value: 'Dark Pink Gradient',
      lang: AppLangEnum.rus,
      text: 'Тёмная розовая Градиент',
    },
  ] satisfies UiText<'Dark Pink Gradient'>[],
  
  
  'Light Orange': [
    {
      value: 'Light Orange',
      lang: AppLangEnum.eng,
      text: 'Light Orange',
    },{
      value: 'Light Orange',
      lang: AppLangEnum.rus,
      text: 'Светлая Оранжевая',
    },
  ] satisfies UiText<'Light Orange'>[],
  
  
  'Dark Orange': [
    {
      value: 'Dark Orange',
      lang: AppLangEnum.eng,
      text: 'Dark Orange',
    },{
      value: 'Dark Orange',
      lang: AppLangEnum.rus,
      text: 'Тёмная Оранжевая',
    },
  ] satisfies UiText<'Dark Orange'>[],
  
  
  
} satisfies UiTextValues<AllThemeNamesType>