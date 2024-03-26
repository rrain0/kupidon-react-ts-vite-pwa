import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import BowAndArrowsPage from 'src/ui/pages/BowAndArrows/BowAndArrowsPage.tsx'







// path: 'bow-and-arrows / <check here>'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    Component: BowAndArrowsPage,
  },
  clearUnknownPathEnding,
]