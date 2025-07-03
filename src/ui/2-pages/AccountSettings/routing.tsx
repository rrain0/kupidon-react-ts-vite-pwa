import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { useCheckAuth } from 'src/ui/components/app-router/useCheckAuth.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams

const AccountSettingsPage = React.lazy(() => import(
  'src/ui/2-pages/AccountSettings/AccountSettingsPage'
))



const RouteSettingsAccount = React.memo(() => {
  
  const redirectToLogin = useCheckAuth(RootRoute.settings.account)
  if (redirectToLogin) return redirectToLogin
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <AccountSettingsPage/>
    </Suspense>
  )
})



// path: 'settings / account / ...'
export const routingSettingsAccount: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsAccount,
  },
  clearUnknownPathEnding,
]
