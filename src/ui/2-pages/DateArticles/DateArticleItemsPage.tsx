import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useMemo } from 'react'
import {
  DateArticleCategoryItem, DateArticleTypeItem,
  DateArticleCategoriesData,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticlesData } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import {
  DateArticleTypesData,
} from 'src/ui-data/special/date-article/DateArticleTypesData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import DateArticleCategoryRow from 'src/ui/2-pages/DateArticles/parts/DateArticleCategoryRow.tsx'
import DateArticleItemCardWide from 'src/ui/2-pages/DateArticles/parts/DateArticleItemCardWide.tsx'
import DateArticleItemToCardData
  from 'src/ui/2-pages/DateArticles/parts/DateArticleItemToCardData.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import assertNever = TypeU.assertNever
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
      
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0 }}>
            
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
            
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars/>
      </Pages.PageGrad>
      
      
      <BottomFloatingBar/>
      
    </>
  )
})
export default DateArticleItemsPage





const DateArticlesList = styled.div`
  width: 100%;
  height: fit-content;
  gap: 10px;
  ${col};
`
