import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { DateCategoriesData, DateCategoryType } from 'src/ui-data/special/DateCategoriesData.ts'
import { DatePlacesData } from 'src/ui-data/special/DatePlacesData.ts'
import { DatePlaceType, DatePlaceTypeData } from 'src/ui-data/special/DatePlaceTypeData.ts'
import DatePlaceCard from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCard.tsx'
import ListWithHeader from 'src/ui/2-pages/DatePlaces/parts/ListWithHeader.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import ObjectUnionFix = TypeU.ObjectUnionFix






/* const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места для свиданий',
  },
} satisfies UiValues */


type DatePlacesPagePropsType = { type: DatePlaceType }
type DatePlacesPagePropsCategory = { category: DateCategoryType }
export type DatePlacesPageProps = DatePlacesPagePropsType | DatePlacesPagePropsCategory

const DatePlacesPage = React.memo((props: DatePlacesPageProps) => {
  const { type, category } = props as ObjectUnionFix<DatePlacesPagePropsType, DatePlacesPagePropsCategory>
  
  const uiValues = useMemo(() => ({
    pageTitle: (() => {
      if (type) return DatePlaceTypeData[type].name
      return DatePlaceTypeData[DateCategoriesData[category].placeType].name
    })(),
  }), [category, type])
  const uiText = useUiValues(uiValues)
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            {!type && category && (
              <ListWithHeader list={DateCategoriesData[category]} />
            )}
            
            {type && (
              <>
                <Pages.PageHeaderWithLeftRight>
                  <BackBtn />
                  <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
                  <div css={{ width: 50, height: 50 }} />
                </Pages.PageHeaderWithLeftRight>
                
                <div style={{ height: 28 }} />
                
                <DatePlacesList style={{ gap: 16 }}>
                  {type && (() => {
                    const places = DatePlacesData.filter(place => place.type.includes(type))
                    
                    if (!places.length) return 'Пусто'
                    
                    return places.map(place => (
                      <DatePlaceCard
                        key={place.id}
                        place={place}
                      />
                    ))
                  })()}
                </DatePlacesList>
              </>
            )}
            
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      <BottomButtonBar />
      
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
