import { AxiosRequestConfig } from 'axios'
import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/model/CurrentUser'
import { Gender } from 'src/api/model/Gender.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { getDataUrlProps } from '@util/file/DataUrl.ts'
import { FileU } from 'src/util/file/FileU'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes } from 'src/api/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import ax = AxiosConfig.ax
import handleResponse = ApiUtils.handleResponse
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError
import NoUserResponseError = ApiUtils.NoUserResponseError
import PartialUndef = TypeU.PartialUndef
import fetchToBlob = FileU.fetchToBlob
import Callback1 = TypeU.Callback1




export namespace UserApi {
  
  
  import isdef = TypeU.isdef
  export type CurrentUserSuccessData = {
    user: CurrentUser
  }
  export type CurrentUserErrorData = AuthenticationError | NoUserResponseError | TechnicalError
  export const current = async () => {
    return handleAuthenticatedResponse<CurrentUserSuccessData, CurrentUserErrorData>(
      axAccess.get(ApiRoutes.userCurrent)
    )
  }
  
    
  
  
  
  
  
  
  export interface CreateSuccessData {
    accessToken: string
    user: CurrentUser
  }
  export type CreateErrorData = TechnicalError | {
    code: 'DUPLICATE_EMAIL'
    msg: string
  }
  export type UserToCreate = {
    email: string,
    pwd: string,
    name: string,
    gender: 'MALE' | 'FEMALE',
    birthDate: string, // '2005-11-10T00:00:00.000+08:00'
  }
  export const create = async (user: UserToCreate, lang: string[]) => {
    return handleResponse<CreateSuccessData, CreateErrorData>(
      ax.post(ApiRoutes.userCreate, user, { params: { lang } })
    )
  }
  
  
  
  
  
  
  export type UpdateUserSuccessData = CurrentUserSuccessData
  export type UpdateUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError | {
      code: 'INVALID_PWD'
      msg: string
    }
  export type UserToUpdate = PartialUndef<{
    name: string
    birthDate: string // '2005-11-10T00:00:00.000+08:00'
    gender: Gender
    aboutMe: string
    currentPwd: string
    pwd: string
    photos: {
      remove: string[]
      replace: Array<{ id: string, index: number }>
    }
  }>
  export const update = async (user: UserToUpdate) => {
    return handleAuthenticatedResponse<UpdateUserSuccessData, UpdateUserErrorData>(
      axAccess.put(ApiRoutes.userUpdate, user)
    )
  }
  
  
  
  
  
  
  export type AddProfilePhotoSuccessData = CurrentUserSuccessData
  export type AddProfilePhotoErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError
  export type AddProfilePhoto = {
    id: string,
    index: number,
    name: string,
    dataUrl: string
  }
  export const addProfilePhoto = async (
    photo: AddProfilePhoto,
    options?: {
      onProgress?: Callback1<number | undefined>
      abortCtrl?: AbortController
    }
  ) => {
    const mimeType = getDataUrlProps(photo.dataUrl)!.mimeType
    const preparedPhoto = {
      id: photo.id,
      index: photo.index,
      name: photo.name,
      mimeType,
      binData: await fetchToBlob(photo.dataUrl),
    }
    
    const config: AxiosRequestConfig = {
      onUploadProgress: progressEvent => {
        const p = progressEvent.progress
        options?.onProgress?.( isdef(p) ? p * 100 : p )
      },
    }
    const ctrl = options?.abortCtrl
    if (ctrl) config.signal = ctrl.signal
    
    // https://axios-http.com/docs/multipart
    return handleAuthenticatedResponse<AddProfilePhotoSuccessData, AddProfilePhotoErrorData>(
      axAccess.postForm(ApiRoutes.userPostProfilePhoto, preparedPhoto, config)
    )
  }
  
  
  
  
}
