import {
  Compressible,
  Downloadable,
  MediaInArray,
  newDefaultRemoteMediaInArray,
  Uploadable,
} from 'src/ui-data/models/media/Media.ts'



export interface ProfilePhoto
  extends MediaInArray, Compressible, Downloadable, Uploadable { }

export const newDefaultProfilePhoto = (): ProfilePhoto => ({
  ...newDefaultRemoteMediaInArray(),
})
