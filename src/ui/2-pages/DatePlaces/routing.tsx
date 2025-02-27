import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import { DatePlaceType, DatePlaceTypeData } from 'src/ui-data/special/DatePlaceTypeData.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import fullParams = RouteBuilder.fullParams

const DatePlacesPage = React.lazy(
  () => import('src/ui/2-pages/DatePlaces/DatePlacesPage.tsx')
)




const RouteDatePlaces = React.memo(() => {
  
  const [search] = useSearchParams()
  const categoryParamName = RootRoute.datePlaces[params].category
  const typeParamName = RootRoute.datePlaces[params].type
  
  const searchCategory = search.get(categoryParamName)
  const searchType = search.get(typeParamName)
  
  const category = searchCategory && Object.hasOwn(DateCategoryData, searchCategory)
    ? searchCategory as DatePlaceType
    : undefined
  const type = searchType && Object.hasOwn(DatePlaceTypeData, searchType)
    ? searchType as DatePlaceType
    : undefined
  
  
  if (category) return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNameParams: {
              category: category,
              type: null,
            },
          })
        }
        replace
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DatePlacesPage category={category} />
      </Suspense>
    </>
  )
  
  if (type) return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNameParams: {
              category: null,
              type: type,
            },
          })
        }
        replace
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DatePlacesPage type={type} />
      </Suspense>
    </>
  )
  
  return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNameParams: {
              category: null,
              type: null,
            },
          })
        }
        replace
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DatePlacesPage />
      </Suspense>
    </>
  )
})



// path: 'date-places / ...'
export const routingDatePlaces: RouteObject[] = [
  {
    path: '',
    Component: RouteDatePlaces,
  },
  clearUnknownPathEnding,
]
