import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import {
  MergeProgressCallback,
} from 'src/utils/animated/carousel/props/carouselPropsCommon.ts'
import { MathU } from 'src/utils/base/MathU.ts'
import { TypeU } from 'src/utils/base/TypeU.ts'
import { getDragDirection } from 'src/utils/gestures/drag/getDragDirection.ts'
import { useIntervalProgress } from 'src/utils/progress/useIntervalProgress.ts'
import { useWasGesture } from 'src/utils/gestures/pointer/useWasGesture.ts'
import { useNoSelect } from 'src/utils/gestures/pointer/useNoSelect.ts'
import { useNoTouchAction } from 'src/utils/gestures/pointer/useNoTouchAction.ts'
import { useAsCallback } from 'src/utils/react/state/useAsCallback.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { useStateAndRef } from 'src/utils/react/state/useStateAndRef.ts'
import { useEvent } from 'src/utils/react/useEvent.ts'
import Pu = TypeU.Pu
import rf3 = MathU.rf3
import Getter = TypeU.Getter
import mod = MathU.mod
import isdef = TypeU.isdef



// TODO - add data to events.
//  pass data to animateTo({ data })
//  pass data as param and as return of event handlers ({ data }) => { return { data: newData } }



// Simplicity vs Control balance is hard



export type CarouselEvent = Pu<{
  first: boolean
  last: boolean
  
  fromDrag: boolean
  drag: boolean
  animation: boolean
  
  autoNearest: boolean
  next: boolean
  prev: boolean
  curr: boolean
  
  toStartP: number
  toStartItemP: number
  toDeltaP: number
}> & {
  startP: number
  startItemP: number
  deltaP: number
}
export type CarouselEventCallback = (carouselEvent: CarouselEvent) => void


export type UseCarouselEventListeners = Pu<{
  onStart: CarouselEventCallback
  onAnimationStart: CarouselEventCallback
  onFinish:  CarouselEventCallback
}>


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
  //itemFirstI?: number | undefined
  viewFirstI?: number | undefined
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
}

