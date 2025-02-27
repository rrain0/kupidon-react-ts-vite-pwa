import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { allDateCategories, DateCategory, DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import { DatePlacesData } from 'src/ui-data/special/DatePlacesData.ts'
import { DateType, DateTypeData } from 'src/ui-data/special/DateTypeData.ts'
import { DateCategoryCard } from 'src/ui/2-pages/DatePlaces/parts/DateCategoryCard.tsx'
import DatePlaceCard from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCard.tsx'
import DateTypeCard from 'src/ui/2-pages/DatePlaces/parts/DateTypeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import Puro = TypeU.Puro




const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места для свиданий',
  },
} satisfies UiValues


export type DatePlacesPageProps = Puro<{
  category: DateCategory
  type: DateType
}>
const DatePlacesPage = React.memo((props: DatePlacesPageProps) => {
  const { category, type } = props
  
  const uiValues = useMemo(() => ({
    pageTitle: (() => {
      if (category)
        return DateCategoryData[category].name
      if (type)
        return DateTypeData[type].name
      return uiVals.insightsAndPlacesForDate
    })(),
  }), [category, type])
  
  const uiText = useUiValues(uiValues)
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <Pages.PageHeaderBox>
              <BackBtn />
              <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
              <div style={{ width: 24 }} />
            </Pages.PageHeaderBox>
            
            <div style={{ height: 28 }} />
            
            <DatePlacesList>
              
              {!category && !type && allDateCategories.map(dc => (
                <DateCategoryCard
                  key={dc}
                  style={{ width: '100%' }}
                  category={dc}
                />
              ))}
              
              {category
                && DateCategoryData[category].dateTypes.map(dt => (
                  <DateTypeCard
                    key={dt}
                    type={dt}
                    style={{ gridColumn: '1 / -1' }}
                  />
                ))
              }
              
              {type && (() => {
                const places = DatePlacesData.filter(place => place.type.includes(type))
                if (!places.length) return 'Пусто'
                return places.map(place => (
                  <DatePlaceCard
                    key={place.id}
                    place={place}
                    style={{ gridColumn: '1 / -1' }}
                  />
                ))
              })()}
              
            </DatePlacesList>
            
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
  gap: 18px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
