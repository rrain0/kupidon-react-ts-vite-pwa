import styled from '@emotion/styled'

import React, { useMemo } from 'react'
import {
  DateArticleCategoryItem, DateArticleTypeItem,
  DateArticleCategoriesData,
} from 'src/configs/date-article/DateArticleCategoriesData.ts'
import { DateArticlesData } from 'src/configs/date-article/DateArticlesData.ts'
import {
  DateArticleTypesData,
} from 'src/configs/date-article/DateArticleTypesData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import DateArticleCategoryRow from 'src/components/pages/DateArticles/parts/DateArticleCategoryRow.tsx'
import DateArticleItemCardWide from 'src/components/pages/DateArticles/parts/DateArticleItemCardWide.tsx'
import DateArticleItemToCardData
  from 'src/components/pages/DateArticles/parts/DateArticleItemToCardData.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'
import { assertNever } from '@utils/base/typeUtils.ts'
import col = EmotionCommon.col






export type DateArticleItemsPageProps = {
  articleItem: DateArticleCategoryItem | DateArticleTypeItem
}

const DateArticleItemsPage = React.memo((props: DateArticleItemsPageProps) => {
  const { articleItem: ait } = props
  
  const data = (() => {
    if (ait.type === 'category') {
      const category = DateArticleCategoriesData[ait.itemCategory]
      const type = DateArticleTypesData[category.itemType]
      return {
        title: type.name,
        listOfItems: category.listOfItems,
      }
    }
    if (ait.type === 'type') {
      const t = ait.itemType
      const type = DateArticleTypesData[t]
      return {
        title: type.name,
        listOfItems: DateArticlesData.filter(it => it.types.includes(t)).map(it => ({
          type: 'item' as const, itemId: it.id,
        })),
      }
    }
    return assertNever(ait)
  })()
  
  const uiValues = useMemo(() => ({
    pageTitle: data.title,
  }), [data.title])
  const uiText = useUiValues(uiValues)
  
  const items = data.listOfItems.flatMap(it => {
    if (it.type === 'itemsOfType') {
      return DateArticlesData
        .filter(ait => ait.types.includes(it.itemsType))
        .map(ait => ({ type: 'item', itemId: ait.id } as const))
    }
    return it
  })
  
  return (
    <>
      
      <PageLayout col data-display-name='DateArticleItemsPage'>
        <PageContentLayout colSm>
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            <Flex center><Hdrs.Page>{uiText.pageTitle}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <div style={{ height: 28 }}/>
          
          <DateArticlesList style={{ gap: 16 }}>
            {(() => {
              if (!items.length) return 'Пусто'
              
              return items.map(it => {
                if (it.type === 'category') {
                  const categoryName = it.itemCategory
                  const category = DateArticleCategoriesData[categoryName]
                  if (category.ui === 'row') return (
                    <DateArticleCategoryRow
                      key={JSON.stringify(it)}
                      category={categoryName}
                    />
                  )
                }
                
                return (
                  <DateArticleItemToCardData key={JSON.stringify(it)} articleItem={it}>
                    {props => <DateArticleItemCardWide {...props}/>}
                  </DateArticleItemToCardData>
                )
              })
            })()}
          </DateArticlesList>
          
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar/>
      
    </>
  )
})
DateArticleItemsPage.displayName = 'DateArticleItemsPage'
export default DateArticleItemsPage





const DateArticlesList = styled.div`
  width: 100%;
  height: fit-content;
  gap: 10px;
  ${col};
`
