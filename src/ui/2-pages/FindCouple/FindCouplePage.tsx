import AnimatedState from '@animated/elements/AnimatedState.tsx'
import styled from '@emotion/styled'
import {
  getFixedClampedCarouselProps,
} from '@util/animated/carousel/carouselProps.ts'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import { useResizeRef } from '@util/view/useResizeRef.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { ViewU } from '@util/view/ViewU.ts'
import React, { useCallback } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import ProfileShowcase from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import { ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import { Pages } from 'src/ui/components/Pages/Pages'
import arrOfIndices = ArrayU.arrOfIndices
import abs = EmotionCommon.abs
import minRatioPort = StyleVals.minRatioPort
import maxRatioPort = StyleVals.maxRatioPort
import full = EmotionCommon.full


const photos = [
  {
    type: 'local', isEmpty: false, id: '0',
    remoteUrl: '', name: '0', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[0],
    isReady: true, remoteI: 0,
  },
  {
    type: 'local', isEmpty: false, id: '1',
    remoteUrl: '', name: '1', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[1],
    isReady: true, remoteI: 1,
  },
  {
    type: 'local', isEmpty: false, id: '2',
    remoteUrl: '', name: '2', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[2],
    isReady: true, remoteI: 2,
  },
  {
    type: 'local', isEmpty: false, id: '3',
    remoteUrl: '', name: '3', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[3],
    isReady: true, remoteI: 3,
  },
  {
    type: 'local', isEmpty: false, id: '4',
    remoteUrl: '', name: '4', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[4],
    isReady: true, remoteI: 4,
  },
  {
    type: 'local', isEmpty: false, id: '5',
    remoteUrl: '', name: '5', mimeType: 'image/png',
    dataUrl: MockData.images.sixImages[5],
    isReady: true, remoteI: 5,
  },
] as ProfilePhoto[]
const data = {
  photos,
  name: 'test',
  birthDate: '2000-10-10',
  gender: 'MALE' as const,
  aboutMe: 'Тестовое описание',
}



const viewsCnt = 3



const FindCouplePage = React.memo(() => {
  
  const items = [data]
  const itemsCnt = items.length
  
  const [, , frameRef] = useElemRefGetSet()
  const getTrackProps = createTrackPropsGetter(frameRef)
  
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgress,
    getStartItemProgress,
    getDeltaProgress,
    animatedDeltaProgress,
    
    animateTo,
  } = useCarousel({
    itemsCnt,
    viewsCnt,
    getTrackProps,
    axis: 'x',
    inverted: false,
    //noDrag: itemsCnt <= 1,
    
    mergeProgress: ({ setDeltaProgress }) => {
      setDeltaProgress(0)
    },
  })
  
  
  const animatedProps = animatedDeltaProgress.map(dp => (viewI = 0) => {
    return getFixedClampedCarouselProps({
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: dp,
      itemsCnt,
      viewsCnt,
      startViewI: -1,
      currViewI: viewI,
    })
  })
  
  const animatedStackProps = animatedProps.map(ap => (viewI = 0) => {
    const { viewPosI, pCurr, dir, loopViewI } = ap(viewI)
    
    const zIndex = (() => {
      if (viewPosI === 0) {
        //console.log('viewPosI', viewPosI, 'viewI', viewI - 1, 'pCurr', pCurr, 'dir', dir)
      }
      if (viewPosI === -1) return 0
      if (viewPosI === 0) return 30
      if (viewPosI === 1) return -1 // hide view
    })()
    
    const transform = (() => {
      if (viewPosI === 0) {
        const a = RangeU.map(pCurr, [0, 100], [0, 0.03])
        return `translateY(300%) rotate(${a}turn) translateY(-300%)`
      }
      return `translateX(0%)`
    })()
    
    const scale = (() => {
      if (viewPosI === -1) {
        if (viewPosI === -1) {
          //console.log('view-1 scale', 0.9 + 0.1 * (Math.abs(pCurr) / 100))
        }
        return 0.9 + 0.1 * (Math.abs(pCurr) / 100)
      }
      return 1
    })()
    
    const opacity = (() => {
      if (viewPosI === -1) {
        return Math.abs(pCurr) / 100
      }
      if (viewPosI === 0) {
        return 1 - RangeU.mapClamp(Math.abs(pCurr), [0, 100], [0, 1.5], [0, 1])
      }
      if (viewPosI === 1) {
        return 0
      }
      return 1
    })()
    
    return { zIndex, transform, scale, opacity }
  })
  
  
  
  
  
  return (
    <Pages.FullscreenPageGrad>
      <Pages.AddSafeInsets style={{ height: '100%' }}>
        
        <StacksFrame
          ref={frameRef}
          {...onTrackDrag()}
        >
          <StackFrame>
            {arrOfIndices(viewsCnt).map(viewI => (
              <StackFrame2 key={viewI}>
                <AnimatedState
                  animatedState={{
                    itemI: animatedProps.map(ap => ap(viewI).viewItemI),
                  }}
                >
                  {({ itemI }) => {
                    const item = items[itemI]
                    return (
                      <ProfileShowcase
                        photos={item.photos}
                        name={item.name}
                        birthDate={item.birthDate}
                        gender={item.gender}
                        aboutMe={item.aboutMe}
                        animatedStackProps={animatedStackProps.map(ap => ap(viewI))}
                      />
                    )
                  }}
                </AnimatedState>
              </StackFrame2>
            ))}
          </StackFrame>
        </StacksFrame>
      
      </Pages.AddSafeInsets>
    </Pages.FullscreenPageGrad>
  )
})
export default FindCouplePage



const StacksFrame = styled.div`
  ${full};
  overflow: hidden;
  touch-action: pan-y;
`
const StackFrame = styled.div`
  position: relative;
  ${full};
`
const StackFrame2 = styled.div`
  ${abs};
`


