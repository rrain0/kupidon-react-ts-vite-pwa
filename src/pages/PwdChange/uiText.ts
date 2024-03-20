import { Lang } from 'src/utils/lang/Lang'
import { CommonUiText } from 'src/utils/lang/ui-values/CommonUiText'
import { UiText, UiValues } from 'src/utils/lang/UiText'
import AppLangEnum = Lang.AppLangEnum




export const PwdChangeUiText = {
  
  changePwd: CommonUiText.changePwd,
  
  
  reset: CommonUiText.reset,
  
  doChangePwd: CommonUiText.doChangePwd,
  pwdRecovery: CommonUiText.pwdRecovery,
  
  
  currentPwd: CommonUiText.currentPwd,
  currentPwdPlaceholder: CommonUiText.currentPwdPlaceholder,
  newPwd: CommonUiText.newPwd,
  newPwdPlaceholder: CommonUiText.newPwdPlaceholder,
  repeatPwd: CommonUiText.repeatPwd,
  repeatPwdPlaceholder: CommonUiText.repeatPwdPlaceholder,
  
  
  update: CommonUiText.update,
  updated: CommonUiText.updated,
  
  
  
  currentPwdNotEntered: [
    {
      value: 'currentPwdNotEntered',
      lang: AppLangEnum.eng,
      text: 'Current password not entered',
    },{
      value: 'currentPwdNotEntered',
      lang: AppLangEnum.rus,
      text: 'Текущий пароль не введён',
    },
  ] satisfies UiText<'currentPwdNotEntered'>[],
  currentPwdMaxLenIs200: [
    {
      value: 'currentPwdMaxLenIs200',
      lang: AppLangEnum.eng,
      text: 'Current password max length is 200 chars',
    },{
      value: 'currentPwdMaxLenIs200',
      lang: AppLangEnum.rus,
      text: 'Максимальная длина текущего пароля - 200 символов',
    },
  ] satisfies UiText<'currentPwdMaxLenIs200'>[],
  pwdIsNotEntered: CommonUiText.pwdNotEntered,
  pwdFormatIsIncorrect: CommonUiText.pwdFormatIsIncorrect,
  pwdMaxLenIs200: CommonUiText.pwdMaxLenIs200,
  passwordsDoNotMatch: CommonUiText.passwordsDoNotMatch,
  invalidPwd: [
    {
      value: 'invalidPwd',
      lang: AppLangEnum.eng,
      text: 'Wrong password',
    },{
      value: 'invalidPwd',
      lang: AppLangEnum.rus,
      text: 'Неправильный пароль',
    },
  ] satisfies UiText<'invalidPwd'>[],
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
  
} satisfies UiValues