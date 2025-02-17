import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Calendar2GradIc = SvgGradIconsPack.Calendar2GradIc





const BowAndArrowsPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  
  const uiText = useMemo(() => ({
    bowAndArrows: titleText.bowAndArrows,
    poster: 'Афиша',
    allEvents: 'Все события',
  }), [titleText])
  
  
  return (
    <>
    
      <Pages.Page>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol>
            
            <PageHeaderBox>
              <div />
              <Hdrs.Page>{uiText.bowAndArrows}</Hdrs.Page>
              <Button css={IconButtonS6.t(calendarButtonS)}>
                <Calendar2GradIc />
              </Button>
            </PageHeaderBox>
            
            <div style={{ height: 27 }} />
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.poster}
            </HeaderArrow>
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.allEvents}
            </HeaderArrow>
          
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.Page>
      
      
      <BottomButtonBar />
      
    </>
  )
})
export default BowAndArrowsPage




const PageHeaderBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`
const calendarButtonS: AppWidgetStyle = t => [IconButtonS6.S.filled.round.lg.accent4, {
  button: { justifySelf: 'end' },
  gradIconSz: 24,
}]

