import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import {
  DateArticleCategoriesData,
  DateArticleCategoryData,
} from 'src/ui-data/special/date-article/DateArticleCategoriesData.ts'
import { DateArticleTypeData } from 'src/ui-data/special/date-article/DateArticleTypeData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS.ts'
import DateArticleCategoryCard from 'src/ui/2-pages/DateArticles/parts/DateArticleCategoryCard.tsx'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ReactU } from 'src/util/react/ReactU'
import Children = ReactU.Children
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import noScrollbars = EmotionCommon.noScrollbars
import row = EmotionCommon.row
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams




export type DateArticleCategoriesListProps = ClassStyle & Children & {
  list: DateArticleCategoryData
}
export const DateArticleCategoriesList = React.memo((props: DateArticleCategoriesListProps) => {
  const {
    className,
    style,
    list,
  } = props
  
  const typeData = DateArticleTypeData[list.articleType]
  const uiValues = useMemo(() => ({
    title: typeData.name,
  }), [list])
  const uiText = useUiValues(uiValues)
  
  if (list.type === 'category') {
    if (list.ui === 'page') return (
      <div 
        css={col}
        className={className}
        style={style}
        data-display-name="DateArticleCategoriesList"
      >
        <Pages.PageHeaderWithLeftRight>
          <BackBtn />
          <Hdrs.Page>{uiText.title}</Hdrs.Page>
          <div css={{ width: 50, height: 50 }} />
        </Pages.PageHeaderWithLeftRight>
        
        <div style={{ height: 28 }} />
        
        <ListCols>
          {list.next.map(it => (
            <DateArticleCategoryCard
              key={it}
              style={{ width: '100%' }}
              category={it}
            />
          ))}
        </ListCols>
      </div>
    )
    if (list.ui === 'rowOfPreviews') return (
      <RowOfPreviews list={list} />
    )
    if (list.ui === 'pageOfRowsOfPreviews') return (
      <div
        css={col}
        className={className}
        style={style}
        data-display-name="DateArticleCategoriesList"
      >
        <Pages.PageHeaderWithLeftRight>
          <BackBtn />
          <Hdrs.Page>{uiText.title}</Hdrs.Page>
          <div css={{ width: 50, height: 50 }} />
        </Pages.PageHeaderWithLeftRight>
        
        <div style={{ height: 28 }} />
        
        <div css={[col, { gap: 16 }]}>
          {list.next.map(it => {
            const category = DateArticleCategoriesData[it]
            if (category.type === 'category' && category.ui === 'rowOfPreviews') {
              return (
                <RowOfPreviews key={it} list={category} />
              )
            }
            return undefined
          })}
        </div>
      </div>
    )
  }
  
  return undefined
})
DateArticleCategoriesList.displayName = 'DateArticleCategoriesList'
export default DateArticleCategoriesList




const ListCols = styled.div`
  width: 100%;
  height: fit-content;
  gap: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`




export type RowOfPreviewsProps = {
  list: DateArticleCategoryData & { type: 'category', ui: 'rowOfPreviews' }
}
const RowOfPreviews = React.memo((props: RowOfPreviewsProps) => {
  const {
    list,
  } = props
  
  const typeData = DateArticleTypeData[list.articleType]
  const uiValues = useMemo(() => ({
    title: typeData.name,
  }), [list])
  const uiText = useUiValues(uiValues)
  
  const [search] = useSearchParams()
  
  return (
    <div css={[col, { gap: 16 }]}>
      <Link
        to={RootRoute.dateArticles[fullParams]({
          anySearchParams: search,
          allowedNameParams: {
            category: list.headerNext,
            type: null,
          },
        })}
      >
        <HeaderArrow css={HeaderArrowS.page}>
          {uiText.title}
        </HeaderArrow>
      </Link>
      
      <Overflow>
        <ListRow>
          {list.next.map(it => (
            <DateArticleCategoryCard
              key={it}
              category={it}
            />
          ))}
        </ListRow>
      </Overflow>
    </div>
  )
})





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

