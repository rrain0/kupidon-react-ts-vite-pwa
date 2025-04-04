import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const LoginPage = React.lazy(() => import('./LoginPage'))



const RouteLogin = React.memo(() => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
})




// path: 'login / ...'
export const loginRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteLogin,
  },
  clearUnknownPathEnding,
]


