import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
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
import Callback1 = TypeU.Callback1
import noop = TypeU.noop
import round3 = MathU.round3
import Getter = TypeU.Getter



// Simplicity vs Control balance is hard


export type ProgressEvent = {
  last: boolean
}


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
  getTrackProps: Getter<TrackProps>
  axis: 'x' | 'y'
  inverted: boolean
  
  noDrag?: boolean | undefined
  
  onFinish?: Callback1<ProgressEvent> | undefined
}

// TODO rename to useCarouselProgress
export const useCarousel = (props: UseCarouselProps, deps: any[] = []) => {
  const {
    itemsCnt,
    viewsCnt,
    getTrackProps,
    axis,
    inverted,
    noDrag,
    onFinish: _onFinish,
  } = props
  
  const isX = axis === 'x'
  const isY = axis === 'y'
  const onFinish = useAsCallback(_onFinish ?? noop)
  
  
  
  const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
  const [isDragging, getIsDragging, setIsDragging] = useStateAndRef(false)
  useNoSelect(isDragging)
  const canUseGestures = useLockAppGestures(isDragging)
  
  
  
  
  // start progress for views in (..0..100..) * visibleViewsCnt
  const [getStartProgress, setStartProgress] = useRefGetSet(0)
  // start progress for items in (..0..100..) * itemsCnt
  const [getStartItemProgress, setStartItemProgress] = useRefGetSet(0)
  // delta progress  in (..0..100..) from start progress
  const [getDeltaProgress, setDeltaProgress] = useRefGetSet(0)
  
  const animatedDeltaProgress = useAnimatedValue(0)
  
  // Events log
  const [getEventsLog, setEventsLog] = useRefGetSet(undefined as any[] | undefined)
  
  
  
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
      
      onFinish({ last: true })
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
  
  
  // TODO carousel - merge when noLoop (clamp)
  const mergeProgress = () => {
    let p = getStartProgress() + getDeltaProgress()
    const boundP = (v: number) => RangeU.loop(v, [0, viewsCnt * 100])
    p = boundP(p)
    // здесь округление нужно, потому что вычисление прогресса от движения имеет операцию деления
    p = round3(p)
    setStartProgress(p)
    
    let itemP = getStartItemProgress() + getDeltaProgress()
    const boundItemP = (v: number) => RangeU.loop(v, [0, itemsCnt * 100])
    itemP = boundItemP(itemP)
    // здесь округление нужно, потому что вычисление прогресса от движения имеет операцию деления
    itemP = round3(itemP)
    setStartItemProgress(itemP)
    
    setDeltaProgress(0)
  }
  
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
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        unlockTouchAction()
      }
    }
    if (isDragging) {
      if (getNeedMerge()) {
        mergeProgress()
        setNeedMerge(false)
      }
      setDeltaProgress(dp)
      updateViews()
    }
  })
  
  const applyOnDragStart = useAsCallback(() => { })
  
  const applyOnDragEnd = useAsCallback((vel: number) => {
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
    applyOnEachDrag(getIntervalDeltaProgress(), horizontal, vertical, drag)
    // onDragStart
    if (first) { applyOnDragStart() }
    // onDragging
    if (!first && !last) { }
    // onDragEnd
    if (last) { applyOnDragEnd(vel) }
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


