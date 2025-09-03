import { AuthApi } from 'src/api/requests/AuthApi'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { ErrorUiText } from 'src/locales/translations/ErrorUiText.ts'
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import LoginErrorData = AuthApi.LoginErrorData
import createValidator = ValidationCore.createValidator



export namespace AutologinPageValidation {
  
  
  type SeverErrorCode = LoginErrorData['code']
  
  
  type FailureCode =
    | 'account-name-required'
    | 'account-name-unsupported'
    | 'NO_USER'
    | 'CONNECTION_ERROR'
    | 'UNKNOWN_ERROR'
  
  
  
  export const mapFailureCodeToUiText = {
    'account-name-required': ErrorUiText.accountNameIsAbsent,
    'account-name-unsupported': ErrorUiText.accountIsUnsupported,
    'NO_USER': ErrorUiText.noUserWithSuchLoginPwd,
    'CONNECTION_ERROR': ErrorUiText.CONNECTION_ERROR,
    'UNKNOWN_ERROR': ErrorUiText.UNKNOWN_ERROR,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    accountName: string
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
    accountName: '',
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
    createValidator(['accountName'], ([v]) => {
      const d = defaultValues.accountName
      if (v === d) return new PartialFailureData({
        code: 'account-name-required' satisfies FailureCode,
        msg: 'Account name is empty',
        type: 'default',
      })
    }),
    createValidator(['accountName'], ([v]) => {
      const allowedAccounts = ['test']
      if (!allowedAccounts.includes(v)) return new PartialFailureData({
        code: 'account-name-unsupported' satisfies FailureCode,
        msg: 'Account name unsupported',
        delay,
      })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'User not found',
        errorFields: ['fromServer', 'accountName'],
        type: 'server',
      })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'CONNECTION_ERROR') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Error connecting to the server, maybe something wrong with the internet',
        type: 'server',
      })
    }),
    createValidator(['fromServer'], ([v]) => {
      if (v) return new PartialFailureData({
        code: 'UNKNOWN_ERROR' satisfies FailureCode,
        msg: 'Unknown error',
        extra: v,
        type: 'server',
      })
    }),
    
  ]
  
  
}



