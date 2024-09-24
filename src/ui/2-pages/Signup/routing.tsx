import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const SignupPage = React.lazy(() => import('src/ui/2-pages/Signup/SignupPage.tsx'))




// path: 'signup / <check here>'
export const signupRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]

