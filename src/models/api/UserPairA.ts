import { UserAcquaintanceShortA } from 'src/models/api/UserA.ts'



export interface UserPairA {
  fromUserId: string
  toUserId: string
  createdAt: string
  toUser: UserAcquaintanceShortA
}