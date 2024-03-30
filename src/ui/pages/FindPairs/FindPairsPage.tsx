import { css } from '@emotion/react'
import React from 'react'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'




const FindPairsPage =
React.memo(
()=>{
  
  
  
  
  return <>
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
        
          <div>Здесь будут карточки людей.</div>
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      
      <PageScrollbars />
    </Pages.Page>
    
    
    <TopButtonBar />
    
    <BottomButtonBar />
    
  </>
})
export default FindPairsPage

