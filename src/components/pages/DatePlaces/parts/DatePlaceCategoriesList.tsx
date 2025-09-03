import styled from '@emotion/styled'
import { virtualOffset } from '@utils/css/virtualOffset.ts'
import React, { useMemo } from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { DatePlaceCategoriesData, DatePlaceCategoryData }
  from 'src/configs/date-place/DatePlaceCategoriesData.ts'
import { DatePlaceTypeData } from 'src/configs/date-place/DatePlaceTypeData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs.tsx'
import HeaderArrow from 'src/components/elems/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/components/elems/HeaderArrow/HeaderArrowS.ts'
import DatePlaceCategoryCard from 'src/components/pages/DatePlaces/parts/DatePlaceCategoryCard.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import { ReactU } from 'src/utils/react/ReactU'
import Children = ReactU.Children
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import noScrollbars = EmotionCommon.noScrollbars
import row = EmotionCommon.row
import RootRoute = AppRoutes.RootRoute
import AppLink from 'src/components/components/app-router/AppLink.tsx'




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
        
        <Grid cols='38px 1fr 38px' stretch>
          <Flex centerStart m={-13}><BackButton/></Flex>
          <Flex center><Hdrs.Page>{uiText.title}</Hdrs.Page></Flex>
          <Gap w={38}/>
        </Grid>
        
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
        
        <Grid cols='38px 1fr 38px' stretch>
          <Flex centerStart m={-13}><BackButton/></Flex>
          <Flex center><Hdrs.Page>{uiText.title}</Hdrs.Page></Flex>
          <Gap w={38}/>
        </Grid>
        
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
  
  return (
    <div css={[col, { gap: 16 }]}>
      <AppLink
        toFull={RootRoute.datePlaces}
        allowedNamedParams={{
          category: list.headerNext,
          type: null,
        }}
      >
        <HeaderArrow css={HeaderArrowS.page}>
          {uiText.title}
        </HeaderArrow>
      </AppLink>
      
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

