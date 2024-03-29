import React from 'react'
import { ChatUiText } from 'src/ui/pages/Chat/uiText.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import FormHeader from 'src/ui/components/FormElements/FormHeader'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'







const ChatPage =
React.memo(
()=>{
  const uiText = useUiValues(ChatUiText)
  
  
  return <>
    
    <Pages.Page0>
      <Pages.Content0>
        
        <FormHeader>{uiText.chat.text}</FormHeader>
        
        
        
        
        
      
      </Pages.Content0>
      
      
      <PageScrollbars />
    </Pages.Page0>
    
    <BottomButtonBar />
    
  </>
})
export default ChatPage


