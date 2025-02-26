import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'

const SignupPage = React.lazy(() => import('src/ui/2-pages/Signup/SignupPage.tsx'))




const RouteSignup = React.memo(() => {
  
  useNavBar({ hide: true })
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPage />
    </Suspense>
  )
})




// path: 'signup / <check here>'
export const signupRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteSignup,
  },
  clearUnknownPathEnding,
]

