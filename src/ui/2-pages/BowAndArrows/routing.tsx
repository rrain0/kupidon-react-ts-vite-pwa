import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import BowAndArrowsPage from 'src/ui/2-pages/BowAndArrows/BowAndArrowsPage.tsx'







// path: 'bow-and-arrows / <check here>'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    Component: BowAndArrowsPage,
  },
  clearUnknownPathEnding,
]