import { AxiosRequestConfig } from 'axios'
import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/entity/CurrentUser'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { DataUrl } from 'src/utils/DataUrl'
import { FileUtils } from 'src/utils/file/FileUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import ax = AxiosConfig.ax
import handleResponse = ApiUtils.handleResponse
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError
import NoUserResponseError = ApiUtils.NoUserResponseError
import PartialUndef = TypeUtils.PartialUndef
import fetchToBlob = FileUtils.fetchToBlob
import Callback1 = TypeUtils.Callback1
import exists = TypeUtils.exists




export namespace UserApi {
  
  
  export type CurrentUserSuccessData = {
    user: CurrentUser
  }
  export type CurrentUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError
  export const current = async() =>
    handleAuthenticatedResponse<CurrentUserSuccessData, CurrentUserErrorData>
    (axAccess.get(r.userCurrent))
    
  
  
  
  
  
  
  export interface CreateSuccessData {
    accessToken: string
    user: CurrentUser
  }
  export type CreateErrorData = TechnicalError | {
    code: "DUPLICATE_EMAIL"
    msg: string
  }
  export type UserToCreate = {
    email: string,
    pwd: string,
    name: string,
    gender: "MALE"|"FEMALE",
    birthDate: string, // '2005-11-10T00:00:00.000+08:00'
  }
  export const create = async(user: UserToCreate, lang: string) =>
    handleResponse<CreateSuccessData,CreateErrorData>
    (ax.post(r.userCreate, user, { params: { lang } }))
  
  
  
  
  
  export type UpdateUserSuccessData = CurrentUserSuccessData
  export type UpdateUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError | {
    code: "INVALID_PWD"
    msg: string
  }
  export type UserToUpdate = PartialUndef<{
    name: string
    birthDate: string // '2005-11-10T00:00:00.000+08:00'
    gender: GenderEnum
    aboutMe: string
    currentPwd: string
    pwd: string
    photos: {
      remove: string[]
      replace: Array<{ id: string, index: number}>
    }
  }>
  export const update = async(user: UserToUpdate) =>
    handleAuthenticatedResponse<UpdateUserSuccessData, UpdateUserErrorData>
    (axAccess.put(r.userUpdate,user))
  
  
  
  
  
  export type AddProfilePhotoSuccessData = CurrentUserSuccessData
  export type AddProfilePhotoErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError
  export type AddProfilePhoto = {
    id: string,
    index: number,
    name: string,
    dataUrl: string
  }
  export const addProfilePhoto =
  async (
    photo: AddProfilePhoto,
    options?: {
      onProgress?: Callback1<number|null>
      abortCtrl?: AbortController
    }
  ) => {
    const mimeType = new DataUrl(photo.dataUrl).mimeType
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
        options?.onProgress?.( exists(p) ? p*100 : null )
      },
    }
    const ctrl = options?.abortCtrl
    if (ctrl) config.signal = ctrl.signal
    
    // https://axios-http.com/docs/multipart
    return handleAuthenticatedResponse<AddProfilePhotoSuccessData, AddProfilePhotoErrorData>
    (axAccess.postForm(r.addProfilePhoto,preparedPhoto,config))
  }
  
  
  
  
}