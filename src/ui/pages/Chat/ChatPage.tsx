import React from 'react'
import { ChatUiText } from 'src/ui/pages/Chat/uiText.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import FormHeader from 'src/ui/components/FormElements/FormHeader'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import Page = Pages.Page







const ChatPage =
React.memo(
()=>{
  const uiText = useUiValues(ChatUiText)
  
  
  return <>
    
    <Page>
      <Pages.Content>
        
        <FormHeader>{uiText.chat.text}</FormHeader>
        
        
        
        
        
      
      </Pages.Content>
      
      
      <PageScrollbars />
    </Page>
    
    <BottomButtonBar />
    
  </>
})
export default ChatPage


