import { UserApi } from 'src/services/api/requests/UserApi.ts'
import {
  MediaInArrayDUC,
  newDefaultEmptyRemoteMediaInArray,
} from '@mini-libs/media/Media.ts'
import { EducationOptionValues } from 'src/components/pages/Profile/options/ProfileEducationOption.tsx'
import { GenderOptionValues } from 'src/components/pages/Profile/options/ProfileGenderOption.tsx'
import {
  PartnerGenderOptionValues
} from 'src/components/pages/Profile/options-filter/ProfileImLookingForOption.tsx'
import { JobOptionValues } from 'src/components/pages/Profile/options/ProfileJobOption.tsx'
import { ErrorUiText } from 'src/locales/translations/ErrorUiText.ts'
import { ArrayU } from 'src/utils/common/ArrayU.ts'
import { DateTime } from '@utils/date/DateTime.ts'
import { ValidationCore } from 'src/mini-libs/form-data/core/ValidationCore.ts'
import { UiTextValues } from 'src/mini-libs/ui-text/UiText.ts'
import * as uuid from 'uuid'
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData



export const profilePhotosCntMax = 6


export namespace ProfilePageValidation {
  
  
  import createValidator = ValidationCore.createValidator
  type SeverErrorCode = UpdateUserErrorData['code']
  
  
  type FailureCode =
    | 'name-required'
    | 'name-not-changed'
    | 'name-too-long'
    
    | 'birth-date-not-changed'
    | 'birth-date-required'
    | 'birth-date-incorrect-format'
    | 'birth-date-not-exists'
    | 'birth-date-younger-18'
    
    | 'gender-not-changed'
    | 'gender-required'
    
    | 'about-me-not-changed'
    | 'about-me-is-too-long'
    
    | 'partner-communication-characteristics-not-changed'
    
    | 'photos-not-changed'
    
    | 'NO_USER'
    | 'CONNECTION_ERROR'
    | 'UNKNOWN_ERROR'
  
  
  
  export const mapFailureCodeToUiText = {
    'name-required': ErrorUiText.nameIsNotEntered,
    'name-not-changed': { 'en-US': 'name-not-changed' },
    'name-too-long': ErrorUiText.nameMaxLenIs100,
    
    'birth-date-not-changed': { 'en-US': 'birth-date-not-changed' },
    'birth-date-required': ErrorUiText.birthDateIsNotEntered,
    'birth-date-incorrect-format': ErrorUiText.birthDateHasIncorrectFormat,
    'birth-date-not-exists': ErrorUiText.dateNotExists,
    'birth-date-younger-18': ErrorUiText.youMustBeAtLeast18YearsOld,
    
    'gender-not-changed': { 'en-US': 'gender-not-changed' },
    'gender-required': ErrorUiText.genderIsNotChosen,
    
    'about-me-not-changed': { 'en-US': 'about-me-not-changed' },
    'about-me-is-too-long': ErrorUiText.descriptionMaxLenIs2000,
    
    'partner-communication-characteristics-not-changed':
      { 'en-US': 'partner-communication-characteristics-not-changed' },
    
    'photos-not-changed': { 'en-US': 'photos-not-changed' },
    
    'NO_USER': ErrorUiText.noUserWithSuchId,
    'CONNECTION_ERROR': ErrorUiText.CONNECTION_ERROR,
    'UNKNOWN_ERROR': ErrorUiText.UNKNOWN_ERROR,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    name: string
    photos: MediaInArrayDUC[]
    birthDate: string
    gender: GenderOptionValues
    aboutMe: string
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
    name: '',
    photos: ArrayU.arrOfIndices(profilePhotosCntMax).map(i => ({
      ...newDefaultEmptyRemoteMediaInArray(i),
      // TODO id - id collision with ids from backend?
      id: uuid.v4(),
      isInited: false,
    })),
    birthDate: '',
    gender: '',
    aboutMe: '',
  }
  export const auxiliaryDefaultValues: AuxiliaryValues = {
    fromServer: undefined,
    initialValues: userDefaultValues,
  }
  export const defaultValues: FormValues = {
    ...userDefaultValues,
    ...auxiliaryDefaultValues,
  }
  
  
  
  export const photosComparator = (a: MediaInArrayDUC, b: MediaInArrayDUC) => {
    return (a.isEmpty && b.isEmpty) || a.id === b.id
  }
  
  const delay = 4000
  
  
  
  export const validators: Validators<FormValues> = [
    
    
    
    createValidator(['name', 'initialValues'], (values) => {
      const [v, ivs] = values as [FormValues['name'], FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v === ivs.name) return new PartialFailureData({
        code: 'name-not-changed' satisfies FailureCode,
        msg: 'Имя не изменено',
        type: 'initial',
        errorFields: ['name'],
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
      if (v.length>100) return new PartialFailureData({
        code: 'name-too-long' satisfies FailureCode,
        msg: 'Name max length is 100',
        delay,
      })
    }),
    
    
    
    createValidator(['birthDate', 'initialValues'], ([v, ivs]) => {
      if (v === ivs.birthDate || DateTime.eqFrom_yyyy_MM_dd(v, ivs.birthDate))
        return new PartialFailureData({
          code: 'birth-date-not-changed' satisfies FailureCode,
          msg: 'Birth date is not changed',
          type: 'initial',
          errorFields: ['birthDate'],
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
    
    
    
    createValidator(['gender', 'initialValues'], ([v, ivs]) => {
      if (v === ivs.gender) return new PartialFailureData({
        code: 'gender-not-changed' satisfies FailureCode,
        msg: 'Gender is not changed',
        type: 'initial',
        errorFields: ['gender'],
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
    
    
    
    createValidator(['aboutMe', 'initialValues'], ([v, ivs]) => {
      //console.log('v:',v,'ivs:',ivs)
      if (v === ivs.aboutMe) return new PartialFailureData({
        code: 'about-me-not-changed' satisfies FailureCode,
        msg: 'Field "About me" is not changed',
        type: 'initial',
        errorFields: ['aboutMe'],
      })
    }),
    createValidator(['aboutMe'], ([v]) => {
      if (v.length > 2000) return new PartialFailureData({
        code: 'about-me-is-too-long' satisfies FailureCode,
        msg: 'About me is longer than 2000 chars',
        delay,
      })
    }),
    
    
    
    createValidator(['photos', 'initialValues'], ([v, ivs]) => {
      if (v.every((it, i) => photosComparator(it, ivs.photos[i])))
        return new PartialFailureData({
          code: 'photos-not-changed' satisfies FailureCode,
          msg: 'Photos are not changed',
          type: 'initial',
          errorFields: ['photos'],
        })
    }),
    
    
    
    createValidator(['fromServer'], ([v]) => {
      if (v?.error.code === 'NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким id',
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
      if (v) {
        console.log('Unknown error:', JSON.stringify(v.error))
        return new PartialFailureData({
          code: 'UNKNOWN_ERROR' satisfies FailureCode,
          msg: 'Unknown Error',
          extra: v,
          type: 'server',
        })
      }
    }),
    
  ]
  
}




