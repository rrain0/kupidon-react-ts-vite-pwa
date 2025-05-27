import React from 'react'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'





const ChatPage = React.memo(() => {
  
  
  
  return (
    <>
    
      <PageLayout col>
        <PageContentLayout colSm grow ptDefault={12}>
          
          Здесь будет чат
          
        </PageContentLayout>
      </PageLayout>
      
      {/* <BottomButtonBar/> */}
      
    </>
  )
})
ChatPage.displayName = 'ChatPage'
export default ChatPage



