import AnimatedState from '@animated/elements/AnimatedState.tsx'
import styled from '@emotion/styled'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import {
  fixedForwardCarouselMergeProgress,
  getFixedForwardLoopedCarouselProps,
} from '@util/animated/carousel/props/fixedCarouselProps.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { MathU } from '@util/common/MathU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useCallback, useMemo, useState } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import ProfileShowcase from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import { ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import FullscreenPage from 'src/ui/components/Pages/FullscreenPage.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import arrOfIndices = ArrayU.arrOfIndices
import abs = EmotionCommon.abs
import full = EmotionCommon.full
import rf3 = MathU.rf3


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
const data = [
  {
    photos,
    name: 'Test',
    birthDate: '2000-10-10',
    gender: 'MALE' as const,
    aboutMe: 'Тестовое описание 1',
  },
  {
    photos: [photos[1], ...photos.slice(1)],
    name: 'test',
    birthDate: '2000-10-10',
    gender: 'MALE' as const,
    aboutMe: 'Тестовое описание 2',
  },
  /* {
    photos: [photos[2], ...photos.slice(1)],
    name: 'test',
    birthDate: '2000-10-10',
    gender: 'MALE' as const,
    aboutMe: 'Тестовое описание 3',
  }, */
]

// TODO Иконку сердечка анимировать теневыми копиями большего размера при лайке

// TODO Закрыть шторку при переходе на другую анкету

// TODO Прикрутить нажатия на кнопки




const viewsCnt = 3



const FindCouplePage = React.memo(() => {
  
  const items = data
  const itemsCnt = items.length
  
  const [, , frameRef] = useElemRefGetSet()
  const getTrackProps = createTrackPropsGetter(frameRef)
  
  const [isAnimating, setIsAnimating] = useState(false)
  
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgress,
    getStartItemProgress,
    getDeltaProgress,
    animatedDeltaProgress,
    
    setStartProgress,
    setStartItemProgress,
    setDeltaProgress,
    applyOnFinish,
    
    animateTo,
  } = useCarousel({
    itemsCnt,
    viewsCnt,
    getTrackProps,
    axis: 'x',
    inverted: false,
    mergeProgress: fixedForwardCarouselMergeProgress,
    
    onStart: () => setIsAnimating(true),
    onFinish: () => setIsAnimating(false),
  })
  
  
  
  const onAccept = useCallback(() => {
    animateTo({ next: true, mass: 2, tension: 70, friction: 10 })
  }, [animateTo])
  
  const onReject = useCallback(() => {
    animateTo({ prev: true, mass: 2, tension: 70, friction: 10 })
  }, [animateTo])
  
  const onBack = useCallback(() => {
    {
      const { pos0PBase, pos0ItemPBase } = getFixedForwardLoopedCarouselProps({
        startP: getStartProgress(),
        startItemP: getStartItemProgress(),
        deltaP: getDeltaProgress(),
        itemsCnt,
        viewsCnt,
        startViewI: -1,
        currViewI: 0,
      })
      setStartProgress(rf3(pos0PBase - 100))
      setStartItemProgress(rf3(pos0ItemPBase - 100))
      setDeltaProgress(0)
      applyOnFinish()
    }
    {
      const { pos0PBase } = getFixedForwardLoopedCarouselProps({
        startP: getStartProgress(),
        startItemP: getStartItemProgress(),
        deltaP: getDeltaProgress(),
        itemsCnt,
        viewsCnt,
        startViewI: -1,
        currViewI: 0,
      })
      setDeltaProgress(-100)
      animatedDeltaProgress.set(-100)
      animateTo({ p: pos0PBase, mass: 2, tension: 70, friction: 10 })
    }
  }, [])
  
  
  const animatedProps = useMemo(() => animatedDeltaProgress.map(dp => (viewI = 0) => {
    return getFixedForwardLoopedCarouselProps({
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: dp,
      itemsCnt,
      viewsCnt,
      startViewI: -1,
      currViewI: viewI,
    })
  }), [itemsCnt])
  
  const animatedStackProps = useMemo(() => animatedProps.map(ap => (viewI = 0) => {
    const { first, viewPosI, pCurr, dir } = ap(viewI)
    
    const zIndex = (() => {
      if (viewPosI === 0) {
        //console.log('viewPosI', viewPosI, 'viewI', viewI - 1, 'pCurr', pCurr, 'dir', dir)
      }
      if (viewPosI === 0) return 30
      if (viewPosI === 1) return 0
      if (viewPosI === -1) return -1 // hide view
      return -1
    })()
    
    const transform = (() => {
      if (first) {
        const a = RangeU.map(pCurr, [0, 100], [0, 0.03])
        return `translateY(300%) rotate(${a}turn) translateY(-300%)`
      }
      return `translateX(0%)`
    })()
    
    const scale = (() => {
      if (viewPosI === 1) {
        //console.log('view-1 scale', 0.9 + 0.1 * (Math.abs(pCurr) / 100))
        return 0.9 + 0.1 * (Math.abs(pCurr) / 100)
      }
      return 1
    })()
    
    const opacity = (() => {
      if (first) {
        return RangeU.map(100 - Math.abs(pCurr), [0, 55, 100], [0, 1, 1])
      }
      if (viewPosI === 1) {
        return Math.abs(pCurr) / 100
      }
      if (viewPosI === -1) {
        return 0
      }
      return 1
    })()
    
    
    const restItemsOpacity = (() => {
      if (first) {
        return 1 - RangeU.map(Math.abs(pCurr), [0, 10, 100], [0, 1, 1])
      }
      return 1
    })()
    
    const fullInfoOpacity = 1 - RangeU.map(Math.abs(pCurr), [0, 10, 100], [0, 1, 1])
    
    const reaction = (() => {
      if (!first) return undefined
      if (dir === 1) return 'accept' as const
      if (dir === -1) return 'reject' as const
      return undefined
    })()
    
    const shadowIntensity = (() => {
      if (!first) return 0
      return RangeU.map(Math.abs(pCurr), [0, 25, 100], [0, 1, 1])
    })()
    
    const reactionIconOpacity = (() => {
      if (!first) return 0
      return RangeU.map(Math.abs(pCurr), [0, 15, 100], [0, 1, 1])
    })()
    
    
    return {
      zIndex, transform, scale, opacity,
      restItemsOpacity, fullInfoOpacity, reaction, shadowIntensity, reactionIconOpacity,
    }
  }), [])
  
  
  
  
  
  return (
    <FullscreenPage>
      <StacksFrame
        ref={frameRef}
        {...onTrackDrag()}
      >
        <StackFrame>
          {arrOfIndices(viewsCnt).map(viewI => (
            <StackFrame2 key={viewI}>
              <AnimatedState
                animatedState={{
                  first: animatedProps.map(ap => ap(viewI).first),
                  itemI: animatedProps.map(ap => ap(viewI).viewItemI),
                }}
              >
                {({ first, itemI }) => {
                  const item = items[itemI]
                  return (
                    <ProfileShowcase
                      photos={item.photos}
                      name={item.name}
                      birthDate={item.birthDate}
                      gender={item.gender}
                      aboutMe={item.aboutMe}
                      hideButtons={isAnimating}
                      animatedStackProps={animatedStackProps.map(ap => ap(viewI))}
                      {...first && { onAccept, onReject, onBack }}
                    />
                  )
                }}
              </AnimatedState>
            </StackFrame2>
          ))}
        </StackFrame>
      </StacksFrame>
    </FullscreenPage>
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


