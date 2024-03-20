import { UserApi } from 'src/api/requests/UserApi'
import { AccountSettingsUiText } from 'src/pages/AccountSettings/uiText'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText, UiTextValues, UiValues } from 'src/utils/lang/UiText'
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData



export namespace AccountSettingsPageValidation {
  
  
  type SeverErrorCode = UpdateUserErrorData['code']
  
  
  type FailureCode =
    | 'pwd-not-changed'
    | 'pwd-required'
    | 'pwd-incorrect'
    | 'pwd-too-long'
    
    | 'repeat-pwd-not-changed'
    | 'repeated-pwd-required'
    | 'repeated-pwd-not-match'
    
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'pwd-not-changed': [],
    'pwd-required': AccountSettingsUiText.pwdIsNotEntered,
    'pwd-incorrect': AccountSettingsUiText.pwdFormatIsIncorrect,
    'pwd-too-long': AccountSettingsUiText.pwdMaxLenIs200,
    'repeat-pwd-not-changed': [],
    'repeated-pwd-required': AccountSettingsUiText.repeatPwd,
    'repeated-pwd-not-match': AccountSettingsUiText.passwordsDoNotMatch,
    'connection-error': AccountSettingsUiText.connectionError,
    'unknown-error': AccountSettingsUiText.unknownError,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    pwd: string
    repeatPwd: string
  }
  export type FromServerValue = {
    values: UserValues // значения, отправленные на сервердля проверки
    error: { // ошибка с сервера
      code: SeverErrorCode
      msg?: string | undefined
      extra?: any | undefined
    }
  }
  export type AuxiliaryValues = {
    fromServer: undefined | FromServerValue
    initialValues: UserValues
  }
  export type FormValues = UserValues & AuxiliaryValues
  
  
  
  export const userDefaultValues: UserValues = {
    pwd: '',
    repeatPwd: '',
  }
  export const auxiliaryDefaultValues: AuxiliaryValues = {
    fromServer: undefined,
    initialValues: userDefaultValues,
  }
  export const defaultValues: FormValues = {
    ...userDefaultValues,
    ...auxiliaryDefaultValues,
  }
  
  
  
  const delay = 4000
  
  export const validators: Validators<FormValues> = [
    
    
    
    [['pwd','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['pwd'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.pwd) return new PartialFailureData({
        code: 'pwd-not-changed' satisfies FailureCode,
        msg: 'Password not changed',
        type: 'initial',
        errorFields: ['pwd'],
      })
    }],
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      const d = defaultValues.pwd
      if (v===d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        type: 'default',
      })
    }],
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      if (!isValidPwd(v)) return new PartialFailureData({
        code: 'pwd-incorrect' satisfies FailureCode,
        msg: 'Пароль должен быть не короче 6 символов',
        delay,
      })
    }],
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      if (v.length>200) return new PartialFailureData({
        code: 'pwd-too-long' satisfies FailureCode,
        msg: 'Password max length is 200',
        delay,
      })
    }],
    
    
    
    [['repeatPwd','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['repeatPwd'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.repeatPwd) return new PartialFailureData({
        code: 'repeat-pwd-not-changed' satisfies FailureCode,
        msg: 'Repeated password not changed',
        type: 'initial',
        errorFields: ['repeatPwd'],
      })
    }],
    [['repeatPwd'], (values)=>{
      const [v] = values as [UserValues['repeatPwd']]
      const d = defaultValues.repeatPwd
      if (v===d) return new PartialFailureData({
        code: 'repeated-pwd-required' satisfies FailureCode,
        msg: 'Повторите пароль',
        type: 'default',
      })
    }],
    [['pwd','repeatPwd'], (values)=>{
      const [pwd,repeatPwd] = values as [UserValues['pwd'],UserValues['repeatPwd']]
      if(pwd!==repeatPwd) return new PartialFailureData({
        code: 'repeated-pwd-not-match' satisfies FailureCode,
        msg: 'Пароли не совпадают',
        delay,
        errorFields: ['repeatPwd'],
      })
    }],
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        type: 'server',
      })
    }],
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v) return new PartialFailureData({
        code: 'unknown-error' satisfies FailureCode,
        msg: 'Неизвестная ошибка',
        extra: v,
        type: 'server',
      })
    }],
    
  ]
  
}




