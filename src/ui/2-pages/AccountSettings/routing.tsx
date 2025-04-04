import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams

const AccountSettingsPage = React.lazy(
  () => import('src/ui/2-pages/AccountSettings/AccountSettingsPage')
)



const RouteSettingsAccount = React.memo(() => {
  const [searchParams] = useSearchParams()
  const isAuth = useAuthZustand(s => s.getIsAuth())
  
  
  if (!isAuth) return (
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
