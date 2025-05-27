import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DatePlaceCategoriesData, DatePlaceCategoryType }
  from 'src/ui-data/special/date-place/DatePlaceCategoriesData.ts'
import { DatePlaceType, DatePlaceTypeData } from 'src/ui-data/special/date-place/DatePlaceTypeData.ts'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
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
  
  const type = searchType && Object.hasOwn(DatePlaceTypeData, searchType)
    ? searchType as DatePlaceType
    : undefined
  const category = searchCategory && Object.hasOwn(DatePlaceCategoriesData, searchCategory)
    ? searchCategory as DatePlaceCategoryType
    : undefined
  const defaultCategory: DatePlaceCategoryType = 'allPageOfRowsOfPreviews'
  
  
  if (type) return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNamedParams: {
              category: null,
              type: type,
            },
          })
        }
        replace
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DatePlacesPage type={type}/>
      </Suspense>
    </>
  )
  
  if (category) return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNamedParams: {
              category: category,
              type: null,
            },
          })
        }
        replace
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DatePlacesPage category={category}/>
      </Suspense>
    </>
  )
  
  return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNamedParams: {
              category: defaultCategory,
              type: null,
            },
          })
        }
        replace
      />
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
