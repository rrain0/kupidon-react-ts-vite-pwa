import { GenderA } from 'src/model/api/GenderA.ts'




export interface UserPhotoA {
  id: string
  index: number
  name: string
  ext: string
  url: string
}



export interface UserStrangerShortA {
  id: string
  name: string
  ava: string
  online?: boolean
}

export interface UserStrangerA {
  id: string
  name: string
  ava: string
  birthDate: string // TODO replace by age
  age: number
  gender: GenderA
  aboutMe: string
  photos: UserPhotoA[]
}

export interface UserAcquaintanceShortA {
  id: string
  name: string
  ava: string
  online: boolean
}

export interface UserCurrentA {
  id: string
  roles: string[]
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  name: string
  ava: string
  birthDate: string
  age: number
  gender: GenderA
  aboutMe: string
  photos: UserPhotoA[]
  online: boolean
}


