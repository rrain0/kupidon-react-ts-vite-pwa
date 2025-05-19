import { Gender } from 'src/api/model/Gender.ts'



export interface UserPhoto {
  id: string
  index: number
  name: string
  mimeType: string
  url: string
}

export interface User {
  id: string
  name: string
  birthDate: string // TODO replace by age
  gender: Gender
  aboutMe: string
  photos: UserPhoto[]
}

export interface CurrentUser {
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
  photos: UserPhoto[]
}


