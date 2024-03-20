/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/entity/CurrentUser'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import Form from 'src/components/FormElements/Form'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import Preview from 'src/pages/Profile/Preview/Preview'
import Profile from 'src/pages/Profile/Profile/Profile'
import { useRecoilState } from 'recoil'
import ProfilePageTabHeader, { ProfilePageTabHeaderContext } from 'src/pages/Profile/ProfilePageTabHeader'
import {
  DefaultOperation,
  DefaultProfilePhoto,
  Operation,
  ProfilePhoto,
} from 'src/pages/Profile/ProfilePhotoModels'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { AsyncUtils } from 'src/utils/common/AsyncUtils'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { DateTime } from 'src/utils/DateTime'
import { FileUtils } from 'src/utils/file/FileUtils'
import { useFormFailures } from 'src/utils/form-validation/hooks/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/hooks/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/hooks/useFormToasts'
import { useFormValuesProps } from 'src/utils/form-validation/hooks/useFormValuesProps'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { Progress } from 'src/utils/Progress'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabsState } from 'src/views/Tabs/useTabs'
import UseTabsState from 'src/views/Tabs/UseTabsState'
import * as uuid from 'uuid'
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn
import TabsPage = Pages.TabsPage
import safePageContentPaddings = Pages.safePageContentPaddings
import fill = EmotionCommon.fill
import blobToDataUrl = FileUtils.blobToDataUrl
import fetchToBlob = FileUtils.fetchToBlob
import mapRange = MathUtils.mapRange
import throttle = AsyncUtils.throttle
import mapFirstToIfFoundBy = ArrayUtils.mapFirstToIfFoundBy
import mapFailureCodeToUiText = ProfilePageValidation.mapFailureCodeToUiText
import validators = ProfilePageValidation.validators
import defaultValues = ProfilePageValidation.defaultValues
import FormValues = ProfilePageValidation.FormValues
import AddProfilePhotoErrorData = UserApi.AddProfilePhotoErrorData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import CurrentUserSuccessData = UserApi.CurrentUserSuccessData
import ApiResponse = ApiUtils.ApiResponse
import photosComparator = ProfilePageValidation.photosComparator
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import UserToUpdate = UserApi.UserToUpdate
import AddProfilePhoto = UserApi.AddProfilePhoto
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import findBy = ArrayUtils.findBy
import PageContentPaddings = Pages.PageContentPaddings
import row = EmotionCommon.row





/*


export const DotsFrame = styled.section`
  height: 20px;
  min-width: 20px;
  border-radius: 999999px;
  ${row};
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  
  gap: 6px;
  padding: 0 10px;
  background: #aaaaaa88;
`

export const Dot = styled.div`
  //width: 10px;
  //height: 10px;
  border-radius: 999999px;
  //border: 2px solid ${p=>p.theme.buttonNav.contentAccent[0]};

  width: 6px;
  height: 6px;
  background: #eeeeee;
`
export const dotActive = (t: AppTheme.Theme)=>css`
  //width: 12px;
  //height: 12px;
  
  background: ${t.photos.highlightFrameAccentBgc[0]};
`
*/










export const currentUserPhotosToProfilePhotos =
  (photos: CurrentUser['photos']): ProfilePhoto[] => {
    const profilePhotos: ProfilePhoto[] =
      ArrayUtils.ofIndices(6).map(i => ({
        ...DefaultProfilePhoto,
        type: 'remote',
        id: uuid.v4(),
        remoteIndex: i,
        isEmpty: true,
        isReady: true,
      } satisfies ProfilePhoto))
    photos.forEach(it => {
      profilePhotos[it.index] = {
        ...DefaultProfilePhoto,
        type: 'remote',
        id: it.id,
        remoteIndex: it.index,
        name: it.name,
        mimeType: it.mimeType,
        remoteUrl: it.url,
        isReady: false,
      } satisfies ProfilePhoto
    })
    return profilePhotos
  }






