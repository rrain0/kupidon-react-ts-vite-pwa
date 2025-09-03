import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import Slider from 'src/components/widgets/Slider/Slider.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import { RangeU } from '@utils/common/RangeU.ts'
import NumRange = RangeU.NumRange
import PageContentLayout from 'src/components/components/page/PageContentLayout'
import PageLayout from 'src/components/components/page/PageLayout'



const SliderTestPage = React.memo(() => {
  
  const [value2, setValue2] = useState(3)
  
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          <div>Views: Slider</div>
          
          <div css={{ height: 24 }}/>
          
          <Slider1/>
          
          <div css={{ height: 24 }}/>
          
          <Slider2/>
          
          <div css={{ height: 24 }}/>
          
          <Slider3/>
          
          <div css={{ height: 24 }}/>
          
          <Slider4/>
          
          <div css={{ height: 24 }}/>
          
          <SliderChangePosition/>
          
          <div css={{ height: 24 }}/>
          
          <SliderChangeMinMax/>
          
          <div css={{ height: 24 }}/>
          
          <SliderChangeWidth/>
          
          <div css={{ height: 24 }}/>
        
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
    
    </>
  )
})
SliderTestPage.displayName = 'SliderTestPage'
export default SliderTestPage


const SliderBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
`



const Slider1 = React.memo(() => {
  const minMax = [-200, 200] as NumRange
  const [value, setValue] = useState(0)
  const [endValue, setEndValue] = useState(0)
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(value)
  }, [])
  
  return (
    <>
      <div>Value is not rounded</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>immediate value: {value}</div>
      <div>end value: {endValue}</div>
      
      <SliderBox>
        <Slider
          value={value}
          setValue={setValue}
          minMax={minMax}
          onValueDragEnd={onValueDragEnd}
        />
      </SliderBox>
    </>
  )
})


const Slider2 = React.memo(() => {
  const minMax = [0, 2] as NumRange
  const [value, setValue] = useState(1)
  const [endValue, setEndValue] = useState(0)
  
  const processValue = useCallback((value: number) => {
    return Math.round(value)
  }, [])
  
  const onValue = useCallback((value: number) => {
    setValue(processValue(value))
  }, [])
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(processValue(value))
  }, [])
  
  return (
    <>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      <div>end value: {endValue}</div>
      
      <SliderBox>
        <Slider
          value={value}
          setValue={onValue}
          minMax={minMax}
          onValueDragEnd={onValueDragEnd}
        />
      </SliderBox>
    </>
  )
})


const Slider3 = React.memo(() => {
  const minMax = [0, 4] as NumRange
  const [value, setValue] = useState(3)
  const [endValue, setEndValue] = useState(0)
  
  const processValue = useCallback((value: number) => {
    return Math.round(value)
  }, [])
  
  const onValue = useCallback((value: number) => {
    setValue(processValue(value))
  }, [])
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(processValue(value))
  }, [])
  
  return (
    <>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      <div>end value: {endValue}</div>
      
      <SliderBox>
        <Slider
          value={value}
          setValue={onValue}
          minMax={minMax}
          onValueDragEnd={onValueDragEnd}
        />
      </SliderBox>
    </>
  )
})


const Slider4 = React.memo(() => {
  const minMax = [80, 250] as NumRange
  const [value, setValue] = useState(187)
  const [endValue, setEndValue] = useState(0)
  
  const processValue = useCallback((value: number) => {
    return Math.round(value)
  }, [])
  
  const onValue = useCallback((value: number) => {
    setValue(processValue(value))
  }, [])
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(processValue(value))
  }, [])
  
  return (
    <>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      <div>end value: {endValue}</div>
      
      <SliderBox>
        <Slider
          value={value}
          setValue={onValue}
          minMax={minMax}
          onValueDragEnd={onValueDragEnd}
        />
      </SliderBox>
    </>
  )
})


const MovingSliderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100px;
  background: #00000022;
  position: relative;
`
const movingAnim = keyframes`
  0%   { top: 0px; left: 0px }
  50%  { top: 50px; left: 100px }
  100% { top: 0px; left: 0px }
`
const MovingSliderBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: auto;
  animation: ${movingAnim} 2s linear infinite;
`

const SliderChangePosition = React.memo(() => {
  const minMax = [0, 2] as NumRange
  const [value, setValue] = useState(1)
  const [endValue, setEndValue] = useState(value)
  
  const processValue = useCallback((value: number) => {
    return Math.round(value)
  }, [])
  
  const onValue = useCallback((value: number) => {
    setValue(processValue(value))
  }, [])
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(processValue(value))
  }, [])
  
  return (
    <>
      <div>Тест на перемещение слайдера</div>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      <div>end value: {endValue}</div>
      
      <MovingSliderContainer>
        <MovingSliderBox>
          <Slider
            value={value}
            setValue={onValue}
            minMax={minMax}
            onValueDragEnd={onValueDragEnd}
          />
        </MovingSliderBox>
      </MovingSliderContainer>
    </>
  )
})



const SliderChangeMinMax = React.memo(() => {
  const [minMax, setMinMax] = useState<NumRange>([0, 2])
  const [value, setValue] = useState(1)
  const [endValue, setEndValue] = useState(value)
  
  const [minMaxMode, setMinMaxMode] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setMinMaxMode(prev => {
        if (prev === 0) return 1
        else if (prev === 1) return 0
        return 0
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    if (minMaxMode === 0) setMinMax([0, 2])
    else if (minMaxMode === 1) setMinMax([-2, 6])
  }, [minMaxMode])
  
  const processValue = useCallback((value: number) => {
    return Math.round(value)
  }, [])
  
  const onValue = useCallback((value: number) => {
    setValue(processValue(value))
  }, [])
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(processValue(value))
  }, [])
  
  return (
    <>
      <div>Тест на изменение minMax</div>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      <div>end value: {endValue}</div>
      
      <SliderBox>
        <Slider
          value={value}
          setValue={onValue}
          minMax={minMax}
          onValueDragEnd={onValueDragEnd}
        />
      </SliderBox>
    </>
  )
})





const MovingSliderChangeWidthContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: #00000022;
  position: relative;
`
const resizeAnim = keyframes`
  0%   { width: 50% }
  10%  { width: 100% }
  50%  { width: 100% }
  60%  { width: 50% }
  100% { width: 50% }
`
const MovingSliderChangeWidthBox = styled.div`
  width: 50%;
  animation: ${resizeAnim} 6s linear infinite;
`

const SliderChangeWidth = React.memo(() => {
  const minMax = [0, 2] as NumRange
  const [value, setValue] = useState(1)
  const [endValue, setEndValue] = useState(value)
  
  const processValue = useCallback((value: number) => {
    return Math.round(value)
  }, [])
  
  const onValue = useCallback((value: number) => {
    setValue(processValue(value))
  }, [])
  
  const onValueDragEnd = useCallback((value: number) => {
    setEndValue(processValue(value))
  }, [])
  
  return (
    <>
      <div>Тест на перемещение слайдера</div>
      <div>Value is rounded to int</div>
      <div>minMax: {JSON.stringify(minMax, undefined, 2)}</div>
      <div>value: {value}</div>
      <div>end value: {endValue}</div>
      
      <MovingSliderChangeWidthContainer>
        <MovingSliderChangeWidthBox>
          <Slider
            value={value}
            setValue={onValue}
            minMax={minMax}
            onValueDragEnd={onValueDragEnd}
          />
        </MovingSliderChangeWidthBox>
      </MovingSliderChangeWidthContainer>
    </>
  )
})
