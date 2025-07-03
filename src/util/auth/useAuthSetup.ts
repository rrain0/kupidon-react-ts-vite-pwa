import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { MockData } from 'src/_mock-data/MockData.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { getAccessTokenData } from 'src/model/api/AccessTokenA.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'



const useAccountParamName = 'useAccount'


export const useAuthSetup = () => {
  
  const [search, setSearch] = useSearchParams()
  const usedAccount = search.get(useAccountParamName)
  
  const { accessToken, user } = useAuthZustand()
  const setAuth = useAuthZustand.setState
  
  
  const [accessTokenIsReady, setAccessTokenIsReady] = useState(false)
  
  useEffect(() => {
    if (usedAccount === 'test') {
      const testAccessToken = MockData.account.testUserAccessToken
      if (accessToken !== testAccessToken) {
        setAuth({ accessToken: testAccessToken })
        const newSearch = new URLSearchParams(search)
        newSearch.delete(useAccountParamName)
        setSearch(newSearch)
      }
      else setAccessTokenIsReady(true)
    }
    else setAccessTokenIsReady(true)
  }, [usedAccount, accessToken])
  
  
  const [needToFetchUser, setNeedToFetchUser] = useState(false)
  const [userIsReady, setUserIsReady] = useState(false)
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(UserApi.current)
    
    useEffect(() => {
      if (needToFetchUser) startRequest()
    }, [needToFetchUser])
    
    useEffect(() => {
      if (isSuccess) setAuth({ user: data.user })
      if (isError) console.warn('failed to fetch user:', error)
    }, [isFinished])
  }
  
  
  useEffect(() => {
    if (accessTokenIsReady) {
      if (!accessToken && user) setAuth({ user: undefined })
      if (!accessToken && !user) setUserIsReady(true)
      if (accessToken && user) {
        const tokenUserId = getAccessTokenData(accessToken).userId
        if (tokenUserId !== user.id) setAuth({ user: undefined })
        else setUserIsReady(true)
      }
      if (accessToken && !user) {
        setNeedToFetchUser(true)
      }
    }
  }, [accessToken, accessTokenIsReady, user])
  
  
  return accessTokenIsReady && userIsReady
}



