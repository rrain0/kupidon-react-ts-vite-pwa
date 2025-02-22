import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { allDateTypes } from 'src/ui-data/special/DateTypeData.ts'
import { DateTypeCard } from 'src/ui/2-pages/DatePlaces/parts/DateTypeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'




const DatePlacesPage = React.memo(() => {
  
  const uiValues = useMemo(() => ({
    insightsAndPlacesForDate: {
      'ru-RU': 'Идеи и места для свиданий',
    },
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  
  return (
    <>
    
      <Pages.Page>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <PageHeaderBox>
              <BackBtn />
              <Hdrs.Page>{uiText.insightsAndPlacesForDate}</Hdrs.Page>
              <div />
            </PageHeaderBox>
            
            <div style={{ height: 28 }} />
            
            <DatePlacesList>
              {allDateTypes.map(dt => (
                <DateTypeCard
                  key={dt}
                  style={{ width: '100%' }}
                  type={dt}
                />
              ))}
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