export const profileUpdateApiRequest = (
  values: FormValues,
  failedFields: (keyof FormValues)[],
  setFormValues: SetterOrUpdater<FormValues>,
  setAuth: SetterOrUpdater<AuthStateType>
)=>{
  const userToUpdate: UserToUpdate = {}
  let addPhotos = [] as AddProfilePhoto[]
  
  if (!failedFields.includes('name')){
    userToUpdate.name = values.name
  }
  if (!failedFields.includes('birthDate')){
    userToUpdate.birthDate =
      DateTime.from_yyyy_MM_dd(values.birthDate)!
        .set({ timezone: DateTime.fromDate(new Date()).timezone })
        .to_yyyy_MM_dd_HH_mm_ss_SSS_XXX()
  }
  if (!failedFields.includes('gender')){
    userToUpdate.gender = values.gender as GenderEnum
  }
  if (!failedFields.includes('aboutMe')){
    userToUpdate.aboutMe = values.aboutMe
  }
  
  if (!failedFields.includes('photos')){
    const [fwd] =
      ArrayUtils.diff2(values.initialValues.photos, values.photos, photosComparator)
    userToUpdate.photos = {
      remove: fwd
        .filter(it=>it.isRemoved && it.fromElem.type==='remote')
        .map(it=>it.fromElem.id),
      replace: fwd
        .filter(it=>it.isReplaced && it.fromElem.type==='remote')
        .map(it=>({ id: it.fromElem.id, index: it.toIdx })),
    }
    addPhotos = values.photos
      .map((it,i)=>({ remoteIndex: i, photo: it }))
      .filter(it=>it.photo.type==='local' && it.photo.isReady)
      .map(it=>({
        id: it.photo.id,
        index: it.remoteIndex,
        name: it.photo.name,
        dataUrl: it.photo.dataUrl,
      }))
  }
  
  const apiPromise = new Promise<ApiResponse<
    CurrentUserSuccessData,
    UpdateUserErrorData | AddProfilePhotoErrorData
  >>(async (resolve, reject)=>{
    let updatedUser = null as null|CurrentUser
    
    let uploads = addPhotos.map(it=>({
      ...DefaultOperation,
      id: it.id,
      showProgress: false,
    }))
    setFormValues(s=>({ ...s,
      photos: ArrayUtils.combine(
        s.photos, uploads,
        (photo,upload)=>({ ...photo, upload } satisfies ProfilePhoto),
        (photo,upload)=>photo.id===upload.id
      )
    }))
    
    const setUpload = (upload: Operation)=>{
      setFormValues(s=>({ ...s,
        photos: mapFirstToIfFoundBy(
          s.photos,
          elem=>({ ...elem, upload }),
          elem=>elem.upload?.id===upload.id
        )
      }))
    }
    const delayTimerId = setTimeout(
      ()=>{
        uploads = uploads.map(it=>({ ...it, showProgress: true }))
        uploads.forEach(upload=>setUpload(upload))
      },
      2000
    )
    
    const applyUpdatedUser = ()=>{
      clearTimeout(delayTimerId)
      setFormValues(s=>({ ...s,
        photos: ArrayUtils.combine(
          s.photos, uploads,
          (photo,upload)=>(
            { ...photo, upload: undefined } satisfies ProfilePhoto
          ),
          (photo,upload)=>photo.id===upload.id
        )
      }))
      const u = updatedUser
      if (u){
        // работает при условии, что во время обновления другой клиент не обновит фотки
        setFormValues(s=>({ ...s,
          photos: ArrayUtils.combine(
            s.photos, values.photos,
            (photo,usedPhoto)=>({
              ...photo,
              type: 'remote',
              isReady: usedPhoto.isReady,
            } satisfies ProfilePhoto),
            (photo,usedPhoto)=>photo.id===usedPhoto.id && usedPhoto.type==='local'
          )
        }))
        setFormValues(s=>({ ...s,
          photos: ArrayUtils.combine(
            s.photos, values.photos,
            (photo,usedPhoto,photoI,usedPhotoI)=>({
              ...photo, remoteIndex: usedPhotoI
            } satisfies ProfilePhoto),
            (photo,usedPhoto)=>photo.remoteIndex===usedPhoto.remoteIndex
          )
        }))
        setAuth(s=>({
          accessToken: s?.accessToken ?? '',
          user: u,
        }))
      }
    }
    
    
    {
      const userUpdateResponse = await UserApi.update(userToUpdate)
      if (!userUpdateResponse.isSuccess) {
        reject(userUpdateResponse)
        return undefined
      }
      updatedUser = userUpdateResponse.data.user
    }
    
    
    for await (const photo of addPhotos){
      const getUpload = ()=>findBy(uploads,elem=>elem.id===photo.id).elem
      
      const updatePhotoNow = (p: Partial<ProfilePhoto>)=>{
        const upload = getUpload()
        if (upload) setFormValues(s=>({ ...s,
          photos: mapFirstToIfFoundBy(s.photos,
            elem=>({...elem, ...p}),
            elem=>elem.upload?.id===upload.id
          )
        }))
      }
      const updatePhoto = throttle(
        mapRange(Math.random(),[0,1],[1500,2000]),
        updatePhotoNow
      )
      
      const onProgress = (p:number|null)=>{
        //console.log(`progress ${photo.id} ${p}`)
        const upload = getUpload()
        if (upload) updatePhoto({ upload:
            { ...upload, progress: p??0 }
        })
      }
      const updatedUserResponse =
        await UserApi.addProfilePhoto(photo, { onProgress })
      updatePhotoNow({ upload: undefined })
      if (!updatedUserResponse.isSuccess){
        applyUpdatedUser()
        reject(updatedUserResponse)
        return undefined
      }
      updatedUser = updatedUserResponse.data.user
    }
    
    applyUpdatedUser()
    resolve({ isSuccess: true, data: { user: updatedUser } })
  })
  
  return apiPromise
}


