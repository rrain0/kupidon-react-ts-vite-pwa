import React from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import AccountSettingsPage from 'src/ui/2-pages/AccountSettings/AccountSettingsPage'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams



const SettingsAccountEmpty =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  return auth
    ? <AccountSettingsPage/>
    : <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.settings.account[fullAnySearchParams](searchParams)
      })}
      replace={true}
    />
})



// path: 'settings / account / <check here>'
export const settingsAccountRouting: RouteObject[] = [
  {
    path: '',
    Component: SettingsAccountEmpty
  },
  clearUnknownPathEnding,
]