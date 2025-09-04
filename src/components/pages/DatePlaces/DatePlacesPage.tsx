import styled from '@emotion/styled'

import React, { useMemo } from 'react'
import { DatePlaceCategoriesData, DatePlaceCategoryType }
  from 'src/configs/date-place/DatePlaceCategoriesData.ts'
import { DatePlacesData } from 'src/configs/date-place/DatePlacesData.ts'
import { DatePlaceType, DatePlaceTypeData } from 'src/configs/date-place/DatePlaceTypeData.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Gap from '@libs/short-propsed/components/Gap.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import DatePlaceCardWide from 'src/components/pages/DatePlaces/parts/DatePlaceCardWide.tsx'
import DatePlaceCategoriesList from 'src/components/pages/DatePlaces/parts/DatePlaceCategoriesList.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import PageScrollbars from 'src/components/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'
import { ObjectUnionFix } from '@utils/base/math/typeUtils.ts'






type DatePlacesPagePropsType = { type: DatePlaceType }
type DatePlacesPagePropsCategory = { category: DatePlaceCategoryType }
export type DatePlacesPageProps = DatePlacesPagePropsType | DatePlacesPagePropsCategory

const DatePlacesPage = React.memo((props: DatePlacesPageProps) => {
  const { type, category } = props as ObjectUnionFix<DatePlacesPagePropsType, DatePlacesPagePropsCategory>
  
  const uiValues = useMemo(() => ({
    pageTitle: (() => {
      if (type) return DatePlaceTypeData[type].name
      return DatePlaceTypeData[DatePlaceCategoriesData[category].placeType].name
    })(),
  }), [category, type])
  const uiText = useUiValues(uiValues)
  
  return (
    <>
    
      <PageLayout col>
        <PageContentLayout colSm>
          
          {type && (
            <>
              <Grid cols='38px 1fr 38px' stretch>
                <Flex centerStart m={-13}><BackButton/></Flex>
                <Flex center><Hdrs.Page>{uiText.pageTitle}</Hdrs.Page></Flex>
                <Gap w={38}/>
              </Grid>
              
              <Gap h={28}/>
              
              <DatePlacesList style={{ gap: 16 }}>
                {type && (() => {
                  const places = DatePlacesData.filter(place => place.types.includes(type))
                  
                  if (!places.length) return 'Пусто'
                  
                  return places.map(place => (
                    <DatePlaceCardWide
                      key={place.id}
                      place={place}
                    />
                  ))
                })()}
              </DatePlacesList>
            </>
          )}
          
          {category && <DatePlaceCategoriesList list={DatePlaceCategoriesData[category]}/>}
          
        </PageContentLayout>
        
        <PageScrollbars/>
      </PageLayout>
      
      
      <BottomFloatingBar/>
      
    </>
  )
})
export default DatePlacesPage





const DatePlacesList = styled.div`
  width: 100%;
  height: fit-content;
  gap: 10px;
  display: grid;
  grid-template-columns: 1fr;
`
