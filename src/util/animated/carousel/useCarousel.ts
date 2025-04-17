import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import {
  MergeProgressCallback,
} from 'src/util/animated/carousel/props/carouselPropsCommon.ts'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures.ts'
import { MathU } from 'src/util/common/MathU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { getDragDirection } from 'src/util/drag/getDragDirection.ts'
import { useIntervalProgress } from 'src/util/progress/useIntervalProgress.ts'
import { useWasDragged } from 'src/util/pointer/useWasDragged.ts'
import { useNoSelect } from 'src/util/pointer/useNoSelect.ts'
import { useNoTouchAction } from 'src/util/pointer/useNoTouchAction.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useStateAndRef } from 'src/util/react-state/useStateAndRef.ts'
import { useEvent } from 'src/util/react/useEvent.ts'
import Pu = TypeU.Pu
import exists = TypeU.exists
import rf3 = MathU.rf3
import Getter = TypeU.Getter
import mod = MathU.mod



// TODO - add data to events.
//  pass data to animateTo({ data })
//  pass data as param and as return of event handlers ({ data }) => { return { data: newData } }



// Simplicity vs Control balance is hard




export type CarouselEvent = Pu<{
  first?: boolean | undefined
  last?: boolean | undefined
  
  fromDrag?: boolean | undefined
  drag?: boolean | undefined
  animation?: boolean | undefined
}> & {
  startP: number
  startItemP: number
  deltaP: number
}
export type CarouselEventCallback = (carouselEvent: CarouselEvent) => void


export type AnimateToParams = Pu<{
  next: boolean
  prev: boolean
  curr: boolean
  autoNearest: boolean
  
  fromP: number
  fromStartP: number
  fromDeltaP: number
  
  p: number
  deltaP: number
  
  vel0: number
  mass: number
  tension: number
  friction: number
  
  fromDrag: boolean
  noAnimation: boolean
}>

export type TrackProps = { x: number, y: number, w: number, h: number }

export type UseCarouselProps = {
  itemsCnt: number
  viewsCnt: number
  startItemI?: number | undefined
  startViewI?: number | undefined
  getTrackProps: Getter<TrackProps>
  axis: 'x' | 'y'
  inverted: boolean
  velThreshold?: number | undefined
  velDefault?: number | undefined
  
  noDrag?: boolean | undefined
  noLoop?: boolean | undefined
  noDragWhileAnimating?: boolean | undefined
  
  initialStartProgress?: number | undefined
  initialStartItemProgress?: number | undefined
  initialDeltaProgress?: number | undefined
  
  mergeProgress: MergeProgressCallback
  
  onStart?: CarouselEventCallback | undefined
  onFinish?: CarouselEventCallback | undefined
}

