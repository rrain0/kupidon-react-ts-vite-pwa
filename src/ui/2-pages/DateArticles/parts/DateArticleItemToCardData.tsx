import { TypeU } from '@util/common/TypeU.ts'
import React, { useMemo } from 'react'
import { emptyUiText } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import {
  DateArticleItem,
  DateArticleCategoriesData,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticlesData } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import {
  DateArticleTypesData,
} from 'src/ui-data/special/date-article/DateArticleTypesData.ts'
import assertNever = TypeU.assertNever
import Pu = TypeU.Pu





export type DateArticleItemToCardDataRenderProps = {
  articleItem: DateArticleItem
  title: string
  picture: string
  showToRead: boolean
  shortDescription?: string | undefined
}


export type DateArticleItemToCardDataProps = {
  articleItem: DateArticleItem
} & Pu<{
  children: (props: DateArticleItemToCardDataRenderProps) => React.ReactNode
}>

const DateArticleItemToCardData = React.memo((props: DateArticleItemToCardDataProps) => {
  const {
    articleItem: ait,
    children,
  } = props
  
  const data = (() => {
    if (ait.type === 'category') {
      const category = DateArticleCategoriesData[ait.itemCategory]
      const type = DateArticleTypesData[category.itemType]
      return {
        title: type.name,
        picture: type.picture,
        isArticle: false,
      }
    }
    if (ait.type === 'type') {
      const type = DateArticleTypesData[ait.itemType]
      return {
        title: type.name,
        picture: type.picture,
        isArticle: false,
      }
    }
    if (ait.type === 'item') {
      const item = DateArticlesData.find(a => a.id === ait.itemId)
      if (!item) return undefined
      return {
        title: item.title,
        picture: item.picture,
        isArticle: true,
        shortDescription: item.shortDescription,
      }
    }
    return assertNever(ait)
  })()
  
  const uiValues = useMemo(() => ({
    title: data?.title ?? emptyUiText,
  }), [data?.title])
  const uiText = useUiValues(uiValues)
  
  if (!data) return undefined
  
  return children?.({
    articleItem: ait,
    title: uiText.title!,
    picture: data.picture,
    showToRead: data.isArticle,
  })
})
DateArticleItemToCardData.displayName = 'DateArticleItemToCardData'
export default DateArticleItemToCardData
