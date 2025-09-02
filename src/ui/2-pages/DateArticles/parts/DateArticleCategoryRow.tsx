import styled from '@emotion/styled'
import { virtualOffset } from '@utils/css/virtualOffset.ts'
import React, { useMemo } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import {
  DateArticleCategoriesData,
  DateArticleCategoryName,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticlesData } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import { DateArticleTypesData } from 'src/ui-data/special/date-article/DateArticleTypesData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS.ts'
import ArticleItemLink from 'src/ui/2-pages/DateArticles/parts/ArticleItemLink.tsx'
import DateArticleItemCard from 'src/ui/2-pages/DateArticles/parts/DateArticleItemCard.tsx'
import DateArticleItemToCardData
  from 'src/ui/2-pages/DateArticles/parts/DateArticleItemToCardData.tsx'
import { ReactU } from 'src/utils/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import noScrollbars = EmotionCommon.noScrollbars
import row = EmotionCommon.row







export type DateArticleCategoryRowProps = ClassStyle & {
  category: DateArticleCategoryName
}
const DateArticleCategoryRow = React.memo((props: DateArticleCategoryRowProps) => {
  const {
    className,
    style,
    category,
  } = props
  
  const data = DateArticleCategoriesData[category]
  const typeData = DateArticleTypesData[data.itemType]
  
  const uiValues = useMemo(() => ({
    title: typeData.name,
  }), [category])
  const uiText = useUiValues(uiValues)
  
  if (data.ui !== 'row') return undefined
  
  const headerItem = data.headerItem
  
  const items = data.listOfItems.flatMap(it => {
    if (it.type === 'itemsOfType') {
      return DateArticlesData
        .filter(ait => ait.types.includes(it.itemsType))
        .map(ait => ({ type: 'item', itemId: ait.id } as const))
    }
    return it
  })
  
  return (
    <RowView
      data-display-name='DateArticleCategoryRow'
      className={className}
      style={style}
    >
      <ArticleItemLink articleItem={headerItem}>
        <HeaderArrow css={HeaderArrowS.page} noArrow={!headerItem}>
          {uiText.title}
        </HeaderArrow>
      </ArticleItemLink>
      
      <Overflow>
        <ListRow>
          {items.map(it => (
            <DateArticleItemToCardData key={JSON.stringify(it)} articleItem={it}>
              {props => <DateArticleItemCard {...props}/>}
            </DateArticleItemToCardData>
          ))}
        </ListRow>
      </Overflow>
    </RowView>
  )
})
DateArticleCategoryRow.displayName = 'DateArticleCategoryRow'
export default DateArticleCategoryRow



const RowView = styled.div`
  ${col};
  gap: 16px;
`

const Overflow = styled.div`
  box-sizing: content-box;
  // Вертикальные маргины и паддинги нужны чтобы отображать тени у карточек
  ${virtualOffset({ a: 16 })};
  width: 100%;
  height: fit-content;
  overflow: auto;
  ${noScrollbars};
  ${row};
  // Убирает расширенную тач-зону - на айос отрубает скролл
  //pointer-events: none;
`
const ListRow = styled.div`
  width: fit-content;
  height: fit-content;
  ${row};
  gap: 16px;
  //pointer-events: auto;
`




