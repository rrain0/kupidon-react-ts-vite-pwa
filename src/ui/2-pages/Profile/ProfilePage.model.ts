import {
  Convertible,
  Downloadable,
  MediaInArray,
  newDefaultRemoteMediaInArray,
  Uploadable,
} from 'src/ui-data/models/media/Media.ts'



export interface ProfilePhoto
  extends MediaInArray, Convertible, Downloadable, Uploadable { }

export const newDefaultProfilePhoto = (): ProfilePhoto => ({
  ...newDefaultRemoteMediaInArray(),
})
