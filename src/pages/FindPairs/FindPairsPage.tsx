/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/components/Page/Pages'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import Page = Pages.Page
import SimpleContent = Pages.SimpleContent




const FindPairsPage =
React.memo(
()=>{
  
  
  
  
  return <>
    <Page>
      <SimpleContent>
        
        <div>Здесь будут карточки людей.</div>
        
      </SimpleContent>
      
      
      <PageScrollbars />
    </Page>
    
    
    <TopButtonBar />
    
    <BottomButtonBar />
    
  </>
})
export default FindPairsPage

