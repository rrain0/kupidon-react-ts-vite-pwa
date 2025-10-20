import React, { Suspense } from 'react'
import { RouteObject, useMatch } from 'react-router'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { DateArticlesData } from 'src/configs/date-article/DateArticlesData.ts'
import { clearUnknownPathEnding } from '@utils/react/ReactRouterUtils.tsx'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import AppNavigate from 'src/components/components/app-router/AppNavigate.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full

const DateArticlePage = React.lazy(
  () => import('src/components/pages/DateArticle/DateArticlePage.tsx')
)
const DateArticleNotFoundPage = React.lazy(
  () => import('src/components/pages/DateArticle/DateArticleNotFoundPage.tsx')
)



const RouteDateArticleArticleId = React.memo(() => {
  
  const idParam = 'articleId'
  const placeIdRoute = RootRoute.dateArticle.articleId[use](`:${idParam}`)
  const urlArticleId = useMatch(`${placeIdRoute[full]()}/*`)!.params[idParam]!
  
  const article = DateArticlesData.find(place => place.id === urlArticleId)
  
  if (!article) return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <DateArticleNotFoundPage/>
    </Suspense>
  )
  
  return (
    <Suspense fallback={<Flex fullW h='100dvh' center>Загрузка...</Flex>}>
      <DateArticlePage article={article}/>
    </Suspense>
  )
})



// path: 'date-article / :articleId / ...'
const routingDateArticleArticleId: RouteObject[] = [
  {
    path: '',
    Component: RouteDateArticleArticleId,
  },
  clearUnknownPathEnding,
]




const RouteDateArticle = React.memo(() => {
  return (
    <AppNavigate toFull={RootRoute.dateArticle} replace/>
  )
})



// path: 'date-article / ...'
export const routingDateArticle: RouteObject[] = [
  {
    path: '',
    Component: RouteDateArticle,
  },
  {
    path: `${RootRoute.dateArticle.articleId[path]}/*`,
    children: routingDateArticleArticleId,
  },
]
