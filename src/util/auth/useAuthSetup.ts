import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { MockData } from 'src/_mock-data/MockData.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useAsyncEffect } from 'src/util/react/useAsyncEffect.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import * as jose from 'jose'



const useAccountParamName = 'useAccount'


export const useAuthSetup = () => {
  
  const [search, setSearch] = useSearchParams()
  const usedAccount = search.get(useAccountParamName)
  
  const { accessToken, user } = useAuthZustand()
  const setAuth = useAuthZustand.setState
  
  
  const [accessTokenIsReady, setAccessTokenIsReady] = useState(false)
  
  useEffect(() => {
    console.log('usedAccount', usedAccount, 'accessToken', accessToken)
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
  
  
  const [userIsReady, setUserIsReady] = useState(false)
  
  
  // TODO Api request - make hook
  const [needToFetchUser, setNeedToFetchUser] = useState(false)
  const [isFetchingUser, setFetchingUser] = useState(false)
  useAsyncEffect((lock, unlock) => {
    if (needToFetchUser && !isFetchingUser
      && lock(UserApi.current)
    ) {
      setNeedToFetchUser(false)
      setFetchingUser(true)
      ;(async() => {
        try {
          const resp = await UserApi.current()
          if (resp.isSuccess)
            setAuth({ user: resp.data.user })
          else
            console.warn('failed to fetch user:', resp)
        }
        finally {
          setFetchingUser(false)
          unlock(UserApi.current)
        }
      })()
    }
  }, [needToFetchUser, isFetchingUser])
  
  
  useEffect(() => {
    if (accessTokenIsReady) {
      if (!accessToken && user) setAuth({ user: undefined })
      if (!accessToken && !user) setUserIsReady(true)
      if (accessToken && user) {
        const decodedAccess = jose.decodeJwt(accessToken)
        if (decodedAccess.sub !== user.id) setAuth({ user: undefined })
        else setUserIsReady(true)
      }
      if (accessToken && !user) {
        setNeedToFetchUser(true)
      }
    }
  }, [accessToken, accessTokenIsReady, user])
  
  
  return accessTokenIsReady && userIsReady
}
