import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import CheckAuth from 'src/components/components/app-router/CheckAuth.tsx'

const PwdChangePage = React.lazy(
  () => import('src/components/pages/PwdChange/PwdChangePage.tsx')
)



const RouteSettingsPwdChange = React.memo(() => {
  return (
    <CheckAuth>
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <PwdChangePage/>
      </Suspense>
    </CheckAuth>
  )
})



// path: 'settings / pwdChange / ...'
export const routingSettingsPwdChange: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsPwdChange,
  },
  clearUnknownPathEnding,
]
