import { Gender } from 'src/api/model/Gender.ts'




export type CurrentUser = {
  id: string
  email: string
  emailVerified: boolean
  roles: string[]
  created: string
  updated: string
  name: string
  birthDate: string
  gender: Gender
  aboutMe: string
  photos: Array<{
    id: string,
    index: number,
    name: string,
    mimeType: string,
    url: string,
  }>
}