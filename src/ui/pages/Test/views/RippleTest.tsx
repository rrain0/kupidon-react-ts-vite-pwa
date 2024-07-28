import styled from '@emotion/styled'
import React from 'react'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import Ripple from 'src/ui/elements/Ripple/Ripple'
import { RippleS } from 'src/ui/elements/Ripple/RippleS'
import UseRipple from 'src/ui/elements/Ripple/UseRipple'
import { Pages } from 'ui/components/Pages/Pages'



const RippleTest = React.memo(
  () => {
    
    return (
      <>
        
        <Pages.SimplePage>
          <Pages.ContentFill>
            
            
            <div>Ripple</div>
            
            <UseRipple>{rippleProps => (
              <RippleFrame {...rippleProps.target}>
                <Ripple {...rippleProps.ripple} css={RippleS.filled} />
              </RippleFrame>
            )}</UseRipple>
            
            <UseRipple>{rippleProps => (
              <RippleFrame2 {...rippleProps.target}>
                <Ripple {...rippleProps.ripple} css={RippleS.filled} />
              </RippleFrame2>
            )}</UseRipple>
          
          </Pages.ContentFill>
        </Pages.SimplePage>
        
        
        <BottomButtonBar settingsBtn/>
        
      </>
    )
  }
)
export default RippleTest


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
