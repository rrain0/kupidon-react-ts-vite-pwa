import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import Slider from 'src/ui/1-widgets/Slider/Slider'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import { RangeU } from 'src/util/common/RangeU'
import NumRange = RangeU.NumRange



const SliderTestPage = React.memo(
  () => {
    
    const [value2, setValue2] = useState(3)
    
    
    return (
      <>
        
        <Pages.SimplePage>
          <Pages.ContentFill>
            
            <div>Views: Slider</div>
            
            <div css={{ height: 24 }}/>
            
            <Slider1 />
            
            <div css={{ height: 24 }}/>
            
            <Slider2 />
            
            <div css={{ height: 24 }}/>
            
            <Slider3 />
            
            <div css={{ height: 24 }}/>
            
            <Slider4 />
            
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
  height: auto;
`



const Slider1 = React.memo(() => {
  const minMax = [-200, 200]
  const [value, setValue] = useState(0)
  
  return (
    <>
      <div>Value is not rounded</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>immediate value: {value}</div>
      
      <SliderBox>
        <Slider minMax={minMax} value={value} setValue={setValue}/>
      </SliderBox>
    </>
  )
})


const Slider2 = React.memo(() => {
  const minMax = [0, 2]
  const [value, setValue] = useState(1)
  
  const setProcessedValue = useCallback((value: number) => {
    const v = Math.round(value)
    setValue(v)
  }, [])
  
  return (
    <>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      
      <SliderBox>
        <Slider minMax={minMax} value={value} setValue={setProcessedValue}/>
      </SliderBox>
    </>
  )
})


const Slider3 = React.memo(() => {
  const minMax = [0, 4]
  const [value, setValue] = useState(3)
  
  const setProcessedValue = useCallback((value: number) => {
    const v = Math.round(value)
    setValue(v)
  }, [])
  
  return (
    <>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      
      <SliderBox>
        <Slider minMax={minMax} value={value} setValue={setProcessedValue}/>
      </SliderBox>
    </>
  )
})


const Slider4 = React.memo(() => {
  const minMax = [80, 250]
  const [value, setValue] = useState(187)
  
  const setProcessedValue = useCallback((value: number) => {
    const v = Math.round(value)
    setValue(v)
  }, [])
  
  return (
    <>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      
      <SliderBox>
        <Slider minMax={minMax} value={value} setValue={setProcessedValue}/>
      </SliderBox>
    </>
  )
})
