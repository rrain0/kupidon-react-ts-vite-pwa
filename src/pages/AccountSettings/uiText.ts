import { Lang } from 'src/utils/lang/Lang'
import { CommonUiText } from 'src/utils/lang/ui-values/CommonUiText'
import { UiText, UiValues } from 'src/utils/lang/UiText'
import AppLangEnum = Lang.AppLangEnum




export const AccountSettingsUiText = {
  
  account: CommonUiText.account,
  
  id: [
    {
      value: 'id',
      lang: AppLangEnum.eng,
      text: 'id',
    },
  ] satisfies UiText<'id'>[],
  
  
  email: [
    {
      value: 'email',
      lang: AppLangEnum.eng,
      text: 'Email',
    },
  ] satisfies UiText<'email'>[],
  
  
  emailVerified: [
    {
      value: 'emailVerified',
      lang: AppLangEnum.eng,
      text: 'Email verified',
    },{
      value: 'emailVerified',
      lang: AppLangEnum.rus,
      text: 'Email верифицирован',
    },
  ] satisfies UiText<'emailVerified'>[],
  
  
  yes: CommonUiText.yes,
  no: CommonUiText.no,
  reset: CommonUiText.reset,
  
  
  newPwd: CommonUiText.newPwd,
  newPwdPlaceholder: CommonUiText.newPwdPlaceholder,
  repeatPwd: CommonUiText.repeatPwd,
  repeatPwdPlaceholder: CommonUiText.repeatPwdPlaceholder,
  
  
  update: CommonUiText.update,
  updated: CommonUiText.updated,
  
  userCreated: [
    {
      value: 'userCreated',
      lang: AppLangEnum.eng,
      text: 'User created',
    },{
      value: 'userCreated',
      lang: AppLangEnum.rus,
      text: 'Пользователь создан',
    },
  ] satisfies UiText<'userCreated'>[],
  
  
  userUpdated: [
    {
      value: 'userUpdated',
      lang: AppLangEnum.eng,
      text: 'User updated',
    },{
      value: 'userUpdated',
      lang: AppLangEnum.rus,
      text: 'Пользователь обновлён',
    },
  ] satisfies UiText<'userUpdated'>[],
  
  
  pwdIsNotEntered: CommonUiText.pwdNotEntered,
  pwdFormatIsIncorrect: CommonUiText.pwdFormatIsIncorrect,
  pwdMaxLenIs200: CommonUiText.pwdMaxLenIs200,
  passwordsDoNotMatch: CommonUiText.passwordsDoNotMatch,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  changePwd: CommonUiText.changePwd,
  logOutFromAccount: CommonUiText.logOutFromAccount,
  deleteAccount: CommonUiText.deleteAccount,
  
  
} satisfies UiValues