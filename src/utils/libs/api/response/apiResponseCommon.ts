import type { ResponseError } from 'src/utils/libs/api/response/apiResponseCore.ts'



export interface NoUserResponseError extends ResponseError {
  code: 'NO_USER'
  msg: 'No users found for the requested data'
}
