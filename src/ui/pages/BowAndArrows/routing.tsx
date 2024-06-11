import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from '@util/ReactRouterUtils.tsx'
import BowAndArrowsPage from 'src/ui/pages/BowAndArrows/BowAndArrowsPage.tsx'







// path: 'bow-and-arrows / <check here>'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    Component: BowAndArrowsPage,
  },
  clearUnknownPathEnding,
]