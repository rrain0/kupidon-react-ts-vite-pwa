import React from 'react'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const ChatPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol>
          
            <Hdrs.Page>{titleText.chat}</Hdrs.Page>
          
          
          
          
          
          
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      <BottomButtonBar />
      
    </>
  )
})
export default ChatPage


