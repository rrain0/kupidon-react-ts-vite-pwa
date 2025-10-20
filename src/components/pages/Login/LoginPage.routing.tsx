import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'

const LoginPage = React.lazy(() => import('./LoginPage'))



const RouteLogin = React.memo(() => {
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <LoginPage/>
    </Suspense>
  )
})




// path: 'login / ...'
export const routingLogin: RouteObject[] = [
  {
    path: '',
    Component: RouteLogin,
  },
  clearUnknownPathEnding,
]


