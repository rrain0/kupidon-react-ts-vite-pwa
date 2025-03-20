import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import {
  DateArticleCategoriesData,
  DateArticleCategoryName,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticleTypesData } from 'src/ui-data/special/date-article/DateArticleTypesData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS.ts'
import ArticleItemLink from 'src/ui/2-pages/DateArticles/parts/ArticleItemLink.tsx'
import DateArticleItemCard from 'src/ui/2-pages/DateArticles/parts/DateArticleItemCard.tsx'
import { ReactU } from 'src/util/react/ReactU'
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
  
  return (
    <RowView
      data-display-name="DateArticleCategoryRow"
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
          {data.listOfItems.map(it => (
            <DateArticleItemCard
              key={JSON.stringify(it)}
              articleItem={it}
            />
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
  // Вертикальные маргин и паддинг нужны чтобы отображать тени у карточек - но тач зона расширена
  // TODO paddings
  margin: -16px -16px;
  padding: 16px 16px;
  width: calc(100% + 16px * 2);
  height: fit-content;
  overflow: auto;
  ${noScrollbars};
  ${row};
`
const ListRow = styled.div`
  width: fit-content;
  height: fit-content;
  ${row};
  gap: 16px;
`




