import { ApiUtils } from 'src/api/ApiUtils.ts'
import { CurrentUser } from 'src/api/model/CurrentUser.ts'
import { Gender } from 'src/api/model/Gender.ts'
import {
  DefaultOperation,
  DefaultProfilePhoto,
  Operation,
  ProfilePhoto,
} from 'src/ui/pages/Profile/ProfilePhotoModels.ts'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
import { AuthStateType } from 'src/recoil/state/AuthRecoil.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { AsyncU } from 'src/util/common/AsyncU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { DateTime } from '@util/DateTime.ts'
import { RangeU } from 'src/util/common/RangeU'
import * as uuid from 'uuid'
import throttle = AsyncU.throttle
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import FormValues = ProfilePageValidation.FormValues
import AddProfilePhotoErrorData = UserApi.AddProfilePhotoErrorData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import CurrentUserSuccessData = UserApi.CurrentUserSuccessData
import ApiResponse = ApiUtils.ApiResponse
import photosComparator = ProfilePageValidation.photosComparator
import SetterOrUpdater = TypeU.SetterOrUpdater
import UserToUpdate = UserApi.UserToUpdate
import AddProfilePhoto = UserApi.AddProfilePhoto
import findBy = ArrayU.findBy




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
  //border: 2px solid ${p=>p.theme.navButton.contentAccent[0]};

  width: 6px;
  height: 6px;
  background: #eeeeee;
`
export const dotActive = (t: AppTheme.Theme)=>css`
  //width: 12px;
  //height: 12px;
  
  background: ${t.photos.highlightFrameAccentBg[0]};
`
*/










export const currentUserPhotosToProfilePhotos =
  (photos: CurrentUser['photos']): ProfilePhoto[] => {
    const profilePhotos: ProfilePhoto[] =
      ArrayU.arrOfIndices(6).map(i => ({
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
    userToUpdate.gender = values.gender as Gender
  }
  if (!failedFields.includes('aboutMe')){
    userToUpdate.aboutMe = values.aboutMe
  }
  
  if (!failedFields.includes('photos')){
    const [fwd] =
      ArrayU.diff2(values.initialValues.photos, values.photos, photosComparator)
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
      photos: ArrayU.combine(
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
        photos: ArrayU.combine(
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
          photos: ArrayU.combine(
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
          photos: ArrayU.combine(
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
    
    
    for await (const photo of addPhotos) {
      const getUpload = () => findBy(uploads, elem => elem.id===photo.id).elem
      
      const updatePhotoNow = (p: Partial<ProfilePhoto>) => {
        const upload = getUpload()
        if (upload) setFormValues(s => ({ ...s,
          photos: mapFirstToIfFoundBy(s.photos,
            elem => ({ ...elem, ...p }),
            elem => elem.upload?.id===upload.id
          ),
        }))
      }
      const updatePhoto = throttle(
        RangeU.map(Math.random(), [0, 1], [1500, 2000]),
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
      if (!updatedUserResponse.isSuccess) {
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


