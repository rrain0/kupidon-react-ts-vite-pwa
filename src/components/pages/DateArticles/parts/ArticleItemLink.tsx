
import { ReactU } from '@utils/react/ReactU.ts'
import React from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { DateArticleItem } from 'src/configs/date-article/DateArticleCategoriesData.ts'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import Children = ReactU.Children
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import use = RouteBuilder.use
import { assertNever } from '@utils/base/TypeUtils.ts'
import { Pu } from '@utils/base/TypeUtils.ts'



export type ArticleItemLinkProps = Pu<{
  articleItem: DateArticleItem
}> & Children

export const ArticleItemLink = React.memo((props: ArticleItemLinkProps) => {
  const {
    children,
    articleItem: it,
  } = props
  
  if (!it) return children
  
  if (it.type === 'category') {
    return (
      <AppLink
        toFull={RootRoute.dateArticles}
        allowedNamedParams={{
          category: it.itemCategory,
          type: null,
        }}
      >
        {children}
      </AppLink>
    )
  }
  
  if (it.type === 'type') {
    return (
      <AppLink
        toFull={RootRoute.dateArticles}
        allowedNamedParams={{
          category: null,
          type: it.itemType,
        }}
      >
        {children}
      </AppLink>
    )
  }
  
  if (it.type === 'item') {
    const articlesParams = RootRoute.datePlaces[params]
    return (
      <AppLink
        toFull={RootRoute.dateArticle.articleId[use](it.itemId)}
        anyParams={{
          [articlesParams.category]: null,
          [articlesParams.type]: null,
        }}
      >
        {children}
      </AppLink>
    )
  }
  
  return assertNever(it)
})
ArticleItemLink.displayName = 'ArticleItemLink'
export default ArticleItemLink
