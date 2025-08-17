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
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import Children = ReactU.Children



// TODO Пока что нигде не используется, мб удалить это
const LoginLink = React.memo((props: Children) => {
  const { children } = props
  
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
  
  return (
    <AppLink
      toFull={RootRoute.login}
      allowedNamedParams={{ useAccount, returnPath }}
      noSearchFromUrl
    >
      {children}
    </AppLink>
  )
})
LoginLink.displayName = 'LoginLink'
export default LoginLink
