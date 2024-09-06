import React from 'react'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import PageHeader from 'src/ui/2-pages/BowAndArrows/elements/PageHeader.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'





const BowAndArrowsPage = React.memo(
  () => {
    const titleText = useUiValues(TitleUiText)
    
    
    return (
      <>
      
        <Pages.Page>
          <Pages.SafeInsets>
            <Pages.Content>
              
              <PageHeader>{titleText.bowAndArrows}</PageHeader>
              
              <HeaderArrow css={HeaderArrowS.page}>
                Афиша
              </HeaderArrow>
              
              <HeaderArrow css={HeaderArrowS.page}>
                Все события
              </HeaderArrow>
            
            </Pages.Content>
          </Pages.SafeInsets>
          
          <PageScrollbars />
        </Pages.Page>
        
        <BottomButtonBar />
        
      </>
    )
  }
)
export default BowAndArrowsPage



