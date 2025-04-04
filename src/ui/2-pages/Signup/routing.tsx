import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const SignupPage = React.lazy(() => import('src/ui/2-pages/Signup/SignupPage.tsx'))




const RouteSignup = React.memo(() => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPage />
    </Suspense>
  )
})




// path: 'signup / ...'
export const signupRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteSignup,
  },
  clearUnknownPathEnding,
]

