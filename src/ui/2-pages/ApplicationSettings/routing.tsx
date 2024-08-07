import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import ApplicationSettingsPage from 'src/ui/2-pages/ApplicationSettings/ApplicationSettingsPage'







// path: 'settings / app / <check here>'
export const settingsApplicationRouting: RouteObject[] = [
  {
    path: '',
    Component: ApplicationSettingsPage,
  },
  clearUnknownPathEnding,
]