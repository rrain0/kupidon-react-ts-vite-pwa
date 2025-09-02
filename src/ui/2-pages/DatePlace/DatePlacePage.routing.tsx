import React, { Suspense } from 'react'
import { RouteObject, useMatch } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DatePlacesData } from 'src/ui-data/special/date-place/DatePlacesData.ts'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import AppNavigate from 'src/ui/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full

const DatePlacePage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlacePage.tsx')
)
const DatePlaceNotFoundPage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlaceNotFoundPage.tsx')
)



const RouteDatePlacePlaceId = React.memo(() => {
  
  const idParam = 'placeId'
  const placeIdRoute = RootRoute.datePlace.placeId[use](`:${idParam}`)
  const urlPlaceId = useMatch(`${placeIdRoute[full]()}/*`)!.params[idParam]!
  
  const place = DatePlacesData.find(place => place.id === urlPlaceId)
  
  if (!place) return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <DatePlaceNotFoundPage/>
    </Suspense>
  )
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <DatePlacePage place={place}/>
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
  return (
    <AppNavigate
      toFull={RootRoute.datePlace}
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
    path: `${RootRoute.datePlace.placeId[path]}/*`,
    children: routingDatePlacePlaceId,
  },
]
