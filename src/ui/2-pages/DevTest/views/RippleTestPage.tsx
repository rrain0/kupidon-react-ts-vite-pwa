import styled from '@emotion/styled'
import React from 'react'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'



const RippleTestPage = React.memo(() => {
  
  return (
    <>
      
      <Pages.Page>
        <Pages.Content>
          
          
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
        
        </Pages.Content>
      </Pages.Page>
      
      
      <BottomButtonBar settingsBtn/>
      
    </>
  )
})
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
