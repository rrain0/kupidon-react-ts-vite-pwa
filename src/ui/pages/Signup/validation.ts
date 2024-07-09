import { Gender } from 'src/api/model/Gender.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { DateTime } from '@util/DateTime.ts'
import { ValidationValidators } from '@util/mini-libs/form-validation/core/ValidationValidators.ts'
import { ValidationCore } from '@util/mini-libs/form-validation/core/ValidationCore.ts'
import { UiTextValues } from 'src/util/mini-libs/ui-text/UiText.ts'
import { ErrorUiText } from 'src/ui-data/translations/ErrorUiText.ts'
import isValidEmail = ValidationValidators.isValidEmail
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import PartialFailureData = ValidationCore.PartialFailureData
import CreateErrorData = UserApi.CreateErrorData



export namespace SignupPageValidation {
  
  
  type SeverErrorCode = CreateErrorData['code']
  
  
  type FailureCode =
    'email-required'
    | 'email-incorrect'
    | 'email-too-long'
    
    | 'pwd-required'
    | 'pwd-incorrect'
    | 'pwd-too-long'
    
    | 'repeated-pwd-required'
    | 'repeated-pwd-not-match'
    
    | 'name-required'
    | 'name-too-long'
    
    | 'gender-required'
    
    | 'birth-date-required'
    | 'birth-date-incorrect-format'
    | 'birth-date-not-exists'
    | 'birth-date-younger-18'
    
    | "DUPLICATE_EMAIL"
    
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'email-required': ErrorUiText.emailIsNotEntered,
    'email-incorrect': ErrorUiText.emailFormatIsIncorrect,
    'email-too-long': ErrorUiText.emailMaxLenIs100,
    'pwd-required': ErrorUiText.pwdIsNotEntered,
    'pwd-incorrect': ErrorUiText.pwdFormatIsIncorrect,
    'pwd-too-long': ErrorUiText.pwdMaxLenIs200,
    'repeated-pwd-required': ErrorUiText.repeatPwd,
    'repeated-pwd-not-match': ErrorUiText.passwordsDoNotMatch,
    'name-required': ErrorUiText.nameIsNotEntered,
    'name-too-long': ErrorUiText.nameMaxLenIs100,
    'gender-required': ErrorUiText.genderIsNotChosen,
    'birth-date-required': ErrorUiText.birthDateIsNotEntered,
    'birth-date-incorrect-format': ErrorUiText.birthDateHasIncorrectFormat,
    'birth-date-not-exists': ErrorUiText.dateNotExists,
    'birth-date-younger-18': ErrorUiText.youMustBeAtLeast18YearsOld,
    "DUPLICATE_EMAIL": ErrorUiText.userWithSuchEmailAlreadyRegistered,
    'connection-error': ErrorUiText.connectionError,
    'unknown-error': ErrorUiText.unknownError,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    email: string
    pwd: string
    repeatPwd: string
    name: string
    gender: Gender|''
    birthDate: string // 2002-01-01 1999-12-31
    //notRobot: boolean
    //form: LoginRespE['data']['code'] | 'connection-error'|'unknown'|undefined
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
  }
  export type FormValues = UserValues & AuxiliaryValues
  
  
  
  export const userDefaultValues: UserValues = {
    email: '',
    pwd: '',
    repeatPwd: '',
    name: '',
    gender: '',
    birthDate: '',
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
    
    [['email'], (values)=>{
      const [v] = values as [UserValues['email']]
      const d = defaultValues.email
      if (v===d) return new PartialFailureData({
        code: 'email-required' satisfies FailureCode,
        msg: 'Email не введён',
        type: 'default',
      })
    }],
    [['email'], (values)=>{
      const [v] = values as [UserValues['email']]
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'email-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay,
      })
    }],
    [['email'], (values)=>{
      const [v] = values as [UserValues['email']]
      if (v.length>100) return new PartialFailureData({
        code: 'email-too-long' satisfies FailureCode,
        msg: 'Email max length is 100',
        delay,
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
    
    
    
    [['name'], (values)=>{
      const [v] = values as [UserValues['name']]
      const d = defaultValues.name
      if (v===d) return new PartialFailureData({
        code: 'name-required' satisfies FailureCode,
        msg: 'Имя не введено',
        type: 'default',
      })
    }],
    [['name'], (values)=>{
      const [v] = values as [UserValues['name']]
      if (v.length>100) return new PartialFailureData({
        code: 'name-too-long' satisfies FailureCode,
        msg: 'Name max length is 100',
        delay,
      })
    }],
    
    
    
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const d = defaultValues.birthDate
      if (v===d) return new PartialFailureData({
        code: 'birth-date-required' satisfies FailureCode,
        msg: 'Birth date is not entered',
        type: 'default',
      })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (!parsed) return new PartialFailureData({
        code: 'birth-date-incorrect-format' satisfies FailureCode,
        msg: 'Birth date has incorrect format',
        delay,
      })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      const normalized = parsed?.copy().normalize()
      if (parsed && !parsed.eq(normalized))
        return new PartialFailureData({
          code: 'birth-date-not-exists' satisfies FailureCode,
          msg: 'This date does not exists',
          delay,
        })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (parsed && parsed.getAge()<18)
        return new PartialFailureData({
          code: 'birth-date-younger-18' satisfies FailureCode,
          msg: 'You must be at least 18 years old',
          delay,
        })
    }],
    
    
    
    [['gender'], (values)=>{
      const [v] = values as [UserValues['gender']]
      const d = defaultValues.gender
      if (v===d) return new PartialFailureData({
        code: 'gender-required' satisfies FailureCode,
        msg: 'Пол не выбран',
        type: 'default',
      })
    }],
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='DUPLICATE_EMAIL') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Пользователь с таким email уже зарегестрирован',
        errorFields: ['fromServer','email'],
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




