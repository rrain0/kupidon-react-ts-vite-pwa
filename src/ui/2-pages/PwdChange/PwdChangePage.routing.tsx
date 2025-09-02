import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import CheckAuth from 'src/ui/components/app-router/CheckAuth.tsx'

const PwdChangePage = React.lazy(
  () => import('src/ui/2-pages/PwdChange/PwdChangePage.tsx')
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
