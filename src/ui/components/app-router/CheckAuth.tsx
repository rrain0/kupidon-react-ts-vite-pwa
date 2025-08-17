import { ReactU } from '@util/react/ReactU.ts'
import {
  parseSearchParams,
  setSearchParam,
  stringifySearchParams,
} from '@util/url/SearchParamsU.ts'
import React, { useMemo } from 'react'
import { useLocation } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import Children = ReactU.Children



const CheckAuth = React.memo((props: Children) => {
  const { children } = props
  
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  const { pathname: path, search, hash } = useLocation()
  //console.log('location', `${location.pathname}${location.search}${location.hash}`)
  
  const [useAccount, returnPath] = useMemo(() => {
    let sp = parseSearchParams(search)
    const useAccountParam = RootRoute.login[params].useAccount
    const useAccount = sp[useAccountParam]?.[0]
    sp = setSearchParam(sp, useAccountParam, { noParam: true })
    const returnPath = `${path}${stringifySearchParams(sp)}${hash}`
    return [useAccount, returnPath]
  }, [path, search, hash])
  
  if (!isAuth) return (
    <AppNavigate
      toFull={RootRoute.login}
      allowedNamedParams={{ useAccount, returnPath }}
      noSearchFromUrl
      replace
    />
  )
  
  return children
})
CheckAuth.displayName = 'CheckAuth'
export default CheckAuth
