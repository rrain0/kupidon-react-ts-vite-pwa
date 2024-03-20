import { LoginPageUiText } from 'src/pages/Login/uiText'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { AuthApi } from 'src/api/requests/AuthApi'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText, UiTextValues, UiValues } from 'src/utils/lang/UiText'
import isValidEmail = ValidationValidators.isValidEmail
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import LoginErrorData = AuthApi.LoginErrorData



export namespace LoginPageValidation {
  
  
  type SeverErrorCode = LoginErrorData['code']
  
  
  type FailureCode = 'login-required'
    | 'login-incorrect'
    | 'pwd-required'
    | 'NO_USER'
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'login-required': LoginPageUiText.loginNotEntered,
    'login-incorrect': LoginPageUiText.loginFormatIsIncorrect,
    'pwd-required': LoginPageUiText.pwdNotEntered,
    'NO_USER': LoginPageUiText.noUserWithSuchLoginPwd,
    'connection-error': LoginPageUiText.connectionError,
    'unknown-error': LoginPageUiText.unknownError,
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
    [['login'], (values)=>{
      const [v] = values as [UserValues['login']]
      const d = defaultValues.login
      if (v===d) return new PartialFailureData({
        code: 'login-required' satisfies FailureCode,
        msg: 'Email не введён',
        type: 'default',
      })
    }],
    [['login'], (values)=>{
      const [v] = values as [UserValues['login']]
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'login-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay,
      })
    }],
    
    
    
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      const d = defaultValues.login
      if (v===d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        type: 'default',
      })
    }],
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким логином-паролем',
        errorFields: ['fromServer','login','pwd'],
        type: 'server',
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



