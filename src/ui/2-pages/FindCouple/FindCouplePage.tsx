import React from 'react'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'




const FindCouplePage = React.memo(() => {
  
  return (
    <>
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol>
            
            <div>Здесь будут карточки людей.</div>
          
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      <TopButtonBar />
      
      <BottomButtonBar />
      
    </>
  )
})
export default FindCouplePage




