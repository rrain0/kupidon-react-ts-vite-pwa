import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams

const AccountSettingsPage = React.lazy(
  () => import('src/ui/2-pages/AccountSettings/AccountSettingsPage')
)



const RouteSettingsAccount = React.memo(() => {
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  
  if (!auth) return (
    <Navigate
      to={RootRoute.login[fullAllowedNameParams]({
        returnPath: RootRoute.settings.account[fullAnySearchParams](searchParams),
      })}
      replace={true}
    />
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountSettingsPage />
    </Suspense>
  )
})



// path: 'settings / account / ...'
export const settingsAccountRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsAccount,
  },
  clearUnknownPathEnding,
]
