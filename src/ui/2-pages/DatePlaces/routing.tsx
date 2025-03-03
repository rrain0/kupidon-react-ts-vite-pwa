import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DateCategoriesData, DateCategoryType } from 'src/ui-data/special/DateCategoriesData.ts'
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
  
  const type = searchType && Object.hasOwn(DatePlaceTypeData, searchType)
    ? searchType as DatePlaceType
    : undefined
  const category = searchCategory && Object.hasOwn(DateCategoriesData, searchCategory)
    ? searchCategory as DateCategoryType
    : undefined
  const defaultCategory: DateCategoryType = 'allPageOfPreviews'
  
  
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
  
  return (
    <>
      <Navigate
        to={
          RootRoute.datePlaces[fullParams]({
            anySearchParams: search,
            allowedNameParams: {
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
