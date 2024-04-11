import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/react-router/ReactRouterUtils.tsx'
import ApplicationSettingsPage from 'src/ui/pages/ApplicationSettings/ApplicationSettingsPage'







// path: 'settings / app / <check here>'
export const settingsApplicationRouting: RouteObject[] = [
  {
    path: '',
    Component: ApplicationSettingsPage,
  },
  clearUnknownPathEnding,
]