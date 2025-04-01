import { createSpringAnimation } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import { useLockAppGestures } from '@util/app/useLockAppGestures.ts'
import { MathU } from '@util/common/MathU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { getDragDirection } from '@util/drag/getDragDirection.ts'
import { GetTrackProps, useDragProgress } from '@util/drag/useDragProgress.ts'
import { useAppPointerAction } from '@util/pointer/useAppPointerAction.ts'
import { useNoSelect } from '@util/pointer/useNoSelect.ts'
import { useNoTouchAction } from '@util/pointer/useNoTouchAction.ts'
import { useAsCallback } from '@util/react-state/useAsCallback.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import { useLayoutEffect, useMemo } from 'react'
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
  visibleViewsCnt: number
  getTrackProps: GetTrackProps
  
  noDrag?: boolean | undefined
  noLoop?: boolean | undefined // так же будет влиять и на направление перемещения по индексу
  
  onFinish?: Callback1<ProgressEvent> | undefined
}

export const useGallery = (props: UseGalleryProps, deps: any[] = []) => {
  const {
    itemsCnt,
    visibleViewsCnt,
    getTrackProps,
    noDrag,
    noLoop,
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
  // curr progress x in (..0..100..) from start progress x
  const [getCurrProgressX, setCurrProgressX] = useRefGetSet(0)
  
  const animatedCurrProgressX = useAnimatedValue(0)
  
  // Events log
  const [getEventsLog, setEventsLog] = useRefGetSet(undefined as [] | undefined)
  
  
  
  const vThreshold = 150 // %width/s
  // px/ms => %width/s
  const getVelPercent = (velPx: number) => velPx * 1000 / getTrackProps().w * 100
  // %width/s => px/ms
  const getVelPx = (Progress: number) => Progress / 100 * getTrackProps().w / 1000
  
  const animateTo = async ({
    next,
    prev,
    p: nextP,
    //itemI: nextItemI, // TODO Gallery
    vel0,
  }: AnimateToParams) => {
    const pStart = getStartProgressX()
    const pCurr = getCurrProgressX()
    const p = pStart + pCurr
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
      const nextPCurr = nextP - pStart
      await animatedCurrProgressX.animate({
        startValue: pCurr,
        animationFun: createSpringAnimation({
          //mass: 1, tension: 170, friction: 10,
          mass: 1, tension: 120, friction: 7,
          //mass: 5, tension: 60, friction: 5,
          initVelocity: vel0,
          endValue: nextPCurr,
        }),
        onUpdate: ({ value }) => setCurrProgressX(value),
      })
    }
    
    const itemP = getStartItemProgress() + getCurrProgressX()
    const pos0ItemI = RangeU.loop(itemsCnt - Math.floor(itemP / 100), [0, itemsCnt])
    onFinish({ last: true, pos0ItemI })
  }
  
  
  
  const updateViews = () => {
    animatedCurrProgressX.set(getCurrProgressX())
  }
  
  const updateViewsAndFinish = (velx = 0) => {
    updateViews()
    
    const velxPercent = getVelPercent(velx)
    
    const pStart = getStartProgressX()
    const pCurr = getCurrProgressX()
    const p = pStart + pCurr
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
    getDragCurrProgressX,
  } = useDragProgress({ getTrackProps })
  
  
  const mergeProgress = () => {
    const p = getStartProgressX() + getCurrProgressX()
    // Если имеем 0 или 1 отображаемых view, то листать не можем, поэтому считаем что 0 прогресс
    const viewMaxP = visibleViewsCnt * 100
    const pStart = MathU.round3(RangeU.loop(p, [0, viewMaxP]))
    setStartProgressX(pStart)
    const itemP = getStartItemProgress() + getCurrProgressX()
    // Если имеем 0 или 1 item, то листать не можем, поэтому считаем что 0 прогресс
    const itemMaxP = itemsCnt * 100
    const itemPStart = MathU.round3(RangeU.loop(itemP, [0, itemMaxP]))
    setStartItemProgress(itemPStart)
    setCurrProgressX(0)
  }
  
  const [getNeedMerge, setNeedMerge] = useRefGetSet(true)
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, setWasDragged } = useAppPointerAction()
  
  
  const applyOnEachDrag = useAsCallback((cpy: number, horizontal: boolean, drag: boolean) => {
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
      setCurrProgressX(cpy)
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
    applyOnEachDrag(getDragCurrProgressX(), horizontal, drag)
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
    getCurrProgressX,
    animatedCurrProgressX,
    
    animateTo: useAsCallback(animateTo),
  }
}


