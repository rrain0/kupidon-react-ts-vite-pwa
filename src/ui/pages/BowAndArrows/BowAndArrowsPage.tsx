import React from 'react'
import { BowAndArrowsUiText } from 'src/ui/pages/BowAndArrows/uiText.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import FormHeader from 'src/ui/components/FormElements/FormHeader'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'





const BowAndArrowsPage =
React.memo(
()=>{
  const uiText = useUiValues(BowAndArrowsUiText)
  
  
  return <>
    
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
          
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
          <FormHeader>{uiText.bowAndArrows.text}</FormHeader>
        
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      <PageScrollbars />
    </Pages.Page>
    
    <BottomButtonBar />
    
  </>
})
export default BowAndArrowsPage


