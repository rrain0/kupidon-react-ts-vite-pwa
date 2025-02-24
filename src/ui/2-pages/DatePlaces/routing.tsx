import React, { Suspense } from 'react'
import { RouteObject, useMatch } from 'react-router-dom'
import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full

const DatePlacesPage = React.lazy(
  () => import('src/ui/2-pages/DatePlaces/DatePlacesPage.tsx')
)
const DatePlacePage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlacePage.tsx')
)
const DatePlaceNotFoundPage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlaceNotFoundPage.tsx')
)



const DatePlacesPlaceId = React.memo(() => {
  
  const idParam = 'placeId'
  const placeIdRoute = RootRoute.datePlaces.placeId[use](`:${idParam}`)
  const urlPlaceId = useMatch(placeIdRoute[full]()+'/*')!.params[idParam]!
  
  const place = MockDatePlaces.places.find(place => place.id === urlPlaceId)
  
  if (!place) return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePlaceNotFoundPage />
    </Suspense>
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePlacePage place={place} />
    </Suspense>
  )
})



// path: 'date-places / :placeId / <check here>'
const datePlacesPlaceIdRouting: RouteObject[] = [
  {
    path: '',
    Component: DatePlacesPlaceId,
  },
  clearUnknownPathEnding,
]



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
  {
    path: RootRoute.datePlaces.placeId[path]+'/',
    children: datePlacesPlaceIdRouting,
  },
]
