import styled from '@emotion/styled'
import React from 'react'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'



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
