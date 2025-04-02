import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures.ts'
import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { getDragDirection } from 'src/util/drag/getDragDirection.ts'
import { GetTrackProps, useDragProgress } from 'src/util/drag/useDragProgress.ts'
import { useAppPointerAction } from 'src/util/pointer/useAppPointerAction.ts'
import { useNoSelect } from 'src/util/pointer/useNoSelect.ts'
import { useNoTouchAction } from 'src/util/pointer/useNoTouchAction.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useStateAndRef } from 'src/util/react-state/useStateAndRef.ts'
import { useMemo } from 'react'
import Puro = TypeU.Puro
import exists = TypeU.exists
import notExists = TypeU.notExists
import Callback1 = TypeU.Callback1
import noop = TypeU.noop



// Simplicity vs Control balance is hard


export type ProgressEvent = {
  last: boolean
  //pos0ViewI: number
  pos0ItemI: number
}


export type AnimateToParams = Puro<{
  next: boolean
  prev: boolean
  p: number
  itemI: number
  vel0: number
}>

export type UseGalleryProps = {
  itemsCnt: number
  viewsCnt: number
  getTrackProps: GetTrackProps
  
  noDrag?: boolean | undefined
  
  onFinish?: Callback1<ProgressEvent> | undefined
}

export const useCarousel = (props: UseGalleryProps, deps: any[] = []) => {
  const {
    itemsCnt,
    viewsCnt,
    getTrackProps,
    noDrag,
    onFinish: _onFinish,
  } = props
  
  const onFinish = useAsCallback(_onFinish ?? noop)
  
  
  
  const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
  const [isDragging, getIsDragging, setIsDragging] = useStateAndRef(false)
  useNoSelect(isDragging)
  const canUseGestures = useLockAppGestures(isDragging)
  
  
  
  
  // start progress x for views in (..0..100..) * visibleViewsCnt
  const [getStartProgressX, setStartProgressX] = useRefGetSet(0)
  // start progress for items in (..0..100..) * itemsCnt
  const [getStartItemProgress, setStartItemProgress] = useRefGetSet(0)
  // delta progress x in (..0..100..) from start progress x
  const [getDeltaProgressX, setDeltaProgressX] = useRefGetSet(0)
  
  const animatedDeltaProgressX = useAnimatedValue(0)
  
  // Events log
  const [getEventsLog, setEventsLog] = useRefGetSet(undefined as [] | undefined)
  
  
  
  const vThreshold = 150 // %width/s
  // px/ms => %width/s
  const getVelPercent = (velPx: number) => velPx * 1000 / getTrackProps().w * 100
  // %width/s => px/ms
  const getVelPx = (progress: number) => progress / 100 * getTrackProps().w / 1000
  
  const animateTo = async ({
    next,
    prev,
    p: nextP,
    //itemI: nextItemI, // TODO Gallery
    vel0,
  }: AnimateToParams) => {
    const pStart = getStartProgressX()
    const pDelta = getDeltaProgressX()
    const p = pStart + pDelta
    const pICurr = p % 100
    const pI = p - pICurr
    
    ;[nextP, vel0] = (() => {
      if (exists(next)) return [pI - 100, -vThreshold]
      if (exists(prev)) return [pI + 100, vThreshold]
      //if (exists(nextItemI)) return [0, 0]
      if (exists(nextP)) return [
        nextP,
        vel0 ?? (nextP > p ? getVelPx(vThreshold) : getVelPx(-vThreshold)),
      ]
      return [undefined, 0]
    })()
    if (notExists(nextP)) return
    
    if (p !== nextP) {
      const nextPDelta = nextP - pStart
      await animatedDeltaProgressX.animate({
        startValue: pDelta,
        animationFun: createSpringAnimation({
          //mass: 1, tension: 170, friction: 10,
          mass: 1, tension: 120, friction: 7,
          //mass: 5, tension: 60, friction: 5,
          initVelocity: vel0,
          endValue: nextPDelta,
        }),
        onUpdate: ({ value }) => setDeltaProgressX(value),
      })
    }
    
    const itemP = getStartItemProgress() + getDeltaProgressX()
    const pos0ItemI = RangeU.loop(itemsCnt - Math.floor(itemP / 100), [0, itemsCnt])
    onFinish({ last: true, pos0ItemI })
  }
  
  
  
  const updateViews = () => {
    animatedDeltaProgressX.set(getDeltaProgressX())
  }
  
  const updateViewsAndFinish = (velx = 0) => {
    updateViews()
    
    const velxPercent = getVelPercent(velx)
    
    const pStart = getStartProgressX()
    const pDelta = getDeltaProgressX()
    const p = pStart + pDelta
    const pICurr = p % 100
    const pI = p - pICurr
    
    const [nextPICurr, vel0Percent] = (() => {
      if (Math.abs(velxPercent) >= vThreshold) {
        if (pICurr > 0) {
          if (velxPercent >= 0) return [100, velxPercent]
          return [0, velxPercent]
        }
        if (pICurr < 0) {
          if (velxPercent >= 0) return [0, velxPercent]
          return [-100, velxPercent]
        }
      }
      else {
        if (pICurr <= -50) return [-100, -vThreshold]
        if (pICurr < 0) return [0, vThreshold]
        if (pICurr >= 50) return [100, vThreshold]
        if (pICurr > 0) return [0, -vThreshold]
      }
      return [0, 0]
    })()
    
    
    const vel0 = getVelPx(vel0Percent)
    const nextP = pI + nextPICurr
    void animateTo({ p: nextP, vel0 })
  }
  
  
  // works as immediate effect
  useMemo(() => updateViewsAndFinish(), deps)
  
  const {
    updateDragProgress,
    getDragDeltaProgressX,
  } = useDragProgress({ getTrackProps })
  
  
  const mergeProgress = () => {
    const p = getStartProgressX() + getDeltaProgressX()
    const boundP = (v: number) => RangeU.loop(v, [0, viewsCnt * 100])
    const pStart = MathU.round3(boundP(p))
    setStartProgressX(pStart)
    
    const itemP = getStartItemProgress() + getDeltaProgressX()
    const boundItemP = (v: number) => RangeU.loop(v, [0, itemsCnt * 100])
    const itemPStart = MathU.round3(boundItemP(itemP))
    setStartItemProgress(itemPStart)
    
    setDeltaProgressX(0)
  }
  
  const [getNeedMerge, setNeedMerge] = useRefGetSet(true)
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, setWasDragged } = useAppPointerAction()
  
  
  const applyOnEachDrag = useAsCallback((dpx: number, horizontal: boolean, drag: boolean) => {
    if (!noDrag && horizontal) {
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
      setDeltaProgressX(dpx)
      updateViews()
    }
  })
  
  const applyOnDragStart = useAsCallback(() => { })
  
  const applyOnDragEnd = useAsCallback((velx: number) => {
    if (isDragging) updateViewsAndFinish(velx)
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
    
    const { horizontal, drag } = getDragDirection({ mx, my })
    
    updateDragProgress({ first, vpx, vpy, dx, dy })
    
    // onEachDrag
    applyOnEachDrag(getDragDeltaProgressX(), horizontal, drag)
    // onDragStart
    if (first) { applyOnDragStart() }
    // onDragging
    if (!first && !last) { }
    // onDragEnd
    if (last) { applyOnDragEnd(velx) }
  })
  
  
  
  return {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgressX,
    getStartItemProgress,
    getDeltaProgressX,
    animatedDeltaProgressX,
    
    animateTo: useAsCallback(animateTo),
  }
}


