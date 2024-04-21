import React from 'react'
import HeaderArrow from 'src/ui/pages/BowAndArrows/elements/HeaderArrow.tsx'
import PageHeader from 'src/ui/pages/BowAndArrows/elements/PageHeader.tsx'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from '@util/ui-text/useUiText.ts'





const BowAndArrowsPage =
React.memo(
()=>{
  const titleText = useUiValues(TitleUiText)
  
  
  return <>
    
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
          
          <PageHeader>{titleText.bowAndArrows}</PageHeader>
          
          <HeaderArrow>Афиша</HeaderArrow>
          
          <HeaderArrow>Все события</HeaderArrow>
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      <PageScrollbars />
    </Pages.Page>
    
    <BottomButtonBar />
    
  </>
})
export default BowAndArrowsPage



