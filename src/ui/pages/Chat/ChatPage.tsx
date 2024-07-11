import React from 'react'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import FormHeader from 'src/ui/elements/basic-elements/Hs'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const ChatPage =
React.memo(
()=>{
  const titleText = useUiValues(TitleUiText)
  
  
  return <>
    
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
        
          <FormHeader>{titleText.chat}</FormHeader>
        
        
        
        
        
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      <PageScrollbars />
    </Pages.Page>
    
    <BottomButtonBar />
    
  </>
})
export default ChatPage


