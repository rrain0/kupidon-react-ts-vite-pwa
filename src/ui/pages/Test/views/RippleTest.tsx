import styled from '@emotion/styled'
import React from 'react'
import Ripple from 'src/ui/elements/Ripple/Ripple'
import UseRipple from 'src/ui/elements/Ripple/UseRipple'
import { Pages } from 'ui/components/Pages/Pages'



const RippleTest = React.memo(
  () => {
    
    return (
      <Pages.SimplePage>
        <Pages.ContentFill>
          
          
          <div>Ripple</div>
          
          <UseRipple>{rippleProps => (
            <RippleFrame {...rippleProps.target}>
              <Ripple {...rippleProps.ripple}/>
            </RippleFrame>
          )}</UseRipple>
          
        </Pages.ContentFill>
      </Pages.SimplePage>
    )
  }
)
export default RippleTest


const RippleFrame = styled.div`
  width: 350px;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #aaaaaa66;
  overflow: hidden;
  position: relative;
`
