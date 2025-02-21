import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { allDateTypes } from 'src/ui-data/special/DateTypeData.ts'
import { DateTypeCard } from 'src/ui/2-pages/DatePlaces/parts/DateTypeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Calendar2GradIc = SvgGradIconsPack.Calendar2GradIc
import noScrollbars = EmotionCommon.noScrollbars
import row = EmotionCommon.row





const DatePlacesPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  
  const uiText = useMemo(() => ({
    insightsAndPlacesForDate: 'Идеи и места для свиданий',
  }), [titleText])
  
  
  return (
    <>
    
      <Pages.Page>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <PageHeaderBox>
              <div />
              <Hdrs.Page>{uiText.insightsAndPlacesForDate}</Hdrs.Page>
              <div />
              {/* <Button css={IconButtonS6.t(calendarButtonS)}>
                <Calendar2GradIc />
              </Button> */}
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
`
const calendarButtonS: AppWidgetStyle = t => [IconButtonS6.S.filled.round.lg.accent4, {
  button: { justifySelf: 'end' },
  gradIconSz: 24,
}]


const DatePlacesList = styled.div`
  width: 100%;
  height: fit-content;
  gap: 18px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
