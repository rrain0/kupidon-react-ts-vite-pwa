import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import {
  getIndexesProps,
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
import round3 = MathU.round3
import Getter = TypeU.Getter
import Setter = TypeU.Setter



// Simplicity vs Control balance is hard


export type CarouselEvent = {
  first?: boolean | undefined
  last?: boolean | undefined
  startP: number
  startItemP: number
  deltaP: number
}
export type CarouselEventCallback = (carouselEvent: CarouselEvent) => void


export type AnimateToParams = Pu<{
  next: boolean
  prev: boolean
  p: number
  vel0: number
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
  
  noDrag?: boolean | undefined
  noLoop?: boolean | undefined
  
  initialStartProgress?: number | undefined
  initialStartItemProgress?: number | undefined
  initialDeltaProgress?: number | undefined
  
  mergeProgress: MergeProgressCallback
  
  onStart?: CarouselEventCallback | undefined
  onFinish?: CarouselEventCallback | undefined
}

// TODO rename to useCarouselProgress
export const useCarousel = (props: UseCarouselProps, deps: any[] = []) => {
  const {
    itemsCnt,
    viewsCnt,
    startItemI = 0,
    startViewI = 0,
    getTrackProps,
    axis,
    inverted,
    
    mergeProgress,
  
    noDrag,
    noLoop,
    
    initialStartProgress = 0,
    initialStartItemProgress = 0,
    initialDeltaProgress = 0,
    
    onStart,
    onFinish,
  } = props
  
  const isX = axis === 'x'
  const isY = axis === 'y'
  
  
  
  const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
  const [isDragging, getIsDragging, setIsDragging] = useStateAndRef(false)
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
  
  const tryEmitStartEvent = () => {
    if (!getEventsLog().length) {
      const ev: CarouselEvent = {
        first: true,
        startP: getStartProgress(),
        startItemP: getStartItemProgress(),
        deltaP: getDeltaProgress(),
      }
      onStart?.(ev)
      setEventsLog([ev])
    }
  }
  const emitFinishEvent = () => {
    const ev: CarouselEvent = {
      last: true,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
    }
    onFinish?.(ev)
    setEventsLog([])
  }
  
  
  const applyOnFinish = () => {
    mergeProgress({
      startViewI, viewsCnt, startItemI, itemsCnt,
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: getDeltaProgress(),
      setStartProgress, setStartItemProgress, setDeltaProgress,
      noLoop,
    })
    updateViews()
    emitFinishEvent()
  }
  
  
  const vThreshold = 150 // %size/s
  // px/ms => %size/s
  const getVelPercent = (velPx: number) => {
    return velPx * 1000 / getTrackProps()[isX ? 'w' : 'h'] * 100
  }
  // %size/s => px/ms
  const getVelPx = (progress: number) => {
    return progress / 100 * getTrackProps()[isX ? 'w' : 'h'] / 1000
  }
  
  const animateTo = useAsCallback(async ({
    next, prev, p: nextP, vel0, noAnimation,
  }: AnimateToParams) => {
    const startP = getStartProgress()
    const deltaP = getDeltaProgress()
    const p = startP + deltaP
    const pCurr = p % 100
    const pBase = p - pCurr
      
    ;[nextP, vel0] = (() => {
      if (exists(next)) return [pBase + 100, +vThreshold]
      if (exists(prev)) return [pBase - 100, -vThreshold]
      //if (exists(nextItemI)) return [0, 0]
      if (exists(nextP)) return [
        nextP,
        vel0 ?? (nextP > p ? getVelPx(vThreshold) : getVelPx(-vThreshold)),
      ]
      return [undefined, 0]
    })()
    
    
    if (exists(nextP) && p !== nextP) {
      tryEmitStartEvent()
      const nextDeltaP = nextP - startP
      
      //console.log('p & deltaP', p, deltaP, 'nextP & nextDeltaP', nextP, nextDeltaP, 'vel0', vel0)
      
      if (noAnimation) {
        setDeltaProgress(nextDeltaP)
        animatedDeltaProgress.set(nextDeltaP)
      }
      else {
        const { finished } = await animatedDeltaProgress.animate({
          startValue: deltaP,
          animationFun: createSpringAnimation({
            //mass: 1, tension: 170, friction: 10,
            mass: 1, tension: 120, friction: 7,
            //mass: 5, tension: 60, friction: 5,
            initVelocity: vel0,
            endValue: nextDeltaP,
          }),
          onUpdate: ({ value }) => setDeltaProgress(value),
        })
        if (!finished) return
      }
    }
    
    applyOnFinish()
  })
  
  
  
  const updateViewsAndFinish = (vel = 0) => {
    updateViews()
    
    const velPercent = getVelPercent(vel)
    
    const startP = getStartProgress()
    const deltaP = getDeltaProgress()
    const p = startP + deltaP
    const pCurr = p % 100
    const pBase = p - pCurr
    
    const [nextPCurr, vel0Percent] = (() => {
      if (Math.abs(velPercent) >= vThreshold) {
        if (pCurr > 0) {
          if (velPercent >= 0) return [100, velPercent]
          return [0, velPercent]
        }
        if (pCurr < 0) {
          if (velPercent >= 0) return [0, velPercent]
          return [-100, velPercent]
        }
      }
      else {
        if (pCurr <= -50) return [-100, -vThreshold]
        if (pCurr < 0) return [0, vThreshold]
        if (pCurr >= 50) return [100, vThreshold]
        if (pCurr > 0) return [0, -vThreshold]
      }
      return [0, 0]
    })()
    
    
    const vel0 = getVelPx(vel0Percent)
    const nextP = pBase + nextPCurr
    void animateTo({ p: nextP, vel0 })
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
  
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, setWasDragged } = useWasDragged()
  
  
  
  const applyOnDragStart = useAsCallback(() => {
    setIsDragging(true)
    setCanStartDrag(false)
    setWasDragged(true)
    tryEmitStartEvent()
  })
  
  
  const applyOnEachDrag = useAsCallback((
    dp: number, horizontal: boolean, vertical: boolean, drag: boolean
  ) => {
    const directional = isX && horizontal || isY && vertical
    if (!noDrag && directional) {
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
  
  const applyOnFirstDrag = useAsCallback(() => { })
  
  const applyOnLastDrag = useAsCallback((vel: number) => {
    if (isDragging) updateViewsAndFinish(vel)
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
    
    updateIntervalProgress({ reset: first, value: vpVal, dValue: dVal })
    
    // onEachDrag
    applyOnEachDrag(round3(getIntervalDeltaProgress()), horizontal, vertical, drag)
    // onDragStart
    if (first) { applyOnFirstDrag() }
    // onDragging
    if (!first && !last) { }
    // onDragEnd
    if (last) { applyOnLastDrag(vel) }
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