// TODO - extract parts and rename to useCarouselProgress
export const useCarousel = (props: UseCarouselProps, deps: any[] = []) => {
  const {
    itemsCnt,
    viewsCnt,
    //itemFirstI = 0,
    viewFirstI = 0,
    getTrackProps, // supports not stable
    axis,
    inverted,
    velThreshold = 150, // %size/s
    velDefault = velThreshold,
    
    mergeProgress, // supports not stable
  
    noDrag,
    noLoop,
    noDragWhileAnimating,
    
    initialStartProgress = 0,
    initialStartItemProgress = 0,
    initialDeltaProgress = 0,
  } = props
  
  const isX = axis === 'x'
  const isY = axis === 'y'
  
  const [getEventListeners] = useRefGetSet<UseCarouselEventListeners>({ })
  
  
  
  const {
    get: getIsDragging, set: setIsDragging, state: isDragging,
  } = useStateAndRef(false)
  const [getIsAnimating, setIsAnimating] = useRefGetSet(false)
  
  const { setNoTouchAction } = useNoTouchAction()
  const { setNoSelect } = useNoSelect()
  
  // Второй и тд пальцы не смогут вызвать драг.
  // Если текущий драг был прерван, то он не сможет продолжиться.
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, applyWasDragged } = useWasGesture()
  
  
  
  
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
  
  const tryEmitStartEvent = ({ fromDrag }: Partial<CarouselEvent>) => {
    if (!getEventsLog().length) {
      const ev: CarouselEvent = {
        first: true,
        fromDrag,
        startP: getStartProgress(),
        startItemP: getStartItemProgress(),
        deltaP: getDeltaProgress(),
      }
      setEventsLog([ev])
      getEventListeners().onStart?.(ev)
    }
  }
  const emitAnimationStartEvent = ({
    fromDrag,
    autoNearest, next, prev, curr,
    toStartP, toStartItemP, toDeltaP,
  }: Partial<CarouselEvent>) => {
    const ev: CarouselEvent = {
      first: true,
      fromDrag, animation: true,
      autoNearest, next, prev, curr,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
      toStartP, toStartItemP, toDeltaP,
    }
    setEventsLog([...getEventsLog(), ev])
    getEventListeners().onAnimationStart?.(ev)
  }
  const emitFinishEvent = ({ fromDrag }: Partial<CarouselEvent>) => {
    const ev: CarouselEvent = {
      last: true,
      fromDrag,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
    }
    setEventsLog([])
    getEventListeners().onFinish?.(ev)
  }
  
  
  const applyOnFinish = (fromDrag = false) => {
    const merged = mergeProgress({
      viewFirstI, viewsCnt, itemsCnt,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
      noLoop,
    })
    setStartProgress(merged.startP)
    setStartItemProgress(merged.startItemP)
    setDeltaProgress(merged.deltaP)
    updateViews()
    emitFinishEvent({ fromDrag })
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
      if (isdef(fromStartP) && isdef(fromDeltaP)) {
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
      if (isdef(fromP) && isdef(fromStartP)) {
        return [fromStartP, rf3(fromP - fromStartP), fromP]
      }
      if (isdef(fromP) && isdef(fromDeltaP)) {
        return [rf3(fromP - fromDeltaP), fromDeltaP, fromP]
      }
      if (isdef(fromDeltaP)) {
        const fromStartP = getStartProgress()
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
      if (isdef(fromStartP)) {
        const fromDeltaP = getDeltaProgress()
        return [fromStartP, fromDeltaP, rf3(fromStartP + fromDeltaP)]
      }
      if (isdef(fromP)) {
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
    
    const fromItemP = rf3(getStartItemProgress() + (fromStartP - getStartProgress()))
    setStartItemProgress(fromItemP)
    setStartProgress(fromStartP)
    setDeltaProgress(fromDeltaP)
    animatedDeltaProgress.set(fromDeltaP)
    
    const velThresholdPx = getVelPx(velThreshold)
    
    deltaP = (() => {
      if (autoNearest) {
        if (isdef(vel0) && vel0 >= velThresholdPx) next = true
        else if (isdef(vel0) && vel0 <= -velThresholdPx) curr = true
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
      if (isdef(deltaP)) return deltaP
      if (isdef(p)) return rf3(p - fromStartP)
      return fromDeltaP
    })()
    p = rf3(fromStartP + deltaP)
    const pCurr = rf3(mod(p, 100)) // nonneg
    const pBase = rf3(p - pCurr)
    const itemP = rf3(fromItemP + deltaP)
    
    tryEmitStartEvent({ fromDrag })
    emitAnimationStartEvent({
      fromDrag, autoNearest, next, prev, curr,
      //startP: fromStartP, startItemP: fromItemP, deltaP: fromDeltaP,
      toStartP: rf3(p - deltaP), toStartItemP: itemP, toDeltaP: deltaP,
    })
    
    if (fromDeltaP !== deltaP) {
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
            ...isdef(mass) && { mass },
            ...isdef(tension) && { tension },
            ...isdef(friction) && { friction },
            
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
  
  
  
  
  
  const applyOnFirstDrag = useAsCallback(() => {
    if (noDragWhileAnimating && getIsAnimating() || noDrag) setCanStartDrag(false)
  })
  
  const applyOnDragStart = useAsCallback(() => {
    setIsDragging(true)
    setIsAnimating(false)
    setCanStartDrag(false)
    applyWasDragged()
    tryEmitStartEvent({ fromDrag: true })
  })
  
  
  
  const applyOnDragging = ({ dp }: { dp: number }) => {
    if (isDragging) {
      setDeltaProgress(dp)
      updateViews()
    }
  }
  
  const applyOnEachDrag = useAsCallback(({
    dp, horizontal, vertical, drag,
  }: {
    dp: number, horizontal: boolean, vertical: boolean, drag: boolean,
  }) => {
    const directional = isX && horizontal || isY && vertical
    if (directional) {
      let noTouchAction = false
      if (!getIsDragging() && getCanStartDrag() && !getWasDragged() && drag) {
        applyOnDragStart()
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        noTouchAction = true
      }
      setNoTouchAction(noTouchAction)
    }
    applyOnDragging({ dp })
  })
  
  
  
  const applyOnDragEnd = ({ vel }: { vel: number }) => {
    if (isDragging) {
      updateViewsAndFinish(vel, true)
    }
  }
  
  const applyOnLastDrag = useAsCallback((vel: number) => {
    applyOnDragEnd({ vel })
    setCanStartDrag(true)
    setNoTouchAction(false)
    setNoSelect(false)
    setIsDragging(false)
  })
  
  
  
  
  const onTrackDrag = useDrag(gesture => {
    const {
      first, active, last,
      xy: [vpx, vpy], // viewport x / y coordinates
      movement: [mx, my],
      delta: [dx, dy],
      velocity: [velxabs, velyabs], // px/ms (nonnegative)
      direction: [dirx, diry], // -1 | 0 | 1, positive diry is from top to bottom
      currentTarget,
    } = gesture
    const [velx, vely] = [dirx * velxabs, diry * velyabs]
    
    const vpVal = (isX ? vpx : vpy) * (inverted ? -1 : 1)
    const dVal = (isX ? dx : dy) * (inverted ? -1 : 1)
    const vel = (isX ? velx : vely) * (inverted ? -1 : 1)
    
    const { horizontal, vertical, drag } = getDragDirection({ mx, my })
    
    
    // onFirstDrag
    if (first) {
      updateIntervalProgress({ value: vpVal, dValue: dVal, dValueProgress: getDeltaProgress() })
      applyOnFirstDrag()
    }
    // onEachDrag
    {
      updateIntervalProgress({ dValue: dVal })
      applyOnEachDrag({ dp: rf3(getIntervalDeltaProgress()), horizontal, vertical, drag })
    }
    // onLastDrag
    if (last) {
      applyOnLastDrag(vel)
    }
  }, { })
  
  
  
  return {
    isDragging,
    getIsDragging, // stable
    getWasDragged, // stable
    onTrackDrag, // not stable
    
    getStartProgress, // stable
    getStartItemProgress, // stable
    getDeltaProgress, // stable
    animatedDeltaProgress, // stable
    
    animateTo, // stable
    
    eventListeners: getEventListeners(), // stable, supports not stable listeners
  }
}



