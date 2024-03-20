import { Lang } from 'src/utils/lang/Lang'
import { UiText, UiValues } from 'src/utils/lang/UiText'
import AppLangEnum = Lang.AppLangEnum




export const ActionUiText = {
  
  
  ok: [
    {
      value: 'ok',
      lang: AppLangEnum.eng,
      text: 'Ok',
    }, {
      value: 'ok',
      lang: AppLangEnum.rus,
      text: 'Ок',
    },
  ] satisfies UiText<'ok'>[],
  
  
  remove: [
    {
      value: 'remove',
      lang: AppLangEnum.eng,
      text: 'Remove',
    }, {
      value: 'remove',
      lang: AppLangEnum.rus,
      text: 'Удалить',
    },
  ] satisfies UiText<'remove'>[],
  
  
  replace: [
    {
      value: 'replace',
      lang: AppLangEnum.eng,
      text: 'Replace',
    }, {
      value: 'replace',
      lang: AppLangEnum.rus,
      text: 'Заменить',
    },
  ] satisfies UiText<'replace'>[],
  
  
  download: [
    {
      value: 'download',
      lang: AppLangEnum.eng,
      text: 'Download',
    }, {
      value: 'download',
      lang: AppLangEnum.rus,
      text: 'Скачать',
    },
  ] satisfies UiText<'download'>[],
  
  
  fullScreenView: [
    {
      value: 'fullScreenView',
      lang: AppLangEnum.eng,
      text: 'Fullscreen view',
    }, {
      value: 'fullScreenView',
      lang: AppLangEnum.rus,
      text: 'В полный экран',
    },
  ] satisfies UiText<'fullScreenView'>[],
  
  save: [
    {
      value: 'save',
      lang: AppLangEnum.eng,
      text: 'Save',
    }, {
      value: 'save',
      lang: AppLangEnum.rus,
      text: 'Сохранить',
    },
  ] satisfies UiText<'save'>[],
  saving: [
    {
      value: 'saving',
      lang: AppLangEnum.eng,
      text: 'Saving',
    }, {
      value: 'saving',
      lang: AppLangEnum.rus,
      text: 'Сохранение',
    },
  ] satisfies UiText<'saving'>[],
  saved: [
    {
      value: 'saved',
      lang: AppLangEnum.eng,
      text: 'Saved',
    }, {
      value: 'saved',
      lang: AppLangEnum.rus,
      text: 'Сохранено',
    },
  ] satisfies UiText<'saved'>[],
  
  cancel: [
    {
      value: 'cancel',
      lang: AppLangEnum.eng,
      text: 'Cancel',
    }, {
      value: 'cancel',
      lang: AppLangEnum.rus,
      text: 'Отменить',
    },
  ] satisfies UiText<'cancel'>[],
  
  
} satisfies UiValues