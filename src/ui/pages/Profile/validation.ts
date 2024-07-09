import { TypeU } from '@util/common/TypeU.ts'
import { PartnerCommunicationCharacteristics } from 'src/api/model/PartnerCommunicationCharacteristics.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { EducationOptionValues } from 'src/ui/pages/Profile/Profile/ProfileEducationOption.tsx'
import { GenderOptionValues } from 'src/ui/pages/Profile/Profile/ProfileGenderOption.tsx'
import {
  PartnerGenderOptionValues
} from 'src/ui/pages/Profile/Profile/ProfileImLookingForOption.tsx'
import { JobOptionValues } from 'src/ui/pages/Profile/Profile/ProfileJobOption.tsx'
import {
  PartnerCommunicationCharacteristicsOptionValues
} from 'src/ui/pages/Profile/Profile/ProfilePartnerCommunicationCharacteristicsOption.tsx'
import { DefaultProfilePhoto, ProfilePhoto } from 'src/ui/pages/Profile/ProfilePhotoModels.ts'
import { ErrorUiText } from 'src/ui-data/translations/ErrorUiText.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { DateTime } from '@util/DateTime.ts'
import { ValidationCore } from '@util/mini-libs/form-validation/core/ValidationCore.ts'
import { UiTextValues } from '@util/ui-text/UiText.ts'
import { RangeU } from 'src/util/common/RangeU'
import * as uuid from 'uuid'
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import NumRangeNullable = RangeU.NumRangeNullable
import NumRangeEndNullable = RangeU.NumRangeEndNullable




export namespace ProfilePageValidation {
  
  
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
    
    | 'height-not-changed'
    
    | 'education-not-changed'
    
    | 'job-not-changed'
    
    | 'partner-gender-not-changed'
    
    | 'partner-communication-characteristics-not-changed'
    
    | 'photos-not-changed'
    
    | 'partner-age-not-changed'
    
    | 'partner-height-not-changed'
    
    | 'NO_USER'
    | 'connection-error'
    | 'unknown-error'
  
  
  
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
    
    'height-not-changed': { 'en-US': 'height-not-changed' },
    
    'education-not-changed': { 'en-US': 'education-not-changed' },
    
    'job-not-changed': { 'en-US': 'job-not-changed' },
    
    'partner-gender-not-changed': { 'en-US': 'partner-gender-not-changed' },
    
    'partner-communication-characteristics-not-changed':
      { 'en-US': 'partner-communication-characteristics-not-changed' },
    
    'photos-not-changed': { 'en-US': 'photos-not-changed' },
    
    'partner-age-not-changed': { 'en-US': 'partner-age-not-changed' },
    
    'partner-height-not-changed': { 'en-US': 'partner-height-not-changed' },
    
    'NO_USER': ErrorUiText.noUserWithSuchId,
    'connection-error': ErrorUiText.connectionError,
    'unknown-error': ErrorUiText.unknownError,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    name: string
    birthDate: string
    gender: GenderOptionValues
    aboutMe: string
    height: string
    education: EducationOptionValues
    job: JobOptionValues
    partnerGender: PartnerGenderOptionValues
    partnerCommunicationCharacteristics: PartnerCommunicationCharacteristicsOptionValues[]
    photos: ProfilePhoto[]
    
    partnerAge: NumRangeEndNullable
    partnerHeight: NumRangeNullable
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
    birthDate: '',
    gender: '',
    aboutMe: '',
    height: '',
    education: '',
    job: '',
    partnerGender: '',
    partnerCommunicationCharacteristics: [],
    photos: ArrayU.arrOfIndices(6).map(i=>({
      ...DefaultProfilePhoto,
      type: 'remote',
      id: uuid.v4(),
      isEmpty: true,
      remoteIndex: i,
      isReady: false,
    } satisfies ProfilePhoto)),
    
