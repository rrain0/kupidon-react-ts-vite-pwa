import { AxiosRequestConfig } from 'axios'
import { ApiResponseUtils } from '@libs/api/ApiResponseUtils.ts'
import { UserCurrentA, UserStrangerA } from 'src/models/api/UserA.ts'
import { GenderA } from 'src/models/api/GenderA.ts'
import { getDataUrlProps } from '@utils/bin/dataUrl.ts'
import { axiosToBlob } from '@utils/bin/binDataAxiosUtils.ts'
import { ApiV1Routes } from 'src/services/api/ApiV1Routes.ts'
import { ax, axAccess } from 'src/services/api/axiosConfig.ts'
import handleResponse = ApiResponseUtils.handleResponse
import TechnicalError = ApiResponseUtils.TechnicalError
import handleAuthenticatedResponse = ApiResponseUtils.handleAuthenticatedResponse
import AuthenticationError = ApiResponseUtils.AuthenticationError
import NoUserResponseError = ApiResponseUtils.NoUserResponseError
import { Pu } from '@utils/base/tsUtils.ts'
import { Cb1 } from '@utils/base/tsUtils.ts'
import { isdef } from '@utils/base/tsUtils.ts'




export namespace UserApi {
  
  
  
  export type CurrentUserSuccessData = {
    user: UserCurrentA
  }
  export type CurrentUserErrorData = AuthenticationError | NoUserResponseError | TechnicalError
  export const current = async () => {
    return handleAuthenticatedResponse<CurrentUserSuccessData, CurrentUserErrorData>(
      axAccess.get(ApiV1Routes.userCurrent)
    )
  }
  
  
  
  
  
  export type UserByIdSuccessData = {
    user: UserStrangerA
  }
  export type UserByIdErrorData = NoUserResponseError | TechnicalError
  export const userById = async (id: string) => {
    return handleResponse<UserByIdSuccessData, UserByIdErrorData>(
      ax.get(ApiV1Routes.userIdId(id))
    )
  }
  
    
  
  
  
  
  
  
  export interface CreateSuccessData {
    accessToken: string
    user: UserCurrentA
  }
  export type CreateErrorData = TechnicalError | {
    code: 'DUPLICATE_EMAIL'
    msg: string
  }
  export type UserToCreate = {
    email: string
    pwd: string
    name: string
    gender: GenderA
    birthDate: string // '2005-01-01'
  }
  export const create = async (user: UserToCreate, lang: string[], timeZone: string) => (
    handleResponse<CreateSuccessData, CreateErrorData>(
      ax.post(ApiV1Routes.user, user, { params: { lang, timeZone } })
    )
  )
  
  
  
  
  
  
  export type UpdateUserSuccessData = CurrentUserSuccessData
  export type UpdateUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError | {
      code: 'INVALID_PWD'
      msg: string
    }
  export type UserToUpdate = Pu<{
    name: string
    birthDate: string // '2005-01-01'
    gender: GenderA
    aboutMe: string
    currentPwd: string
    pwd: string
    photos: {
      remove: string[]
      replace: { id: string, index: number }[]
    }
  }>
  export const update = async (user: UserToUpdate, timeZone: string) => (
    handleAuthenticatedResponse<UpdateUserSuccessData, UpdateUserErrorData>(
      axAccess.put(ApiV1Routes.user, user, { params: { timeZone } })
    )
  )
  
  
  
  
  
  
  export type AddProfilePhotoSuccessData = CurrentUserSuccessData
  export type AddProfilePhotoErrorData =
    | AuthenticationError
    | NoUserResponseError
    | TechnicalError
  export type profilePhotoToAdd = {
    id: string,
    index: number,
    name: string,
    dataUrl: string
  }
  export const addProfilePhoto = async (
    photo: profilePhotoToAdd,
    options?: {
      onProgress?: Cb1<number | undefined>
      abortCtrl?: AbortController
    }
  ) => {
    const ext = getDataUrlProps(photo.dataUrl)!.preferredExt
    const preparedPhoto = {
      id: photo.id,
      index: photo.index,
      name: photo.name,
      ext,
      binData: await axiosToBlob(photo.dataUrl),
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
      axAccess.postForm(ApiV1Routes.userProfilePhoto, preparedPhoto, config)
    )
  }
  
  
  
  
}
