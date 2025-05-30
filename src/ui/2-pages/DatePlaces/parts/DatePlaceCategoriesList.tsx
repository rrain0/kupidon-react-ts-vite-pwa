import styled from '@emotion/styled'
import { virtualOffset } from '@util/css/virtualOffset.ts'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { DatePlaceCategoriesData, DatePlaceCategoryData }
  from 'src/ui-data/special/date-place/DatePlaceCategoriesData.ts'
import { DatePlaceTypeData } from 'src/ui-data/special/date-place/DatePlaceTypeData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS.ts'
import DatePlaceCategoryCard from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCategoryCard.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ReactU } from 'src/util/react/ReactU'
import Children = ReactU.Children
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import noScrollbars = EmotionCommon.noScrollbars
import row = EmotionCommon.row
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams




export type DatePlaceCategoriesListProps = ClassStyle & Children & {
  list: DatePlaceCategoryData
}
export const DatePlaceCategoriesList = React.memo((props: DatePlaceCategoriesListProps) => {
  const {
    className,
    style,
    list,
  } = props
  
  const typeData = DatePlaceTypeData[list.placeType]
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
        data-display-name='DatePlaceCategoriesList'
      >
        <Pages.PageHeaderWithLeftRightItems>
          <BackButton/>
          <Hdrs.Page>{uiText.title}</Hdrs.Page>
          <div css={{ width: 50, height: 50 }}/>
        </Pages.PageHeaderWithLeftRightItems>
        
        <div style={{ height: 28 }}/>
        
        <ListCols>
          {list.next.map(it => (
            <DatePlaceCategoryCard
              key={it}
              style={{ width: '100%' }}
              category={it}
            />
          ))}
        </ListCols>
      </div>
    )
    if (list.ui === 'rowOfPreviews') return (
      <RowOfPreviews list={list}/>
    )
    if (list.ui === 'pageOfRowsOfPreviews') return (
      <div
        css={col}
        className={className}
        style={style}
        data-display-name='DatePlaceCategoriesList'
      >
        <Pages.PageHeaderWithLeftRightItems>
          <BackButton/>
          <Hdrs.Page>{uiText.title}</Hdrs.Page>
          <div css={{ width: 50, height: 50 }}/>
        </Pages.PageHeaderWithLeftRightItems>
        
        <div style={{ height: 28 }}/>
        
        <div css={[col, { gap: 16 }]}>
          {list.next.map(it => {
            const category = DatePlaceCategoriesData[it]
            if (category.type === 'category' && category.ui === 'rowOfPreviews') {
              return (
                <RowOfPreviews key={it} list={category}/>
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
DatePlaceCategoriesList.displayName = 'DatePlaceCategoriesList'
export default DatePlaceCategoriesList




const ListCols = styled.div`
  width: 100%;
  height: fit-content;
  gap: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`




export type RowOfPreviewsProps = {
  list: DatePlaceCategoryData & { type: 'category', ui: 'rowOfPreviews' }
}
const RowOfPreviews = React.memo((props: RowOfPreviewsProps) => {
  const {
    list,
  } = props
  
  const typeData = DatePlaceTypeData[list.placeType]
  const uiValues = useMemo(() => ({
    title: typeData.name,
  }), [list])
  const uiText = useUiValues(uiValues)
  
  const [search] = useSearchParams()
  
  return (
    <div css={[col, { gap: 16 }]}>
      <Link
        to={RootRoute.datePlaces[fullParams]({
          anySearchParams: search,
          allowedNamedParams: {
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
            <DatePlaceCategoryCard
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
`

