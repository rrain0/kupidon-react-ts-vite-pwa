import React, { Suspense } from 'react'
import { Navigate, RouteObject, useMatch, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DatePlacesData } from 'src/ui-data/special/date-place/DatePlacesData.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full
import fullParams = RouteBuilder.fullParams

const DatePlacePage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlacePage.tsx')
)
const DatePlaceNotFoundPage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlaceNotFoundPage.tsx')
)



const RouteDatePlacePlaceId = React.memo(() => {
  
  const idParam = 'placeId'
  const placeIdRoute = RootRoute.datePlace.placeId[use](`:${idParam}`)
  const urlPlaceId = useMatch(placeIdRoute[full]()+'/*')!.params[idParam]!
  
  const place = DatePlacesData.find(place => place.id === urlPlaceId)
  
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



// path: 'date-place / :placeId / ...'
const routingDatePlacePlaceId: RouteObject[] = [
  {
    path: '',
    Component: RouteDatePlacePlaceId,
  },
  clearUnknownPathEnding,
]




const RouteDatePlace = React.memo(() => {
  const [search] = useSearchParams()
  
  return (
    <Navigate
      to={
        RootRoute.datePlace[fullParams]({
          anySearchParams: search,
        })
      }
      replace
    />
  )
})



// path: 'date-place / ...'
export const routingDatePlace: RouteObject[] = [
  {
    path: '',
    Component: RouteDatePlace,
  },
  {
    path: RootRoute.datePlace.placeId[path]+'/*',
    children: routingDatePlacePlaceId,
  },
]
