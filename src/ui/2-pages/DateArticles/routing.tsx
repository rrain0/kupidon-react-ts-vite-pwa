import React, { Suspense } from 'react'
import { Navigate, RouteObject, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import {
  DateArticleCategoriesData,
  DateArticleCategoryType,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticleType, DateArticleTypeData } from 'src/ui-data/special/date-article/DateArticleTypeData.ts'
import { clearUnknownPathEnding } from 'src/util/ReactRouterUtils.tsx'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import fullParams = RouteBuilder.fullParams

const DateArticlesPage = React.lazy(
  () => import('src/ui/2-pages/DateArticles/DateArticlesPage.tsx')
)




const RouteDateArticles = React.memo(() => {
  
  const [search] = useSearchParams()
  const categoryParamName = RootRoute.dateArticles[params].category
  const typeParamName = RootRoute.dateArticles[params].type
  
  const searchCategory = search.get(categoryParamName)
  const searchType = search.get(typeParamName)
  
  const type = searchType && Object.hasOwn(DateArticleTypeData, searchType)
    ? searchType as DateArticleType
    : undefined
  const category = searchCategory && Object.hasOwn(DateArticleCategoriesData, searchCategory)
    ? searchCategory as DateArticleCategoryType
    : undefined
  const defaultCategory: DateArticleCategoryType = 'allPageOfRowsOfPreviews'
  
  
  if (type) return (
    <>
      <Navigate
        to={
          RootRoute.dateArticles[fullParams]({
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
        <DateArticlesPage type={type} />
      </Suspense>
    </>
  )
  
  if (category) return (
    <>
      <Navigate
        to={
          RootRoute.dateArticles[fullParams]({
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
        <DateArticlesPage category={category} />
      </Suspense>
    </>
  )
  
  return (
    <>
      <Navigate
        to={
          RootRoute.dateArticles[fullParams]({
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



// path: 'date-articles / ...'
export const routingDateArticles: RouteObject[] = [
  {
    path: '',
    Component: RouteDateArticles,
  },
  clearUnknownPathEnding,
]
