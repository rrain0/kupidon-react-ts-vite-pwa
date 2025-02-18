import { Downloadable, MediaInArray, newDefaultMediaInArray } from 'src/ui-data/models/Media.ts'



export interface ProfilePhoto extends MediaInArray, Downloadable {

}

export const newProfilePhoto = (): ProfilePhoto => ({
  ...newDefaultMediaInArray(),
})