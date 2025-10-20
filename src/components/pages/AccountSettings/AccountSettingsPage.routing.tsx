import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import CheckAuth from 'src/components/components/app-router/CheckAuth.tsx'

const AccountSettingsPage = React.lazy(() => import(
  'src/components/pages/AccountSettings/AccountSettingsPage'
))



const RouteSettingsAccount = React.memo(() => {
  return (
    <CheckAuth>
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <AccountSettingsPage/>
      </Suspense>
    </CheckAuth>
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
