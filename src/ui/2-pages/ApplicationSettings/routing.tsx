import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import { useNavBar } from 'src/ui/1-widgets/NavBar/useNavBar.ts'

const ApplicationSettingsPage = React.lazy(
  () => import('src/ui/2-pages/ApplicationSettings/ApplicationSettingsPage')
)



const RouteSettingsApp = React.memo(() => {
  
  useNavBar({ place: 'settings' })
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationSettingsPage />
    </Suspense>
  )
})



// path: 'settings / app / <check here>'
export const settingsApplicationRouting: RouteObject[] = [
  {
    path: '',
    Component: RouteSettingsApp,
  },
  clearUnknownPathEnding,
]