    partnerAge: [18, null],
    partnerHeight: [null, null],
  }
  export const auxiliaryDefaultValues: AuxiliaryValues = {
    fromServer: undefined,
    initialValues: userDefaultValues,
  }
  export const defaultValues: FormValues = {
    ...userDefaultValues,
    ...auxiliaryDefaultValues,
  }
  
  
  
  export const photosComparator = (a: ProfilePhoto, b: ProfilePhoto) =>
    (a.isEmpty && b.isEmpty)
    || a.id===b.id
  
  const delay = 4000
  
  
  
  export const validators: Validators<FormValues> = [
    
    
    
    [['name','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['name'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.name) return new PartialFailureData({
        code: 'name-not-changed' satisfies FailureCode,
        msg: 'Имя не изменено',
        type: 'initial',
        errorFields: ['name'],
      })
    }],
    [['name'], (values) => {
      const [v] = values as [FormValues['name']]
      const d = defaultValues.name
      if (v===d) return new PartialFailureData({
        code: 'name-required' satisfies FailureCode,
        msg: 'Имя не введено',
        type: 'default',
      })
    }],
    [['name'], (values) => {
      const [v] = values as [UserValues['name']]
      if (v.length>100) return new PartialFailureData({
        code: 'name-too-long' satisfies FailureCode,
        msg: 'Name max length is 100',
        delay,
      })
    }],
    
    
    
    [['birthDate','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['birthDate'],FormValues['initialValues']]
      if (v===ivs.birthDate
        || DateTime.eqFrom_yyyy_MM_dd(v,ivs.birthDate)
      )
        return new PartialFailureData({
          code: 'birth-date-not-changed' satisfies FailureCode,
          msg: 'Birth date is not changed',
          type: 'initial',
          errorFields: ['birthDate'],
        })
    }],
    [['birthDate'], (values) => {
      const [v] = values as [FormValues['birthDate']]
      const d = defaultValues.birthDate
      if (v===d) return new PartialFailureData({
        code: 'birth-date-required' satisfies FailureCode,
        msg: 'Birth date is not entered',
        type: 'default',
      })
    }],
    [['birthDate'], (values) => {
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (!parsed) return new PartialFailureData({
        code: 'birth-date-incorrect-format' satisfies FailureCode,
        msg: 'Birth date has incorrect format',
        delay,
      })
    }],
    [['birthDate'], (values) => {
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
    [['birthDate'], (values) => {
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (parsed && parsed.getAge()<18)
        return new PartialFailureData({
          code: 'birth-date-younger-18' satisfies FailureCode,
          msg: 'You must be at least 18 years old',
          delay,
        })
    }],
    
    
    
    [['gender','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['gender'],FormValues['initialValues']]
      if (v===ivs.gender) return new PartialFailureData({
        code: 'gender-not-changed' satisfies FailureCode,
        msg: 'Gender is not changed',
        type: 'initial',
        errorFields: ['gender'],
      })
    }],
    [['gender'], (values) => {
      const [v] = values as [UserValues['gender']]
      const d = defaultValues.gender
      if (v===d) return new PartialFailureData({
        code: 'gender-required' satisfies FailureCode,
        msg: 'Пол не выбран',
        type: 'default',
      })
    }],
    
    
    
    [['aboutMe','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['aboutMe'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.aboutMe) return new PartialFailureData({
        code: 'about-me-not-changed' satisfies FailureCode,
        msg: 'Field "About me" is not changed',
        type: 'initial',
        errorFields: ['aboutMe'],
      })
    }],
    [['aboutMe'], (values) => {
      const [v] = values as [FormValues['aboutMe']]
      if (v.length>2000) return new PartialFailureData({
        code: 'about-me-is-too-long' satisfies FailureCode,
        msg: 'About me is longer than 2000 chars',
        delay,
      })
    }],
    
    
    
    [['height','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['height'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.height) return new PartialFailureData({
        code: 'height-not-changed' satisfies FailureCode,
        msg: 'Field "Height" is not changed',
        type: 'initial',
        errorFields: ['height'],
      })
    }],
    
    
    
    [['education', 'initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['education'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.education) return new PartialFailureData({
        code: 'education-not-changed' satisfies FailureCode,
        msg: 'Field "Education" is not changed',
        type: 'initial',
        errorFields: ['education'],
      })
    }],
    
    
    
    [['job', 'initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['job'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.job) return new PartialFailureData({
        code: 'job-not-changed' satisfies FailureCode,
        msg: 'Field "Job" is not changed',
        type: 'initial',
        errorFields: ['job'],
      })
    }],
    
    
    
    [['partnerGender','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['partnerGender'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.partnerGender) return new PartialFailureData({
        code: 'partner-gender-not-changed' satisfies FailureCode,
        msg: 'Field "Partner gender" is not changed',
        type: 'initial',
        errorFields: ['partnerGender'],
      })
    }],
    
    
    
    [['partnerCommunicationCharacteristics','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['partnerCommunicationCharacteristics'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (ArrayU.eqAsSet(v, ivs.partnerCommunicationCharacteristics)) return new PartialFailureData({
        code: 'partner-communication-characteristics-not-changed' satisfies FailureCode,
        msg: 'Field "Partner communication characteristics" is not changed',
        type: 'initial',
        errorFields: ['partnerCommunicationCharacteristics'],
      })
    }],
    
    
    
    [['photos','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['photos'],FormValues['initialValues']]
      if (v.every((it,i)=>photosComparator(it,ivs.photos[i])))
        return new PartialFailureData({
          code: 'photos-not-changed' satisfies FailureCode,
          msg: 'Photos are not changed',
          type: 'initial',
          errorFields: ['photos'],
        })
    }],
    
    
    
    [['partnerAge','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['partnerAge'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (ArrayU.eq(v, ivs.partnerAge)) return new PartialFailureData({
        code: 'partner-age-not-changed' satisfies FailureCode,
        msg: 'Field "Partner age" is not changed',
        type: 'initial',
        errorFields: ['partnerAge'],
      })
    }],
    
    
    
    [['partnerHeight','initialValues'], (values) => {
      const [v,ivs] = values as [FormValues['partnerHeight'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (ArrayU.eq(v, ivs.partnerHeight)) return new PartialFailureData({
        code: 'partner-height-not-changed' satisfies FailureCode,
        msg: 'Field "Partner height" is not changed',
        type: 'initial',
        errorFields: ['partnerHeight'],
      })
    }],
    
    
    
    [['fromServer'], (values) => {
      const [v] = values as [FromServerValue]
      if (v?.error.code==='NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким id',
        type: 'server',
      })
    }],
    
    
    
    [['fromServer'], (values) => {
      const [v] = values as [FromServerValue]
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        type: 'server',
      })
    }],
    [['fromServer'], (values) => {
      const [v] = values as [FromServerValue]
      if (v) {
        console.log('Unknown error:',JSON.stringify(v.error))
        return new PartialFailureData({
          code: 'unknown-error' satisfies FailureCode,
          msg: 'Unknown Error',
          extra: v,
          type: 'server',
        })
      }
    }],
    
  ]
  
}




