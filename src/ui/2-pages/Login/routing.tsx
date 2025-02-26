import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'

const LoginPage = React.lazy(() => import('./LoginPage'))



const RouteLogin = React.memo(() => {
  
  useNavBar({ hide: true })
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
})




// path: 'login / <check here>'
export const loginRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteLogin,
  },
  clearUnknownPathEnding,
]


