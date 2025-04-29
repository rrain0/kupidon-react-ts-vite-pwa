import React, { Suspense } from 'react'
import { Navigate, RouteObject, useMatch, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DateArticlesData } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import { clearUnknownPathEnding } from '@util/react/ReactRouterUtils.tsx'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import use = RouteBuilder.use
import full = RouteBuilder.full
import fullParams = RouteBuilder.fullParams

const DateArticlePage = React.lazy(
  () => import('src/ui/2-pages/DateArticle/DateArticlePage.tsx')
)
const DateArticleNotFoundPage = React.lazy(
  () => import('src/ui/2-pages/DateArticle/DateArticleNotFoundPage.tsx')
)



const RouteDateArticleArticleId = React.memo(() => {
  
  const idParam = 'articleId'
  const placeIdRoute = RootRoute.dateArticle.articleId[use](`:${idParam}`)
  const urlArticleId = useMatch(placeIdRoute[full]()+'/*')!.params[idParam]!
  
  const article = DateArticlesData.find(place => place.id === urlArticleId)
  
  if (!article) return (
    <Suspense fallback={<div>Loading...</div>}>
      <DateArticleNotFoundPage/>
    </Suspense>
  )
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
  const [search] = useSearchParams()
  
  return (
    <Navigate
      to={
        RootRoute.dateArticle[fullParams]({
          anySearchParams: search,
        })
      }
      replace
    />
  )
})



// path: 'date-article / ...'
export const routingDateArticle: RouteObject[] = [
  {
    path: '',
    Component: RouteDateArticle,
  },
  {
    path: RootRoute.dateArticle.articleId[path]+'/*',
    children: routingDateArticleArticleId,
  },
]
