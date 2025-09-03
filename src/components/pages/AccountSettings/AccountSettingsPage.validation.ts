import { UserApi } from 'src/services/api/requests/UserApi'
import { ValidationU } from 'src/mini-libs/form-data/core/ValidationU.ts'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { ErrorUiText } from 'src/locales/translations/ErrorUiText.ts'
import Validators = ValidationCore.Validators
import isValidPwd = ValidationU.isValidPwd
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData



export namespace AccountSettingsPageValidation {
  
  
  import createValidator = ValidationCore.createValidator
  type SeverErrorCode = UpdateUserErrorData['code']
  
  
  type FailureCode =
    | 'pwd-not-changed'
    | 'pwd-required'
    | 'pwd-incorrect'
    | 'pwd-too-long'
    
    | 'repeat-pwd-not-changed'
    | 'repeated-pwd-required'
    | 'repeated-pwd-not-match'
    
    | 'CONNECTION_ERROR'
    | 'UNKNOWN_ERROR'
  
  
  
  export const mapFailureCodeToUiText = {
    'pwd-not-changed': { 'en-US': 'pwd-not-changed' },
    'pwd-required': ErrorUiText.pwdIsNotEntered,
    'pwd-incorrect': ErrorUiText.pwdFormatIsIncorrect,
    'pwd-too-long': ErrorUiText.pwdMaxLenIs200,
    'repeat-pwd-not-changed': { 'en-US': 'repeat-pwd-not-changed' },
    'repeated-pwd-required': ErrorUiText.repeatPwd,
    'repeated-pwd-not-match': ErrorUiText.passwordsDoNotMatch,
    'CONNECTION_ERROR': ErrorUiText.CONNECTION_ERROR,
    'UNKNOWN_ERROR': ErrorUiText.UNKNOWN_ERROR,
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
    
    
    
    createValidator(['pwd', 'initialValues'], ([v, ivs]) => {
      //console.log('v:',v,'ivs:',ivs)
      if (v === ivs.pwd) return new PartialFailureData({
        code: 'pwd-not-changed' satisfies FailureCode,
        msg: 'Password not changed',
        type: 'initial',
        errorFields: ['pwd'],
      })
    }),
    createValidator(['pwd'], ([v]) => {
      const d = defaultValues.pwd
      if (v === d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        type: 'default',
      })
    }),
    createValidator(['pwd'], ([v]) => {
      if (!isValidPwd(v)) return new PartialFailureData({
        code: 'pwd-incorrect' satisfies FailureCode,
        msg: 'Пароль должен быть не короче 6 символов',
        delay,
      })
    }),
    createValidator(['pwd'], ([v]) => {
      if (v.length>200) return new PartialFailureData({
        code: 'pwd-too-long' satisfies FailureCode,
        msg: 'Password max length is 200',
        delay,
      })
    }),
    
    
    
    createValidator(['repeatPwd', 'initialValues'], ([v, ivs]) => {
      //console.log('v:',v,'ivs:',ivs)
      if (v === ivs.repeatPwd) return new PartialFailureData({
        code: 'repeat-pwd-not-changed' satisfies FailureCode,
        msg: 'Repeated password not changed',
        type: 'initial',
        errorFields: ['repeatPwd'],
      })
    }),
    createValidator(['repeatPwd'], ([v]) => {
      const d = defaultValues.repeatPwd
      if (v === d) return new PartialFailureData({
        code: 'repeated-pwd-required' satisfies FailureCode,
        msg: 'Повторите пароль',
        type: 'default',
      })
    }),
    createValidator(['pwd', 'repeatPwd'], ([pwd, repeatPwd]) => {
      if (pwd !== repeatPwd) return new PartialFailureData({
        code: 'repeated-pwd-not-match' satisfies FailureCode,
        msg: 'Пароли не совпадают',
        delay,
        errorFields: ['repeatPwd'],
      })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'CONNECTION_ERROR') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        type: 'server',
      })
    }),
    createValidator(['fromServer'], ([v]) => {
      if (v) return new PartialFailureData({
        code: 'UNKNOWN_ERROR' satisfies FailureCode,
        msg: 'Неизвестная ошибка',
        extra: v,
        type: 'server',
      })
    }),
    
  ]
  
}




