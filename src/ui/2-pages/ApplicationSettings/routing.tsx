import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const ApplicationSettingsPage = React.lazy(
  () => import('src/ui/2-pages/ApplicationSettings/ApplicationSettingsPage')
)



const RouteSettingsApp = React.memo(() => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationSettingsPage />
    </Suspense>
  )
})



// path: 'settings / app / ...'
export const settingsApplicationRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsApp,
  },
  clearUnknownPathEnding,
]