// TODO - extract parts and rename to useCarouselProgress
export const useCarousel = (props: UseCarouselProps, deps: any[] = []) => {
  const {
    itemsCnt,
    viewsCnt,
    startItemI = 0,
    startViewI = 0,
    getTrackProps,
    axis,
    inverted,
    velThreshold = 150, // %size/s
    velDefault = velThreshold,
    
    mergeProgress,
  
    noDrag,
    noLoop,
    noDragWhileAnimating,
    
    initialStartProgress = 0,
    initialStartItemProgress = 0,
    initialDeltaProgress = 0,
    
    onStart,
    onFinish,
  } = props
  
  const isX = axis === 'x'
  const isY = axis === 'y'
  
  
  
  const [isDragging, getIsDragging, setIsDragging] = useStateAndRef(false)
  const [getIsAnimating, setIsAnimating] = useRefGetSet(false)
  
  const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
  useNoSelect(isDragging)
  const canUseGestures = useLockAppGestures(isDragging)
  
  
  
  
  // start progress for views in (..0..100..) * visibleViewsCnt
  const [getStartProgress, setStartProgress] = useRefGetSet(initialStartProgress)
  // start progress for items in (..0..100..) * itemsCnt
  const [getStartItemProgress, setStartItemProgress] = useRefGetSet(initialStartItemProgress)
  // delta progress in (..0..100..) from start progress
  const [getDeltaProgress, setDeltaProgress] = useRefGetSet(initialDeltaProgress)
  // animated delta progress in (..0..100..) from start progress
  const animatedDeltaProgress = useAnimatedValue(initialDeltaProgress)
  
  
  const updateViews = () => {
    animatedDeltaProgress.set(getDeltaProgress())
  }
  
  
  // Events log
  const [getEventsLog, setEventsLog] = useRefGetSet([] as CarouselEvent[])
  
  const tryEmitStartEvent = (fromDrag = false) => {
    if (!getEventsLog().length) {
      const ev: CarouselEvent = {
        first: true,
        fromDrag,
        startP: getStartProgress(),
        startItemP: getStartItemProgress(),
        deltaP: getDeltaProgress(),
      }
      onStart?.(ev)
      setEventsLog([ev])
    }
  }
  const emitFinishEvent = (fromDrag = false) => {
    const ev: CarouselEvent = {
      last: true,
      fromDrag,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
    }
    onFinish?.(ev)
    setEventsLog([])
  }
  
  
  const applyOnFinish = (fromDrag = false) => {
    mergeProgress({
      startViewI, viewsCnt, startItemI, itemsCnt,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
      setStartProgress, setStartItemProgress, setDeltaProgress,
      noLoop,
    })
    updateViews()
    emitFinishEvent(fromDrag)
  }
  
  
  // px/ms => %size/s
  const getVelPercent = (velPx: number) => {
    return velPx * 1000 / getTrackProps()[isX ? 'w' : 'h'] * 100
  }
  // %size/s => px/ms
  const getVelPx = (progress: number) => {
    return progress / 100 * getTrackProps()[isX ? 'w' : 'h'] / 1000
  }
  
  const animateTo = useAsCallback(async ({
    next, prev, curr, autoNearest,
    fromP, fromStartP, fromDeltaP,
    p, deltaP,
    vel0 /* px/ms */, mass, tension, friction,
    fromDrag, noAnimation,
  }: AnimateToParams) => {
    
    ;[fromStartP, fromDeltaP, fromP] = (() => {
      if (exists(fromStartP) && exists(fromDeltaP)) {
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
      if (exists(fromP) && exists(fromStartP)) {
        return [fromStartP, rf3(fromP - fromStartP), fromP]
      }
      if (exists(fromP) && exists(fromDeltaP)) {
        return [rf3(fromP - fromDeltaP), fromDeltaP, fromP]
      }
      if (exists(fromDeltaP)) {
        const fromStartP = getStartProgress()
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
      if (exists(fromStartP)) {
        const fromDeltaP = getDeltaProgress()
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
      if (exists(fromP)) {
        const fromDeltaP = rf3(mod(fromP, 100)) // nonneg
        const fromStartP = rf3(fromP - fromDeltaP)
        return [fromStartP, fromDeltaP, fromP]
      }
      {
        const fromStartP = getStartProgress()
        const fromDeltaP = getDeltaProgress()
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
    })()
    const fromPCurr = rf3(mod(fromP, 100)) // nonneg
    const fromPBase = rf3(fromP - fromPCurr)
    
    setStartItemProgress(rf3(getStartItemProgress() + (fromStartP - getStartProgress())))
    setStartProgress(fromStartP)
    setDeltaProgress(fromDeltaP)
    animatedDeltaProgress.set(fromDeltaP)
    
    const velThresholdPx = getVelPx(velThreshold)
    
    deltaP = (() => {
      if (autoNearest) {
        if (exists(vel0) && vel0 >= velThresholdPx) next = true
        else if (exists(vel0) && vel0 <= -velThresholdPx) curr = true
        else if (fromPCurr >= 50) {
          next = true
          vel0 = undefined
        }
        else if (fromPCurr < 50) {
          curr = true
          vel0 = undefined
        }
      }
      if (next) return rf3(fromPBase + 100 - fromStartP)
      if (prev) return rf3(fromPBase - 100 - fromStartP)
      if (curr) return rf3(fromPBase - fromStartP)
      if (exists(deltaP)) return deltaP
      if (exists(p)) return rf3(p - fromStartP)
      return undefined
    })()
    
    
    if (exists(deltaP) && fromDeltaP !== deltaP) {
      tryEmitStartEvent(fromDrag)
      const velDefaultPx = getVelPx(velDefault)
      vel0 ??= deltaP > fromDeltaP ? velDefaultPx : -velDefaultPx
      
      // console.log(
      //   'fromP & fromDeltaP', fromP, fromDeltaP,
      //   'p & deltaP', p, deltaP,
      //   'vel0', vel0,
      // )
      
      if (noAnimation) {
        setDeltaProgress(deltaP)
        animatedDeltaProgress.set(deltaP)
        applyOnFinish(fromDrag)
      }
      else {
        setIsAnimating(true)
        const { finished } = await animatedDeltaProgress.animate({
          startValue: fromDeltaP,
          animationFun: createSpringAnimation({
            //mass: 1, tension: 170, friction: 10,
            mass: 1, tension: 120, friction: 7,
            ...exists(mass) && { mass },
            ...exists(tension) && { tension },
            ...exists(friction) && { friction },
            
            //mass: 5, tension: 60, friction: 5,
            
            initVelocity: vel0,
            endValue: deltaP,
          }),
          onUpdate: ({ value }) => setDeltaProgress(rf3(value)),
        })
        if (finished) {
          setIsAnimating(false)
          applyOnFinish(fromDrag)
        }
      }
    }
    else {
      applyOnFinish(fromDrag)
    }
  })
  
  
  
  const updateViewsAndFinish = (vel = 0, fromDrag = false) => {
    updateViews()
    void animateTo({ autoNearest: true, vel0: vel, fromDrag })
  }
  
  
  useEvent(() => updateViewsAndFinish(), deps)
  
  const getIntervalProps = () => {
    const { x, y, w, h } = getTrackProps()
    return { start: isX ? x : y, len: isX ? w : h }
  }
  const {
    updateIntervalProgress,
    getIntervalDeltaProgress,
  } = useIntervalProgress({ getIntervalProps })
  
  // Второй и тд пальцы не смогут вызвать драг.
  // Если текущий драг был прерван, то он не сможет продолжиться.
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, setWasDragged } = useWasDragged()
  
  
  
  const applyOnFirstDrag = useAsCallback(() => {
    if (noDragWhileAnimating && getIsAnimating() || noDrag) setCanStartDrag(false)
  })
  
  const applyOnDragStart = useAsCallback(() => {
    setIsDragging(true)
    setIsAnimating(false)
    setCanStartDrag(false)
    setWasDragged(true)
    tryEmitStartEvent(true)
  })
  
  
  const applyOnEachDrag = useAsCallback((
    dp: number, horizontal: boolean, vertical: boolean, drag: boolean
  ) => {
    const directional = isX && horizontal || isY && vertical
    if (directional) {
      lockTouchAction()
      if (!getIsDragging() && getCanStartDrag() && canUseGestures && drag) {
        applyOnDragStart()
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        unlockTouchAction()
      }
    }
    if (isDragging) {
      setDeltaProgress(dp)
      updateViews()
    }
  })
  
  const applyOnLastDrag = useAsCallback((vel: number) => {
    if (isDragging) updateViewsAndFinish(vel, true)
    setCanStartDrag(true)
    unlockTouchAction()
    setIsDragging(false)
  })
  
  
  
  // noinspection JSVoidFunctionReturnValueUsed
  const onTrackDrag = useDrag(gesture => {
    const {
      first, active, last,
      xy: [vpx, vpy], // viewport x / y coordinates
      movement: [mx, my],
      delta: [dx, dy],
      velocity: [velxabs, velyabs], // px/ms (nonnegative)
      direction: [dirx, diry], // -1, 0, 1, positive diry is from top to bottom
      currentTarget,
    } = gesture
    const [velx, vely] = [dirx * velxabs, diry * velyabs]
    
    const vpVal = (isX ? vpx : vpy) * (inverted ? -1 : 1)
    const dVal = (isX ? dx : dy) * (inverted ? -1 : 1)
    const vel = (isX ? velx : vely) * (inverted ? -1 : 1)
    
    const { horizontal, vertical, drag } = getDragDirection({ mx, my })
    
    
    if (first) {
      updateIntervalProgress({ value: vpVal, dValue: dVal, dValueProgress: getDeltaProgress() })
      applyOnFirstDrag()
    }
    {
      updateIntervalProgress({ dValue: dVal })
      applyOnEachDrag(rf3(getIntervalDeltaProgress()), horizontal, vertical, drag)
    }
    if (!first && !last) {
      /* applyOnDragging(...) */
    }
    if (last) {
      applyOnLastDrag(vel)
    }
  })
  
  
  
  return {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgress,
    getStartItemProgress,
    getDeltaProgress,
    animatedDeltaProgress,
    
    animateTo,
  }
}



