import { DateU } from '@utils/date/DateU.ts'
import { ApiResponseUtils } from '@libs/api/ApiResponseUtils.ts'
import { UserCurrentA } from 'src/models/api/UserA.ts'
import { GenderA } from 'src/models/api/GenderA.ts'
import {
  MediaInArrayDUC,
  MediaOperation,
  newDefaultMediaOperation,
} from '@libs/media/Media.ts'
import { ProfilePageValidation } from 'src/components/pages/Profile/ProfilePage.validation.ts'
import { UserApi } from 'src/services/api/requests/UserApi.ts'
import { ArrayU } from 'src/utils/common/ArrayU.ts'
import { AsyncU } from 'src/utils/common/AsyncU.ts'
import { TypeU } from 'src/utils/common/TypeU.ts'
import { RangeU } from 'src/utils/common/RangeU'
import { AuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import throttle = AsyncU.withThrottle
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import FormValues = ProfilePageValidation.FormValues
import AddProfilePhotoErrorData = UserApi.AddProfilePhotoErrorData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import CurrentUserSuccessData = UserApi.CurrentUserSuccessData
import ApiResponse = ApiResponseUtils.ApiResponse
import photosComparator = ProfilePageValidation.photosComparator
import SetterOrUpdater = TypeU.SetterOrUpdater
import UserToUpdate = UserApi.UserToUpdate
import AddProfilePhoto = UserApi.profilePhotoToAdd
import findBy = ArrayU.findBy
import getCurrentTimeZoneName = DateU.getCurrentTimeZoneName




export const profileUpdateApiRequest = (
  values: FormValues,
  failedFields: (keyof FormValues)[],
  setFormValues: SetterOrUpdater<FormValues>,
  setAuth: SetterOrUpdater<AuthZustand>
) => {
  const userToUpdate: UserToUpdate = {}
  let addPhotos = [] as AddProfilePhoto[]
  
  if (!failedFields.includes('name')) {
    userToUpdate.name = values.name
  }
  if (!failedFields.includes('birthDate')) {
    userToUpdate.birthDate = values.birthDate // yyyy-MM-dd
  }
  if (!failedFields.includes('gender')) {
    userToUpdate.gender = values.gender as GenderA
  }
  if (!failedFields.includes('aboutMe')) {
    userToUpdate.aboutMe = values.aboutMe
  }
  
  if (!failedFields.includes('photos')) {
    const [fwd] =
      ArrayU.diff2(values.initialValues.photos, values.photos, photosComparator)
    userToUpdate.photos = {
      remove: fwd
        .filter(it => it.isRemoved && it.fromElem.type === 'remote')
        .map(it => it.fromElem.id),
      replace: fwd
        .filter(it => it.isReplaced && it.fromElem.type === 'remote')
        .map(it => ({ id: it.fromElem.id, index: it.toIdx })),
    }
    addPhotos = values.photos
      .map((it, i) => ({ remoteI: i, photo: it }))
      .filter(it => it.photo.type === 'local' && it.photo.isReady)
      .map(it => ({
        id: it.photo.id,
        index: it.remoteI,
        name: it.photo.name,
        dataUrl: it.photo.dataUrl,
      }))
  }
  
  const apiPromise = new Promise<ApiResponse<
    CurrentUserSuccessData,
    UpdateUserErrorData | AddProfilePhotoErrorData
  >>(async (resolve, reject) => {
    let updatedUser = null as null | UserCurrentA
    
    let uploads = addPhotos.map(it => ({
      ...newDefaultMediaOperation(),
      id: it.id,
    }))
    setFormValues(s => ({ ...s,
      photos: ArrayU.combine(
        s.photos, uploads,
        (photo, upload) => ({ ...photo, upload } satisfies MediaInArrayDUC),
        (photo, upload) => photo.id === upload.id
      ),
    }))
    
    const updateMediaUpload = (
      updateForUpload: MediaOperation,
      updateForPhoto?: Partial<MediaInArrayDUC>,
    ) => {
      setFormValues(s => ({ ...s,
        photos: mapFirstToIfFoundBy({
          arr: s.photos,
          filter: elem => elem.upload?.id === updateForUpload.id,
          mapper: elem => ({
            ...elem, ...updateForPhoto,
            upload: { ...elem.upload, ...updateForUpload },
          }),
        }),
      }))
    }
    const delayShowUploadTimerId = setTimeout(() => {
      uploads.forEach(upload => updateMediaUpload(upload, { showUploadProgress: true }))
    }, 2000)
    
    const applyUpdatedUser = () => {
      clearTimeout(delayShowUploadTimerId)
      setFormValues(s => ({ ...s,
        photos: ArrayU.combine(
          s.photos, uploads,
          (photo, upload) => (
            { ...photo, upload: undefined } satisfies MediaInArrayDUC
          ),
          (photo, upload) => photo.id === upload.id
        ),
      }))
      const u = updatedUser
      if (u) {
        // работает при условии, что во время обновления другой клиент не обновит фотки
        setFormValues(s => ({ ...s,
          photos: ArrayU.combine(
            s.photos, values.photos,
            (photo, usedPhoto) => ({
              ...photo,
              type: 'remote',
              isReady: usedPhoto.isReady,
            } satisfies MediaInArrayDUC),
            (photo, usedPhoto) => photo.id === usedPhoto.id && usedPhoto.type === 'local'
          ),
        }))
        setFormValues(s => ({ ...s,
          photos: ArrayU.combine(
            s.photos, values.photos,
            (photo, usedPhoto, photoI, usedPhotoI) => ({
              ...photo, remoteI: usedPhotoI,
            } satisfies MediaInArrayDUC),
            (photo, usedPhoto) => photo.remoteI === usedPhoto.remoteI
          ),
        }))
        setAuth(s => ({ ...s, user: u }))
      }
    }
    
    
    {
      const userUpdateResponse = await UserApi.update(userToUpdate, getCurrentTimeZoneName())
      if (!userUpdateResponse.isSuccess) {
        reject(userUpdateResponse)
        return undefined
      }
      updatedUser = userUpdateResponse.data.user
    }
    
    
    // TODO Photos - think about how to abort upload
    for (const photo of addPhotos) {
      const getUpload = () => findBy(uploads, elem => elem.id === photo.id).elem
      
      const abortCtrl = new AbortController()
      const uploadStart = {
        upload: {
          ...getUpload()!,
          abort: reason => abortCtrl.abort(reason),
        },
      } satisfies Partial<MediaInArrayDUC>
      
      setFormValues(form => ({ ...form,
        photos: mapFirstToIfFoundBy({
          arr: form.photos,
          filter: photo => photo.upload?.id === uploadStart.upload.id,
          mapper: photo => ({ ...photo, ...uploadStart }),
        }),
      }))
      
      
      const updatePhoto = (
        photoUpdate?: Partial<MediaInArrayDUC>,
        uploadUpdate?: Partial<MediaOperation>,
      ) => {
        const upload = getUpload()
        if (upload) setFormValues(form => ({ ...form,
          photos: mapFirstToIfFoundBy({
            arr: form.photos,
            filter: photo => photo.upload?.id === upload.id,
            mapper: photo => ({ ...photo,
              ...photoUpdate,
              ...uploadUpdate && photo.upload && {
                upload: { ...photo.upload, ...uploadUpdate },
              },
            }),
          }),
        }))
      }
      const updatePhotoThrottled = throttle(
        RangeU.random(1500, 2300), updatePhoto
      )
      
      
      const onProgress = (p = 0) => {
        //console.log(`progress ${photo.id} ${p}`)
        const upload = getUpload()
        if (upload) updatePhotoThrottled(undefined, { progress: p })
      }
      
      const updatedUserResponse = await UserApi.addProfilePhoto(
        photo, { onProgress, abortCtrl: abortCtrl }
      )
      abortCtrl.signal.throwIfAborted()
      
      updatePhoto({ upload: undefined })
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


