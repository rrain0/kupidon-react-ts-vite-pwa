import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useMemo } from 'react'
import { DatePlaceCategoriesData, DatePlaceCategoryType }
  from 'src/ui-data/special/date-place/DatePlaceCategoriesData.ts'
import { DatePlacesData } from 'src/ui-data/special/date-place/DatePlacesData.ts'
import { DatePlaceType, DatePlaceTypeData } from 'src/ui-data/special/date-place/DatePlaceTypeData.ts'
import DatePlaceCardWide from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCardWide.tsx'
import DatePlaceCategoriesList from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCategoriesList.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import ObjectUnionFix = TypeU.ObjectUnionFix






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
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0 }}>
            
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
            
            {category && <DatePlaceCategoriesList list={DatePlaceCategoriesData[category]} />}
            
          </Pages.ContentColSm>
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
