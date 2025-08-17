import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

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


