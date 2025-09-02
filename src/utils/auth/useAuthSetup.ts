import { useEffect, useState } from 'react'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useApiRequest } from '@mini-libs/api/useApiRequest.ts'
import { getAccessTokenData } from 'src/model/api/AccessTokenA.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'



export const useAuthSetup = () => {
  
  const { accessToken, user } = useAuthZustand()
  const setAuth = useAuthZustand.setState
  
  
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
  }, [accessToken, user])
  
  
  return userIsReady
}



