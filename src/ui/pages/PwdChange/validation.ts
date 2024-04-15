import { UserApi } from 'src/api/requests/UserApi.ts'
import { ValidationValidators } from '@util/form-validation/ValidationValidators.ts'
import { ValidationCore } from '@util/form-validation/ValidationCore.ts'
import { UiTextValues } from '@util/ui-text/UiText.ts'
import { ErrorUiText } from 'src/ui/ui-values/ErrorUiText.ts'
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData



export namespace PwdChangePageValidation {
  
  
  type SeverErrorCode = UpdateUserErrorData['code']
  
  
  type FailureCode =
    | 'current-pwd-required'
    | 'current-pwd-too-long'
    
    | 'pwd-required'
    | 'pwd-incorrect'
    | 'pwd-too-long'
    
    | 'repeated-pwd-required'
    | 'repeated-pwd-not-match'
    
    | "INVALID_PWD"
    
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'current-pwd-required': ErrorUiText.currentPwdNotEntered,
    'current-pwd-too-long': ErrorUiText.currentPwdMaxLenIs200,
    'pwd-required': ErrorUiText.pwdIsNotEntered,
    'pwd-incorrect': ErrorUiText.pwdFormatIsIncorrect,
    'pwd-too-long': ErrorUiText.pwdMaxLenIs200,
    'repeated-pwd-required': ErrorUiText.repeatPwd,
    'repeated-pwd-not-match': ErrorUiText.passwordsDoNotMatch,
    "INVALID_PWD": ErrorUiText.wrongPwd,
    'connection-error': ErrorUiText.connectionError,
    'unknown-error': ErrorUiText.unknownError,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    currentPwd: string
    pwd: string
    repeatPwd: string
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
    currentPwd: '',
    pwd: '',
    repeatPwd: '',
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
    
    
    
    [['currentPwd'], (values)=>{
      const [v] = values as [UserValues['currentPwd']]
      const d = defaultValues.currentPwd
      if (v===d) return new PartialFailureData({
        code: 'current-pwd-required' satisfies FailureCode,
        msg: 'Current password is not entered',
        type: 'default',
      })
    }],
    [['currentPwd'], (values)=>{
      const [v] = values as [UserValues['currentPwd']]
      if (v.length>200) return new PartialFailureData({
        code: 'current-pwd-too-long' satisfies FailureCode,
        msg: 'Current password max length is 200',
        delay,
      })
    }],
    
    
    
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      const d = defaultValues.pwd
      if (v===d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Password is not entered',
        type: 'default',
      })
    }],
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      if (!isValidPwd(v)) return new PartialFailureData({
        code: 'pwd-incorrect' satisfies FailureCode,
        msg: 'Password minimum length is 6 chars',
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
    
    
    
    
    [['repeatPwd'], (values)=>{
      const [v] = values as [UserValues['repeatPwd']]
      const d = defaultValues.repeatPwd
      if (v===d) return new PartialFailureData({
        code: 'repeated-pwd-required' satisfies FailureCode,
        msg: 'Repeat password',
        type: 'default',
      })
    }],
    [['pwd','repeatPwd'], (values)=>{
      const [pwd,repeatPwd] = values as [UserValues['pwd'],UserValues['repeatPwd']]
      if(pwd!==repeatPwd) return new PartialFailureData({
        code: 'repeated-pwd-not-match' satisfies FailureCode,
        msg: 'Passwords do not match',
        delay,
        errorFields: ['repeatPwd'],
      })
    }],
    
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==="INVALID_PWD") return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Wrong password',
        errorFields: ['fromServer','currentPwd'],
        type: 'server',
      })
    }],
    
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Server connection error, it may be an internet error',
        type: 'server',
      })
    }],
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v) return new PartialFailureData({
        code: 'unknown-error' satisfies FailureCode,
        msg: 'Unknown error',
        extra: v,
        type: 'server',
      })
    }],
    
  ]
  
}




