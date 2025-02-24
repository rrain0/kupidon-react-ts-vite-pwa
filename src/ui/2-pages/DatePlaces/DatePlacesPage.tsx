import styled from '@emotion/styled'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { allDateCategories, DateCategory, DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import { DatePlacesData } from 'src/ui-data/special/DatePlacesData.ts'
import { allDateTypes, DateType, DateTypeData } from 'src/ui-data/special/DateTypeData.ts'
import { DateCategoryCard } from 'src/ui/2-pages/DatePlaces/parts/DateCategoryCard.tsx'
import DatePlaceCard from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCard.tsx'
import DateTypeCard from 'src/ui/2-pages/DatePlaces/parts/DateTypeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import fullParams = RouteBuilder.fullParams




const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места для свиданий',
  },
} satisfies UiValues


const DatePlacesPage = React.memo(() => {
  
  const navigate = useNavigate()
  const [search] = useSearchParams()
  
  const categoryParamName = RootRoute.datePlaces[params].category
  const typeParamName = RootRoute.datePlaces[params].type
  
  const searchCategory = search.get(categoryParamName)
  const searchType = search.get(typeParamName)
  const [category, setCategory] = useState<DateCategory | undefined>()
  const [type, setType] = useState<DateType | undefined>()
  
  useEffect(() => {
    if (allDateTypes.includes(searchType as any)) {
      const type = searchType as DateType
      navigate(RootRoute.datePlaces[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: null,
          type: type,
        },
      }), { replace: true })
      setCategory(undefined)
      setType(type)
    }
    else if (allDateCategories.includes(searchCategory as any)) {
      const category = searchCategory as DateCategory
      navigate(RootRoute.datePlaces[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: searchCategory,
          type: null,
        },
      }), { replace: true })
      setCategory(category)
      setType(undefined)
    }
    else {
      navigate(RootRoute.datePlaces[fullParams]({
        anySearchParams: search,
        allowedNameParams: {
          category: null,
          type: null,
        },
      }), { replace: true })
      setCategory(undefined)
      setType(undefined)
    }
  }, [searchCategory, searchType])
  
  const uiValues = useMemo(() => ({
    pageTitle: (() => {
      if (category)
        return DateCategoryData[category].uiText.name
      if (type)
        return DateTypeData[type].uiText.name
      return uiVals.insightsAndPlacesForDate
    })(),
  }), [category])
  
  const uiText = useUiValues(uiValues)
  
  return (
    <>
    
      <Pages.Page>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <Pages.PageHeaderBox>
              <BackBtn />
              <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
              <div />
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
      </Pages.Page>
      
      
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
