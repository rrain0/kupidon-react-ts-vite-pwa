import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { useCheckAuth } from 'src/ui/components/app-router/useCheckAuth.tsx'
import RootRoute = AppRoutes.RootRoute

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
