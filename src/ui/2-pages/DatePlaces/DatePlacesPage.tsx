import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { allDateCategories, DateCategory, DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import { DateCategoryCard } from 'src/ui/2-pages/DatePlaces/parts/DateCategoryCard.tsx'
import DateTypeCard from 'src/ui/2-pages/DatePlaces/parts/DateTypeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import exists = TypeU.exists



const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места для свиданий',
  },
} satisfies UiValues


const DatePlacesPage = React.memo(() => {
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const categoryParamName = RootRoute.datePlaces[params].category
  const datePlacesRoute = RootRoute.datePlaces[full]()
  
  const setCategory = (category: DateCategory | null) => {
    const newSearch = new URLSearchParams(search)
    if (exists(category)) {
      newSearch.set(categoryParamName, category)
      navigate(datePlacesRoute + '?' + newSearch.toString())
    }
    else {
      newSearch.delete(categoryParamName)
      navigate(datePlacesRoute + '?' + newSearch.toString(), { replace: true })
    }
  }
  
  const searchCategory = search.get(categoryParamName)
  const [displayedCategoryName, setDisplayedCategoryName] = useState<DateCategory | undefined>()
  useEffect(() => {
    if (exists(searchCategory)) {
      if (allDateCategories.includes(searchCategory as any)) {
        setDisplayedCategoryName(searchCategory as DateCategory)
      }
      else {
        setCategory(null)
      }
    }
    else {
      setDisplayedCategoryName(undefined)
    }
  }, [searchCategory])
  
  const uiValues = useMemo(() => ({
    pageTitle: displayedCategoryName
      ? DateCategoryData[displayedCategoryName].uiText.name
      : uiVals.insightsAndPlacesForDate,
  }), [displayedCategoryName])
  
  const uiText = useUiValues(uiValues)
  
  return (
    <>
    
      <Pages.Page>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <PageHeaderBox>
              <BackBtn />
              <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
              <div />
            </PageHeaderBox>
            
            <div style={{ height: 28 }} />
            
            <DatePlacesList>
              {!displayedCategoryName && allDateCategories.map(dc => (
                <DateCategoryCard
                  key={dc}
                  style={{ width: '100%' }}
                  category={dc}
                />
              ))}
              {displayedCategoryName
                && DateCategoryData[displayedCategoryName].dateTypes.map(dt => (
                  <DateTypeCard key={dt} type={dt} style={{ gridColumn: '1 / -1' }} />
                ))
              }
            </DatePlacesList>
            
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.Page>
      
      
      <BottomButtonBar />
      
    </>
  )
})
export default DatePlacesPage




const PageHeaderBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`


const DatePlacesList = styled.div`
  width: 100%;
  height: fit-content;
  gap: 18px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
