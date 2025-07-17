import AnimatedState from '@animated/elements/AnimatedState.tsx'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import {
  fixedForwardCarouselMergeProgress,
  getFixedForwardLoopedCarouselProps,
} from '@util/animated/carousel/props/fixedCarouselProps.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { MathU } from '@util/common/MathU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useCallback, useMemo, useState } from 'react'
import { UserToUserApi } from 'src/api/requests/UserToUserApi.ts'
import { MediaInArrayDUC } from 'src/ui-data/models/media/Media.ts'
import MediaArrayDownloader from 'src/ui-data/models/media/download/MediaArrayDownloader.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import ProfileCards, {
  ProfileCardsAction,
} from 'src/ui/1-widgets/ProfileCards/ProfileCards.tsx'
import arrOfIndices = ArrayU.arrOfIndices
import rf3 = MathU.rf3
import Pu = TypeU.Pu
import isdef = TypeU.isdef



const viewsCnt = 3
const viewFirstI = -1

const actionSpring = { mass: 2, tension: 70, friction: 10 }


export type ProfileCardsStackListItem = {
  id: string
  photos: MediaInArrayDUC[]
  name: string
  birthDate: string
  gender: 'MALE' | 'FEMALE'
  aboutMe: string
}
export type ProfileCardsStackListProps = Pu<{
  items: ProfileCardsStackListItem[]
  initialItemI: number
}>


const ProfileCardsStackList = React.memo(({
  items, initialItemI = 0,
}: ProfileCardsStackListProps) => {
  const itemsCnt = items?.length ?? 0
  
  const [, , frameRef] = useElemRefGetSet()
  const getTrackProps = createTrackPropsGetter(frameRef)
  
  const [isMoving, setIsMoving] = useState(false)
  const {
    get: getStackAction, set: setStackAction, state: stackAction,
  } = useStateAndRef<ProfileCardsAction>(undefined)
  
  
  
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
    
    eventListeners,
  } = useCarousel({
    initialStartItemProgress: 100 * initialItemI,
    itemsCnt,
    viewsCnt,
    viewFirstI,
    getTrackProps,
    axis: 'x',
    inverted: false,
    noDragWhileAnimating: true,
    mergeProgress: fixedForwardCarouselMergeProgress,
  })
  
  const getCarouselProps = ({
    viewI = 0,
    startP = getStartProgress(), startItemP = getStartItemProgress(), deltaP = getDeltaProgress(),
  } = { }) => getFixedForwardLoopedCarouselProps({
    startP, startItemP, deltaP,
    itemsCnt, viewsCnt,
    viewFirstI,
    currViewI: viewI,
  })
  
  eventListeners.onStart = ev => {
    setIsMoving(true)
    //console.log('onStart', ev)
  }
  eventListeners.onAnimationStart = ev => {
    //console.log('ev', ev)
    
    const {
      autoNearest, fromDrag,
      startP, startItemP, deltaP, toStartP, toStartItemP, toDeltaP,
    } = ev
    
    if (isdef(toStartP) && isdef(toStartItemP) && isdef(toDeltaP)) {
      const { pos0PI } = getCarouselProps({ startP, startItemP, deltaP: 0 })
      
      const { pos0PI: toPos0PI } = getCarouselProps({
        startP: toStartP + toDeltaP, startItemP: toStartItemP + toDeltaP, deltaP: 0,
      })
      
      //console.log('pos0PI', pos0PI, 'toPos0PI', toPos0PI)
      
      if (fromDrag && autoNearest) {
        if (toPos0PI > pos0PI) {
          // ACCEPT ACTION FROM DRAG
          console.log('drag to accept')
          setStackAction('accept')
        }
        if (toPos0PI < pos0PI) {
          // REJECT ACTION FROM DRAG
          console.log('drag to reject')
          setStackAction('reject')
        }
      }
    }
  }
  eventListeners.onFinish = ev => {
    setIsMoving(false)
    setStackAction(undefined)
    //console.log('onFinish', ev)
  }
  
  
  
  const onAccept = useCallback(() => {
    setStackAction('accept')
    animateTo({ next: true, ...actionSpring })
  }, [])
  
  const onReject = useCallback(() => {
    setStackAction('reject')
    animateTo({ prev: true, ...actionSpring })
  }, [])
  
  const onBack = useCallback(() => {
    setStackAction('back')
    const { pos0PBase } = getCarouselProps()
    animateTo({
      fromStartP: rf3(pos0PBase - 100), fromDeltaP: -100, deltaP: 0,
      ...actionSpring,
    })
  }, [])
  
  
  // TODO API List - сделать отдельную компоненту для создания фукнций колбэков со входящими данными
  const onLike = useCallback((userId: string) => {
    // TODO API
    UserToUserApi.like({ toUserId: userId })
    onAccept()
  }, [])
  
  
  
  const animatedProps = useMemo(() => animatedDeltaProgress.map(dp => (viewI = 0) => {
    return getCarouselProps({ viewI, deltaP: dp })
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
    
    const action = (() => {
      if (!first) return undefined
      if (getStackAction()) return getStackAction()
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
      restItemsOpacity, fullInfoOpacity, action, shadowIntensity, reactionIconOpacity,
    }
  }), [animatedProps])
  
  
  
  const loading = !items
  const noItems = !items?.length
  
  
  return (
    <Flex full>
      {(() => {
        if (loading) return (
          <Flex full center>
            {/* TODO Translation */}
            <div>Загрузка...</div>
          </Flex>
        )
        if (noItems) return (
          <Flex full center>
            {/* TODO Translation */}
            <div>Пусто</div>
          </Flex>
        )
        return (
          <Flex full relative noOverflow
            ref={frameRef}
            css={{ touchAction: 'pan-y' }}
            {...onTrackDrag()}
          >
            {arrOfIndices(viewsCnt).map(viewI => (
              <Flex absTlwh key={viewI}>
                <AnimatedState
                  animatedState={{
                    first: animatedProps.map(ap => ap(viewI).first),
                    itemI: animatedProps.map(ap => ap(viewI).viewItemI),
                  }}
                >
                  {({ first, itemI }) => {
                    const item = items[itemI]
                    const photos = item.photos
                    return (
                      <MediaArrayDownloader medias={photos}>
                        {(photos) => (
                          <ProfileCards
                            photos={photos}
                            name={item.name}
                            birthDate={item.birthDate}
                            gender={item.gender}
                            aboutMe={item.aboutMe}
                            hideButtons={isMoving}
                            action={first ? stackAction : undefined}
                            animatedStackProps={animatedStackProps.map(ap => ap(viewI))}
                            {...first && { onAccept: () => onLike(item.id), onReject, onBack }}
                          />
                        )}
                      </MediaArrayDownloader>
                    )
                  }}
                </AnimatedState>
              </Flex>
            ))}
          </Flex>
        )
      })()}
    </Flex>
  )
})
ProfileCardsStackList.displayName = 'ProfileCardsStackList'
export default ProfileCardsStackList







