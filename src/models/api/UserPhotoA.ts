import { ArrayU } from '@utils/base/ArrayU.ts'
import {
  MediaInArrayDUC,
  newDefaultEmptyRemoteMediaInArray, newDefaultRemoteMediaInArray,
} from '@libs/media/Media.ts'
import { profilePhotosCntMax } from 'src/components/pages/Profile/ProfilePage.validation.ts'
import * as uuid from 'uuid'



export interface UserPhotoA {
  id: string
  index: number
  name: string
  ext: string
  url: string
}



export function userPhotosAToMedias(photos: UserPhotoA[]): MediaInArrayDUC[] {
  const profilePhotos = ArrayU.arrOfIndices(profilePhotosCntMax).map(i => ({
    ...newDefaultEmptyRemoteMediaInArray(i),
    // TODO id - id collision with ids from backend?
    id: uuid.v4(),
  }))
  photos.forEach(it => {
    profilePhotos[it.index] = {
      ...newDefaultRemoteMediaInArray(it.index),
      id: it.id,
      name: it.name,
      ext: it.ext,
      remoteUrl: it.url,
      isInited: true,
    }
  })
  return profilePhotos
}

