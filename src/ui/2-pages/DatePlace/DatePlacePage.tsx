import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { allDateCategories, DateCategory, DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import { DatePlace } from 'src/ui-data/special/DatePlacesData.ts'
import { allDateTypes, DateType, DateTypeData } from 'src/ui-data/special/DateTypeData.ts'
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
import fullParams = RouteBuilder.fullParams
import Puro = TypeU.Puro
import use = RouteBuilder.use



const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места для свиданий',
  },
} satisfies UiValues


export type DatePlacePageProps = {
  place: DatePlace
}
const DatePlacePage = React.memo((props: DatePlacePageProps) => {
  const { place } = props
  
  const uiValues = useMemo(() => ({
    pageTitle: place.uiText.name,
  }), [place])
  
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
            
            <DatePlaceList>
              
            
              
            </DatePlaceList>
            
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.Page>
      
      
      <BottomButtonBar />
      
    </>
  )
})
export default DatePlacePage





const DatePlaceList = styled.div`
  width: 100%;
  height: fit-content;
  gap: 18px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
