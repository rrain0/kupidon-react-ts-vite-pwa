import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'

const BowAndArrowsPage = React.lazy(
  () => import('src/ui/2-pages/BowAndArrows/BowAndArrowsPage.tsx')
)





// path: 'bow-and-arrows / <check here>'
export const bowAndArrowsRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BowAndArrowsPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
