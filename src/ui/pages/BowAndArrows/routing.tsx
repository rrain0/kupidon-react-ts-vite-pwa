import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/react-router/ReactRouterUtils.tsx'
import BowAndArrowsPage from 'src/ui/pages/BowAndArrows/BowAndArrowsPage.tsx'







// path: 'bow-and-arrows / <check here>'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    Component: BowAndArrowsPage,
  },
  clearUnknownPathEnding,
]