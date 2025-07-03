import { OtherUserShortA } from 'src/model/api/UserA.ts'



export interface UserPairA {
  fromUserId: string
  toUserId: string
  createdAt: string
  toUser: OtherUserShortA
}