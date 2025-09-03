import { ValidationU } from 'src/mini-libs/form-data/core/ValidationU.ts'
import { AuthApi } from 'src/api/requests/AuthApi'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { ErrorUiText } from 'src/locales/translations/ErrorUiText.ts'
import isValidEmail = ValidationU.isValidEmail
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import LoginErrorData = AuthApi.LoginErrorData
import createValidator = ValidationCore.createValidator



export namespace LoginPageValidation {
  
  
  type SeverErrorCode = LoginErrorData['code']
  
  
  type FailureCode =
    | 'login-required'
    | 'login-incorrect'
    | 'pwd-required'
    | 'NO_USER'
    | 'CONNECTION_ERROR'
    | 'UNKNOWN_ERROR'
  
  
  
  export const mapFailureCodeToUiText = {
    'login-required': ErrorUiText.loginIsNotEntered,
    'login-incorrect': ErrorUiText.loginFormatIsIncorrect,
    'pwd-required': ErrorUiText.pwdIsNotEntered,
    'NO_USER': ErrorUiText.noUserWithSuchLoginPwd,
    'CONNECTION_ERROR': ErrorUiText.CONNECTION_ERROR,
    'UNKNOWN_ERROR': ErrorUiText.UNKNOWN_ERROR,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    login: string
    pwd: string
  }
  export type FromServerValue = {
    values: UserValues // значения, отправленные на сервер для проверки
    error: { // ошибка с сервера
      code: SeverErrorCode
      msg?: string | undefined
      extra?: any | undefined
    }
  }
  export type AuxiliaryValues = {
    fromServer: undefined | FromServerValue
  }
  export type FormValues = UserValues & AuxiliaryValues
  
  
  
  export const userDefaultValues: UserValues = {
    login: '',
    pwd: '',
  }
  export const auxiliaryDefaultValues: AuxiliaryValues = {
    fromServer: undefined,
  }
  export const defaultValues: FormValues = {
    ...userDefaultValues,
    ...auxiliaryDefaultValues,
  }
  
  
  
  
  const delay = 4000
  
  export const validators: Validators<FormValues> = [
    createValidator(['login'], ([v]) => {
      const d = defaultValues.login
      if (v === d) return new PartialFailureData({
        code: 'login-required' satisfies FailureCode,
        msg: 'Email не введён',
        type: 'default',
      })
    }),
    createValidator(['login'], ([v]) => {
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'login-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay,
      })
    }),
    
    
    
    createValidator(['pwd'], ([v]) => {
      const d = defaultValues.login
      if (v === d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        type: 'default',
      })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким логином-паролем',
        errorFields: ['fromServer', 'login', 'pwd'],
        type: 'server',
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



