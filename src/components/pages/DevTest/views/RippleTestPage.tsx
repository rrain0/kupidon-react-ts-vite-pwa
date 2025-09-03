import styled from '@emotion/styled'
import React from 'react'
import { RippleS6 } from 'src/components/elems/Ripple/RippleS6.ts'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import Ripple from 'src/components/elems/Ripple/Ripple.tsx'
import UseRipple from 'src/components/elems/Ripple/UseRipple.tsx'



const RippleTestPage = React.memo(() => {
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          
          <div>Ripple</div>
          
          <UseRipple>
            {rippleProps => (
              <RippleFrame
                {...rippleProps.target}
              >
                <Ripple {...rippleProps.ripple} css={RippleS6.t(RippleS6.S.onFilled.round.full.accent)}/>
              </RippleFrame>
            )}
          </UseRipple>
          
          <UseRipple>
            {rippleProps => (
              <RippleFrame2 {...rippleProps.target}>
                <Ripple {...rippleProps.ripple} css={RippleS6.t(RippleS6.S.onFilled.round.full.accent)}/>
              </RippleFrame2>
            )}
          </UseRipple>
        
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
RippleTestPage.displayName = 'RippleTestPage'
export default RippleTestPage


const RippleFrame = styled.div`
  width: 350px;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #525354;
  position: relative;
  overflow: hidden;
`


const RippleFrame2 = styled.div`
  width: 900px;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #525354;
  position: relative;
  overflow: hidden;
`
