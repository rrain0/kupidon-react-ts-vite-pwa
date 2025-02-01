import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import React from 'react'
import { useEmulatedScroll } from 'src/ui/2-pages/Test/pages/EmulatedScrollTestPage/useEmulatedScroll.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { useGetViewWh } from '@util/view/useGetViewWh.ts'
import { useOnResize_ } from 'src/_old0/util/view/useOnResize_.ts'
import { useElemRef } from '@util/react-state/useElemRef.ts'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import NumRange = RangeU.NumRange
import arrOfNumbers = ArrayU.arrOfNumbers



const EmulatedScrollTestPage = React.memo(() => {
  
  // can save it upper this component and pass via props
  const [, setScrollProgress, scrollProgress] = useRefGetSet(0)
  
  
  
  const [frameRef] = useElemRef()
  const getFrameWH = useGetViewWh(frameRef)
  
  const [contentRef] = useElemRef()
  const getContentWH = useGetViewWh(contentRef)
  
  
  const getMinMaxOffset = () => [0, getContentWH.h() - getFrameWH.h()] as NumRange
  
  
  const { drag, value, apply, valueToProgress } = useEmulatedScroll(
    scrollProgress,
    getMinMaxOffset,
    ([, dy]) => -dy,
  )
  useOnResize_([frameRef, contentRef], () => {
    setScrollProgress(valueToProgress(value.get()))
    apply()
  })
  
  
  return (
    <Pages.SimplePage>
      
      
      <ScrollFrame ref={frameRef}>
        
        <animated.div
          css={scrollContentCss}
          ref={contentRef}
          {...drag()}
          style={{
            // @ts-expect-error
            top: value.to(v => -v),
          }}
        >
          
          { arrOfNumbers(500).map(it => <div key={it}>Simulated Scroll {it}</div>) }
          
        </animated.div>
        
      </ScrollFrame>
      
      {/* <div css={css`
        width: 100%;
        height: 100%;
        background-color: aquamarine;
      `}/> */}
      
      
    </Pages.SimplePage>
  )
})
export default EmulatedScrollTestPage



const ScrollFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 100dvh;
  overflow: hidden;
`


const scrollContentCss = css`
  touch-action: none;
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  top: 0;
  background-image: linear-gradient(
    #ff000066, #ffff0066, #00ff0066, #00ffff66, #0000ff66
  );
`
