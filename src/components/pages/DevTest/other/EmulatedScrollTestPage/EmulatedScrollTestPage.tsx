import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import { useResizeRef } from '@utils/view/useResizeRef.ts'
import { getViewProps } from '@utils/view/ViewProps.ts'
import React from 'react'
import { useEmulatedScroll } from 'src/components/pages/DevTest/other/EmulatedScrollTestPage/useEmulatedScroll.ts'
import { ArrayU } from '@utils/common/ArrayU.ts'
import { RangeU } from '@utils/common/RangeU.ts'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import { useRefGetSet } from '@utils/react-state/useRefGetSet.ts'
import NumRange = RangeU.NumRange
import arrOfNumbers = ArrayU.arrOfNumbers



const EmulatedScrollTestPage = React.memo(() => {
  
  // can save it upper this component and pass via props
  const [, setScrollProgress, scrollProgress] = useRefGetSet(0)
  
  const [getGetFrameH, setGetFrameH] = useRefGetSet(() => 0 as number)
  const [getGetContentH, setGetContentH] = useRefGetSet(() => 0 as number)
  
  const getMinMaxOffset = () => [0, getGetContentH()() - getGetFrameH()()] as NumRange
  
  const { drag, value, apply, valueToProgress } = useEmulatedScroll(
    scrollProgress,
    getMinMaxOffset,
    ([, dy]) => -dy,
  )
  
  const frameResizeRef = useResizeRef(() => {
    setScrollProgress(valueToProgress(value.get()))
    apply()
  })
  const contentResizeRef = useResizeRef(() => {
    setScrollProgress(valueToProgress(value.get()))
    apply()
  })
  
  
  const [getFrame, setFrame, frameRef] = useElemRefGetSet(elem => {
    frameResizeRef(elem)
    if (elem) setGetFrameH(() => getViewProps(elem).h)
  })
  const [getContent, setContent, contentRef] = useElemRefGetSet(elem => {
    contentResizeRef(elem)
    if (elem) setGetContentH(() => getViewProps(elem).h)
  })
  
  //const getFrameWH = useGetViewWh(frameRef)
  //const getContentWH = useGetViewWh(contentRef)
  
  
  
  
  
  
  
  return (
    <PageLayout col>
      
      
      <ScrollFrame ref={setFrame}>
        
        <animated.div
          css={scrollContentCss}
          ref={setContent}
          {...drag()}
          style={{
            // @ts-expect-error
            top: value.to(v => -v),
          }}
        >
          
          {arrOfNumbers(500).map(it => (
            <div key={it}>Simulated Scroll {it}</div>
          ))}
          
        </animated.div>
        
      </ScrollFrame>
      
      {/* <div css={css`
        width: 100%;
        height: 100%;
        background-color: aquamarine;
      `}/> */}
      
      
    </PageLayout>
  )
})
EmulatedScrollTestPage.displayName = 'EmulatedScrollTestPage'
export default EmulatedScrollTestPage



const ScrollFrame = styled.div(flexStyle({
  relative: true,
  fullW: true, wMax: 700, h: '100dvh',
  noOverflow: true,
}))


const scrollContentCss = css`
  touch-action: none;
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  top: 0;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    #ff000066, #ffff0066, #00ff0066, #00ffff66, #0000ff66
  );
`
