import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import Slider from 'src/ui/1-widgets/Slider/Slider'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import { RangeU } from 'src/util/common/RangeU'
import NumRange = RangeU.NumRange



const SliderTestPage = React.memo(
  () => {
    
    const [range, setRange] = useState<NumRange>([0, 100])
    
    
    return (
      <>
        
        <Pages.SimplePage>
          <Pages.ContentFill>
            
            
            <div>Views: Slider</div>
            
            <div>Immediate value:</div>
            <div>from: {range[0]}</div>
            <div>to: {range[1]}</div>
            
            <SliderBox>
              <Slider minMax={[-200, 200]} range={range} setRange={setRange} />
            </SliderBox>
          
          </Pages.ContentFill>
        </Pages.SimplePage>
        
        
        <BottomButtonBar settingsBtn/>
        
      </>
    )
  }
)
export default SliderTestPage



const SliderBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 30px;
`
