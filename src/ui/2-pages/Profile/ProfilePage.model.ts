import {
  Compressible,
  Downloadable,
  MediaInArray,
  newDefaultMediaInArray,
  Uploadable,
} from 'src/ui-data/models/Media.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import noop = TypeU.noop




export const DefaultOperation = {
  id: '',
  progress: 0, // 0..100
  showProgress: true,
  abort: noop,
}
export type Operation = typeof DefaultOperation





export interface ProfilePhoto
  extends MediaInArray/* , Compressible, Downloadable, Uploadable */ {
  
  compression: Operation | undefined
  download: Operation | undefined
  upload: Operation | undefined
}



export const DefaultProfilePhoto: ProfilePhoto = {
  ...newDefaultMediaInArray(),
  
  compression: undefined,
  download: undefined,
  upload: undefined,
}
