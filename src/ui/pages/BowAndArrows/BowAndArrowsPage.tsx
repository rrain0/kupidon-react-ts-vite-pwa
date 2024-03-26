import React from 'react'
import { BowAndArrowsUiText } from 'src/ui/pages/BowAndArrows/uiText.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar'
import FormHeader from 'src/ui/components/FormElements/FormHeader'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import Page = Pages.Page







const BowAndArrowsPage =
React.memo(
()=>{
  const uiText = useUiValues(BowAndArrowsUiText)
  
  
  return <>
    
    <Page>
      <Pages.Content>
        
        <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
        
        
        
        
        
      
      </Pages.Content>
      
      
      <PageScrollbars />
    </Page>
    
    <BottomButtonBar />
    
  </>
})
export default BowAndArrowsPage


