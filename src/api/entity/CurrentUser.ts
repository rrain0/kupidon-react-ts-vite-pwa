import { GenderEnum } from 'src/api/entity/GenderEnum'




export type CurrentUser = {
  id: string
  email: string
  emailVerified: boolean
  roles: string[]
  created: string
  updated: string
  name: string
  birthDate: string
  gender: GenderEnum
  aboutMe: string
  photos: Array<{
    id: string,
    index: number,
    name: string,
    mimeType: string,
    url: string,
  }>
}