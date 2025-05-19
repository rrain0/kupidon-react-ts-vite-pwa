import { ApiUtils } from 'src/api/ApiUtils'
import { User } from 'src/api/model/User.ts'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes } from 'src/api/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError




export namespace ProfileShowcaseApi {
  
  
  export type ProfileShowcaseListAllSuccessData = {
    items: User[]
  }
  export type ProfileShowcaseListAllErrorData = AuthenticationError | TechnicalError
  export const listAll = async () => {
    return handleAuthenticatedResponse<
      ProfileShowcaseListAllSuccessData, ProfileShowcaseListAllErrorData
    >(
      axAccess.get(ApiRoutes.profileShowcaseListAll)
    )
  }
  
  
  
}
