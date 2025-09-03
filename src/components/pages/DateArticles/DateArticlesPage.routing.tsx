import React, { Suspense } from 'react'
import { RouteObject, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import {
  DateArticleCategoriesData,
  DateArticleCategoryName,
} from 'src/configs/date-article/DateArticleCategoriesData.ts'
import { DateArticleType, DateArticleTypesData } from 'src/configs/date-article/DateArticleTypesData.ts'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import AppNavigate from 'src/components/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params

const DateArticlesPage = React.lazy(
  () => import('src/components/pages/DateArticles/DateArticleItemsPage.tsx')
)




const RouteDateArticles = React.memo(() => {
  
  const [search] = useSearchParams()
  const categoryParamName = RootRoute.dateArticles[params].category
  const typeParamName = RootRoute.dateArticles[params].type
  
  const searchCategory = search.get(categoryParamName)
  const searchType = search.get(typeParamName)
  
  const type = searchType && Object.hasOwn(DateArticleTypesData, searchType)
    ? searchType as DateArticleType
    : undefined
  const category = searchCategory && Object.hasOwn(DateArticleCategoriesData, searchCategory)
    ? searchCategory as DateArticleCategoryName
    : undefined
  const defaultCategory: DateArticleCategoryName = 'allPage'
  
  
  if (type) return (
    <>
      <AppNavigate
        toFull={RootRoute.dateArticles}
        allowedNamedParams={{
          category: null,
          type: type,
        }}
        replace
      />
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <DateArticlesPage articleItem={{ type: 'type', itemType: type }}/>
      </Suspense>
    </>
  )
  
  if (category) return (
    <>
      <AppNavigate
        toFull={RootRoute.dateArticles}
        allowedNamedParams={{
          category: category,
          type: null,
        }}
        replace
      />
      <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
        <DateArticlesPage articleItem={{ type: 'category', itemCategory: category }}/>
      </Suspense>
    </>
  )
  
  return (
    <>
      <AppNavigate
        toFull={RootRoute.dateArticles}
        allowedNamedParams={{
          category: defaultCategory,
          type: null,
        }}
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
