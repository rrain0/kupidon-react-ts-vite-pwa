import React, { Suspense, useEffect, useState } from 'react'
import { RouteObject, useMatch, useNavigate, useSearchParams } from 'react-router-dom'
import { MockDatePlaces } from 'src/_mock-data/date-places/MockDatePlaces.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { allDateCategories, DateCategory } from 'src/ui-data/special/DateCategoryData.ts'
import { allDateTypes, DateType } from 'src/ui-data/special/DateTypeData.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full
import params = RouteBuilder.params
import fullParams = RouteBuilder.fullParams

const DatePlacesPage = React.lazy(
  () => import('src/ui/2-pages/DatePlaces/DatePlacesPage.tsx')
)
const DatePlacePage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlacePage.tsx')
)
const DatePlaceNotFoundPage = React.lazy(
  () => import('src/ui/2-pages/DatePlace/DatePlaceNotFoundPage.tsx')
)



const RouteDatePlacesPlaceId = React.memo(() => {
  
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
const routingDatePlacesPlaceId: RouteObject[] = [
  {
    path: '',
    Component: RouteDatePlacesPlaceId,
  },
  clearUnknownPathEnding,
]




const RouteDatePlaces = React.memo(() => {
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const categoryParamName = RootRoute.datePlaces[params].category
  const typeParamName = RootRoute.datePlaces[params].type
  
  const searchCategory = search.get(categoryParamName)
  const searchType = search.get(typeParamName)
  const [category, setCategory] = useState<DateCategory | undefined>()
  const [type, setType] = useState<DateType | undefined>()
  
  useEffect(() => {
    if (allDateTypes.includes(searchType as any)) {
      const type = searchType as DateType
      navigate(RootRoute.datePlaces[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: null,
          type: type,
        },
      }), { replace: true })
      setCategory(undefined)
      setType(type)
    }
    else if (allDateCategories.includes(searchCategory as any)) {
      const category = searchCategory as DateCategory
      navigate(RootRoute.datePlaces[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: searchCategory,
          type: null,
        },
      }), { replace: true })
      setCategory(category)
      setType(undefined)
    }
    else {
      navigate(RootRoute.datePlaces[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: null,
          type: null,
        },
      }), { replace: true })
      setCategory(undefined)
      setType(undefined)
    }
  }, [searchCategory, searchType])
  
  
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePlacesPage category={category} type={type} />
    </Suspense>
  )
})



// path: 'date-places / <check here>'
export const routingDatePlaces: RouteObject[] = [
  {
    path: '',
    Component: RouteDatePlaces,
  },
  {
    path: RootRoute.datePlaces.placeId[path]+'/*',
    children: routingDatePlacesPlaceId,
  },
]
