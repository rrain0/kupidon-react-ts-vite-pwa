import { Gender } from 'src/api/model/Gender.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { DateTime } from '@util/date/DateTime.ts'
import { ValidationValidators } from 'src/mini-libs/form-validation/core/ValidationValidators.ts'
import { ValidationCore } from 'src/mini-libs/form-validation/core/ValidationCore.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import { ErrorUiText } from 'src/ui-data/translations/ErrorUiText.ts'
import isValidEmail = ValidationValidators.isValidEmail
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import PartialFailureData = ValidationCore.PartialFailureData
import CreateErrorData = UserApi.CreateErrorData



export namespace SignupPageValidation {
  
  
  import createValidator = ValidationCore.createValidator
  type SeverErrorCode = CreateErrorData['code']
  
  
  type FailureCode =
    | 'email-required'
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
    
    | 'DUPLICATE_EMAIL'
    
    | 'connectionError'
    | 'unknownError'
  
  
  
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
    'DUPLICATE_EMAIL': ErrorUiText.userWithSuchEmailAlreadyRegistered,
    'connectionError': ErrorUiText.connectionError,
    'unknownError': ErrorUiText.unknownError,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    email: string
    pwd: string
    repeatPwd: string
    name: string
    gender: Gender | ''
    birthDate: string // 2002-01-01 1999-12-31
    //notRobot: boolean
    //form: LoginRespE['data']['code'] | 'connectionError'|'unknown'|undefined
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
    
    createValidator(['email'], ([v]) => {
      const d = defaultValues.email
      if (v === d) return new PartialFailureData({
        code: 'email-required' satisfies FailureCode,
        msg: 'Email не введён',
        type: 'default',
      })
    }),
    createValidator(['email'], ([v]) => {
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'email-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay,
      })
    }),
    createValidator(['email'], ([v]) => {
      if (v.length > 100) return new PartialFailureData({
        code: 'email-too-long' satisfies FailureCode,
        msg: 'Email max length is 100',
        delay,
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
      if (v.length > 200) return new PartialFailureData({
        code: 'pwd-too-long' satisfies FailureCode,
        msg: 'Password max length is 200',
        delay,
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
    
    
    
    createValidator(['name'], ([v]) => {
      const d = defaultValues.name
      if (v === d) return new PartialFailureData({
        code: 'name-required' satisfies FailureCode,
        msg: 'Имя не введено',
        type: 'default',
      })
    }),
    createValidator(['name'], ([v]) => {
      if (v.length > 100) return new PartialFailureData({
        code: 'name-too-long' satisfies FailureCode,
        msg: 'Name max length is 100',
        delay,
      })
    }),
    
    
    
    createValidator(['birthDate'], ([v]) => {
      const d = defaultValues.birthDate
      if (v === d) return new PartialFailureData({
        code: 'birth-date-required' satisfies FailureCode,
        msg: 'Birth date is not entered',
        type: 'default',
      })
    }),
    createValidator(['birthDate'], ([v]) => {
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (!parsed) return new PartialFailureData({
        code: 'birth-date-incorrect-format' satisfies FailureCode,
        msg: 'Birth date has incorrect format',
        delay,
      })
    }),
    createValidator(['birthDate'], ([v]) => {
      const parsed = DateTime.from_yyyy_MM_dd(v)
      const normalized = parsed?.copy().normalize()
      if (parsed && !parsed.eq(normalized))
        return new PartialFailureData({
          code: 'birth-date-not-exists' satisfies FailureCode,
          msg: 'This date does not exists',
          delay,
        })
    }),
    createValidator(['birthDate'], ([v]) => {
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (parsed && parsed.getAge()<18)
        return new PartialFailureData({
          code: 'birth-date-younger-18' satisfies FailureCode,
          msg: 'You must be at least 18 years old',
          delay,
        })
    }),
    
    
    
    createValidator(['gender'], ([v]) => {
      const d = defaultValues.gender
      if (v === d) return new PartialFailureData({
        code: 'gender-required' satisfies FailureCode,
        msg: 'Пол не выбран',
        type: 'default',
      })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'DUPLICATE_EMAIL') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Пользователь с таким email уже зарегестрирован',
        errorFields: ['fromServer', 'email'],
        type: 'server',
      })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'connectionError') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        type: 'server',
      })
    }),
    createValidator(['fromServer'], ([v]) => {
      if (v) return new PartialFailureData({
        code: 'unknownError' satisfies FailureCode,
        msg: 'Неизвестная ошибка',
        extra: v,
        type: 'server',
      })
    }),
    
  ]
  
}




