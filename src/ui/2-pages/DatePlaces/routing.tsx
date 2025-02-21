import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'

const DatePlacesPage = React.lazy(
  () => import('src/ui/2-pages/DatePlaces/DatePlacesPage.tsx')
)





// path: 'date-places / <check here>'
export const datePlacesRouting: RouteObject[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DatePlacesPage />
      </Suspense>
    ),
  },
  clearUnknownPathEnding,
]
