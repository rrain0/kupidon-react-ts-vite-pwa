import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import { getIndexesProps } from 'src/util/animated/carousel/carouselProps.ts'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures.ts'
import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { getDragDirection } from 'src/util/drag/getDragDirection.ts'
import { useIntervalProgress } from 'src/util/progress/useIntervalProgress.ts'
import { useAppPointerAction } from 'src/util/pointer/useAppPointerAction.ts'
import { useNoSelect } from 'src/util/pointer/useNoSelect.ts'
import { useNoTouchAction } from 'src/util/pointer/useNoTouchAction.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useStateAndRef } from 'src/util/react-state/useStateAndRef.ts'
import { useEvent } from 'src/util/react/useEvent.ts'
import Puro = TypeU.Puro
import exists = TypeU.exists
import notExists = TypeU.notExists
import noop = TypeU.noop
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


export type AnimateToParams = Puro<{
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
  
  mergeProgress?: MergeProgressCallback | undefined
  
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
  
    noDrag,
    noLoop,
    
    initialStartProgress = 0,
    initialStartItemProgress = 0,
    initialDeltaProgress = 0,
    
    mergeProgress,
    
    onStart: _onStart,
    onFinish: _onFinish,
  } = props
  
  const isX = axis === 'x'
  const isY = axis === 'y'
  const onStart = useAsCallback(_onStart ?? noop)
  
  
  
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
  
  
  const onFinish = useAsCallback((props: CarouselEvent) => {
    _onFinish?.(props)
  })
  
  
  // Events log
  const [getEventsLog, setEventsLog] = useRefGetSet([] as CarouselEvent[])
  
  
  
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
    if (notExists(nextP)) return
    
    if (p !== nextP) {
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
      const nextDeltaP = nextP - startP
      if (noAnimation) {
        setDeltaProgress(nextDeltaP)
        animatedDeltaProgress.set(nextDeltaP)
      }
      else {
        await animatedDeltaProgress.animate({
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
      }
    }
    
    if (getEventsLog().length) {
      const ev: CarouselEvent = {
        last: true,
        startP: getStartProgress(),
        startItemP: getStartItemProgress(),
        deltaP: getDeltaProgress(),
      }
      onFinish?.(ev)
      setEventsLog([])
    }
  })
  
  
  
  const updateViews = () => {
    animatedDeltaProgress.set(getDeltaProgress())
  }
  
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
  
  const [getNeedMerge, setNeedMerge] = useRefGetSet(true)
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, setWasDragged } = useAppPointerAction()
  
  
  const applyOnEachDrag = useAsCallback((
    dp: number, horizontal: boolean, vertical: boolean, drag: boolean
  ) => {
    const directional = isX && horizontal || isY && vertical
    if (!noDrag && directional) {
      lockTouchAction()
      if (!getIsDragging() && getCanStartDrag() && canUseGestures && drag) {
        setIsDragging(true)
        setCanStartDrag(false)
        setWasDragged(true)
        const ev: CarouselEvent = {
          first: true,
          startP: getStartProgress(),
          startItemP: getStartItemProgress(),
          deltaP: getDeltaProgress(),
        }
        onStart?.(ev)
        setEventsLog([ev])
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        unlockTouchAction()
      }
    }
    if (isDragging) {
      if (getNeedMerge()) {
        ;(mergeProgress ?? defaultMergeProgress)({
          startViewI, viewsCnt, startItemI, itemsCnt,
          startP: getStartProgress(),
          startItemP: getStartItemProgress(),
          deltaP: getDeltaProgress(),
          setStartProgress, setStartItemProgress, setDeltaProgress,
          noLoop,
        })
        setNeedMerge(false)
      }
      setDeltaProgress(dp)
      updateViews()
    }
  })
  
  const applyOnFirstDrag = useAsCallback(() => { })
  
  const applyOnLastDrag = useAsCallback((vel: number) => {
    if (isDragging) updateViewsAndFinish(vel)
    setNeedMerge(true)
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




export type MergeProgressProps = {
  startViewI: number
  viewsCnt: number
  startItemI: number
  itemsCnt: number
  startP: number
  startItemP: number
  deltaP: number
  setStartProgress: Setter<number>
  setStartItemProgress: Setter<number>
  setDeltaProgress: Setter<number>
  noLoop?: boolean | undefined
}
export type MergeProgressCallback = (props: MergeProgressProps) => void

const defaultMergeProgress: MergeProgressCallback = (props) => {
  const {
    startViewI, viewsCnt, startItemI, itemsCnt,
    startP, startItemP, deltaP,
    setStartProgress, setStartItemProgress, setDeltaProgress,
    noLoop,
  } = props
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps({ startViewI, viewsCnt, startItemI, itemsCnt })
  
  let p = startP + deltaP
  p = noLoop ? clampViewP(p) : loopViewP(p)
  p = round3(p)
  setStartProgress(p)
  
  let itemP = startItemP + deltaP
  itemP = noLoop ? clampItemP(itemP) : loopItemP(itemP)
  itemP = round3(itemP)
  setStartItemProgress(itemP)
  
  setDeltaProgress(0)
}
