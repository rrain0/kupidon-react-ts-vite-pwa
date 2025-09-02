import React, { Suspense } from 'react'
import { RouteObject } from 'react-router'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'

const ApplicationSettingsPage = React.lazy(() => import(
  'src/ui/2-pages/ApplicationSettings/ApplicationSettingsPage'
))



const RouteSettingsApp = React.memo(() => {
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <ApplicationSettingsPage/>
    </Suspense>
  )
})



// path: 'settings / app / ...'
export const routingSettingsApplication: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsApp,
  },
  clearUnknownPathEnding,
]
