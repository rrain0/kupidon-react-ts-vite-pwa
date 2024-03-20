import { GenderEnum } from 'src/api/entity/GenderEnum'
import { UserApi } from 'src/api/requests/UserApi'
import { DefaultProfilePhoto, ProfilePhoto } from 'src/pages/Profile/ProfilePhotoModels'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { DateTime } from 'src/utils/DateTime'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiTextValues } from 'src/utils/lang/UiText'
import * as uuid from 'uuid'
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData




export namespace ProfilePageValidation {
  
  
  type SeverErrorCode = UpdateUserErrorData['code']
  
  
  type FailureCode =
    'name-required'
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
    
    | 'photos-not-changed'
    
    | 'NO_USER'
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'name-required': ProfileUiText.nameIsNotEntered,
    'name-not-changed': [],
    'name-too-long': ProfileUiText.nameMaxLenIs100,
    'birth-date-not-changed': [],
    'birth-date-required': ProfileUiText.birthDateIsNotEntered,
    'birth-date-incorrect-format': ProfileUiText.birthDateHasIncorrectFormat,
    'birth-date-not-exists': ProfileUiText.dateNotExists,
    'birth-date-younger-18': ProfileUiText.youMustBeAtLeast18YearsOld,
    'gender-not-changed': [],
    'gender-required': ProfileUiText.genderIsNotChosen,
    'about-me-not-changed': [],
    'about-me-is-too-long': ProfileUiText.descriptionMaxLenIs2000,
    'photos-not-changed': [],
    'NO_USER': ProfileUiText.noUserWithSuchId,
    'connection-error': ProfileUiText.connectionError,
    'unknown-error': ProfileUiText.unknownError,
  } satisfies UiTextValues<FailureCode>
  
  
  
  export type UserValues = {
    name: string
    birthDate: string
    gender: GenderEnum|''
    aboutMe: string
    photos: ProfilePhoto[]
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
    photos: ArrayUtils.ofIndices(6).map(i=>({
      ...DefaultProfilePhoto,
      type: 'remote',
      id: uuid.v4(),
      isEmpty: true,
      remoteIndex: i,
      isReady: false,
    } satisfies ProfilePhoto))
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
    
    
    
    [['name','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['name'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.name) return new PartialFailureData({
        code: 'name-not-changed' satisfies FailureCode,
        msg: 'Имя не изменено',
        type: 'initial',
        errorFields: ['name'],
      })
    }],
    [['name'], (values)=>{
      const [v] = values as [FormValues['name']]
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
    
    
    
    [['birthDate','initialValues'], (values)=>{
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
    
    
    
    [['gender','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['gender'],FormValues['initialValues']]
      if (v===ivs.gender) return new PartialFailureData({
        code: 'gender-not-changed' satisfies FailureCode,
        msg: 'Gender is not changed',
        type: 'initial',
        errorFields: ['gender'],
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
    
    
    
    [['aboutMe','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['aboutMe'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if (v===ivs.aboutMe) return new PartialFailureData({
        code: 'about-me-not-changed' satisfies FailureCode,
        msg: 'Field "About me" is not changed',
        type: 'initial',
        errorFields: ['aboutMe'],
      })
    }],
    [['aboutMe'], (values)=>{
      const [v] = values as [FormValues['aboutMe']]
      if (v.length>2000) return new PartialFailureData({
        code: 'about-me-is-too-long' satisfies FailureCode,
        msg: 'About me is longer than 2000 chars',
        delay,
      })
    }],
    
    
    
    [['photos','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['photos'],FormValues['initialValues']]
      if (v.every((it,i)=>photosComparator(it,ivs.photos[i])))
        return new PartialFailureData({
          code: 'photos-not-changed' satisfies FailureCode,
          msg: 'Photos are not changed',
          type: 'initial',
          errorFields: ['photos'],
        })
    }],
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким id',
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




