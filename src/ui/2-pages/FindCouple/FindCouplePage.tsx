import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import styled from '@emotion/styled'
import { getLoopedCarouselProps } from '@util/animated/carousel/carouselProps.ts'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import ProfileShowcase from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import { ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import { Pages } from 'src/ui/components/Pages/Pages'
import arrOfIndices = ArrayU.arrOfIndices
import abs = EmotionCommon.abs


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
  
  const [, , itemsBoxRef] = useElemRefGetSet()
  const getTrackProps = createTrackPropsGetter(itemsBoxRef)
  
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgressX,
    getStartItemProgress,
    getDeltaProgressX,
    animatedDeltaProgressX,
    
    animateTo,
  } = useCarousel({
    itemsCnt,
    viewsCnt,
    getTrackProps,
    //noDrag: itemsCnt <= 1,
  })
  
  
  const animatedProps = animatedDeltaProgressX.map(dp => (viewI = 0) => {
    return getLoopedCarouselProps({
      getStartProgressX,
      getStartItemProgress,
      deltaProgressX: dp,
      itemsCnt,
      viewsCnt,
      startViewI: -1,
      currViewI: viewI,
    })
  })
  
  
  
  
  
  return (
    <Pages.FullscreenPageGrad>
      <Pages.AddSafeInsets style={{ height: '100%' }}>
        
        <StacksFrame
          ref={itemsBoxRef}
          {...onTrackDrag()}
        >
          {arrOfIndices(viewsCnt).map(viewI => (
            <AnimatedStack
              key={viewI}
              animatedStyle={{
                zIndex: animatedProps.map(ap => (ap(viewI).viewPosI + 1) * 20),
                scale: animatedProps.map(ap => {
                  const { viewPosI, pCurr } = ap(viewI)
                  if (viewPosI === -1) {
                    return 0.9 + 0.1 * (100 - pCurr) / 100
                  }
                  return 1
                }),
                opacity: animatedProps.map(ap => {
                  const { viewPosI, pCurr } = ap(viewI)
                  if (viewPosI === -1) {
                    return (100 - pCurr) / 100
                  }
                  if (viewPosI === 0) {
                    return 1 - RangeU.mapClamp((100 - pCurr) / 100, [0, 1], [0, 3], [0, 1])
                  }
                  if (viewPosI === 1) {
                    return 0
                  }
                  return 1
                }),
                // make transform-origin & transform: rotate
                transform: animatedProps.map(ap => {
                  const { viewPosI, pCurr } = ap(viewI)
                  if (viewPosI === 0) {
                    // make pointer-events: none;
                    return `translateX(${100 - pCurr}%)`
                  }
                  if (viewPosI === 1) {
                    return `translateX(200%)`
                  }
                  return `translateX(0%)`
                }),
              }}
            >
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
                    />
                  )
                }}
              </AnimatedState>
            </AnimatedStack>
          ))}
          
        </StacksFrame>
      
      </Pages.AddSafeInsets>
    </Pages.FullscreenPageGrad>
  )
})
export default FindCouplePage



const StacksFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`


const AnimatedStack = styled(AnimatedDiv)`
  ${abs};
`


