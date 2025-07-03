import { GenderA } from 'src/model/api/GenderA.ts'



export interface OtherUserShortA {
  id: string
  name: string
  ava: string
  online?: boolean
}


export interface UserPhotoA {
  id: string
  index: number
  name: string
  mimeType: string
  url: string
}

export interface OtherUserA {
  id: string
  name: string
  birthDate: string // TODO replace by age
  age: number
  gender: GenderA
  aboutMe: string
  photos: UserPhotoA[]
}

export interface CurrentUserA {
  id: string
  email: string
  emailVerified: boolean
  roles: string[]
  createdAt: string
  updatedAt: string
  name: string
  birthDate: string
  age: number
  gender: GenderA
  aboutMe: string
  photos: UserPhotoA[]
}


