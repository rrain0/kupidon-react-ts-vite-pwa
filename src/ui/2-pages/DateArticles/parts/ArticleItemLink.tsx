import { TypeU } from '@util/common/TypeU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DateArticleItem } from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import Children = ReactU.Children
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams
import params = RouteBuilder.params
import use = RouteBuilder.use
import assertNever = TypeU.assertNever
import Pu = TypeU.Pu



export type ArticleItemLinkProps = Pu<{
  articleItem: DateArticleItem
}> & Children

export const ArticleItemLink = React.memo((props: ArticleItemLinkProps) => {
  const {
    children,
    articleItem: it,
  } = props
  
  const [search] = useSearchParams()
  
  if (!it) return children
  
  const link = ((): string => {
    if (it.type === 'category') {
      return RootRoute.dateArticles[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: it.itemCategory,
          type: null,
        },
      })
    }
    if (it.type === 'type') {
      return RootRoute.dateArticles[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: null,
          type: it.itemType,
        },
      })
    }
    if (it.type === 'item') {
      const articlesParams = RootRoute.datePlaces[params]
      return RootRoute.dateArticle.articleId[use](it.itemId)[fullParams]({
        anySearchParams: search,
        anyPathParams: {
          [articlesParams.category]: null,
          [articlesParams.type]: null,
        },
      })
    }
    return assertNever(it)
  })()
  
  return (
    <Link
      data-display-name="ArticleItemLink"
      to={link}
    >
      {children}
    </Link>
  )
})
ArticleItemLink.displayName = 'ArticleItemLink'
export default ArticleItemLink
