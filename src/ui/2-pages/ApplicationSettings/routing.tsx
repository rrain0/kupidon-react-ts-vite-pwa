import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'

const ApplicationSettingsPage = React.lazy(
  () => import('src/ui/2-pages/ApplicationSettings/ApplicationSettingsPage')
)







// path: 'settings / app / <check here>'
export const settingsApplicationRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationSettingsPage/>
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
