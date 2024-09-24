import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const LoginPage = React.lazy(() => import('./LoginPage'))



// path: 'login / <check here>'
export const loginRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]


