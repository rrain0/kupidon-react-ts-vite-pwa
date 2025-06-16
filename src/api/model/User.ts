import { Gender } from 'src/api/model/Gender.ts'



export interface UserPhoto {
  id: string
  index: number
  name: string
  mimeType: string
  url: string
}

export interface OtherUser {
  id: string
  name: string
  birthDate: string // TODO replace by age
  age?: number // TODO remove ?
  gender: Gender
  aboutMe: string
  photos: UserPhoto[]
}

export interface CurrentUser {
  id: string
  email: string
  emailVerified: boolean
  roles: string[]
  createdAt: string
  updatedAt: string
  name: string
  birthDate: string
  age?: number // TODO remove ?
  gender: Gender
  aboutMe: string
  photos: UserPhoto[]
}


