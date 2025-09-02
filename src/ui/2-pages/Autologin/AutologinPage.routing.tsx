import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const AutologinPage = React.lazy(() => import('./AutologinPage.tsx'))



const RouteAutologin = React.memo(() => {
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <AutologinPage/>
    </Suspense>
  )
})




// path: 'autologin / ...'
export const routingAutologin: RouteObject[] = [
  {
    path: '',
    Component: RouteAutologin,
  },
  clearUnknownPathEnding,
]


