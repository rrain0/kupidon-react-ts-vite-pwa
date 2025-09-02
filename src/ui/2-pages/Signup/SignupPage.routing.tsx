import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const SignupPage = React.lazy(() => import('src/ui/2-pages/Signup/SignupPage.tsx'))




const RouteSignup = React.memo(() => {
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <SignupPage/>
    </Suspense>
  )
})




// path: 'signup / ...'
export const routingSignup: RouteObject[] = [
  {
    path: '',
    Component: RouteSignup,
  },
  clearUnknownPathEnding,
]

