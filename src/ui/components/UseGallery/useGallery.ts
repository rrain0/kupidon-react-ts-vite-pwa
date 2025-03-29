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
import { useAsRefGet } from '@util/react-state/useAsRefGet.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import { useCallback, useLayoutEffect, useMemo } from 'react'
import Puro = TypeU.Puro
import exists = TypeU.exists
import notExists = TypeU.notExists



// Simplicity vs Control balance is hard


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
}

export const useGallery = (props: UseGalleryProps, deps: any[] = []) => {
  const {
    itemsCnt,
    visibleViewsCnt,
    getTrackProps,
    noDrag,
  } = props
  
  
  
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
  // Assign initial value to views after obtaining their refs
  useLayoutEffect(() => animatedCurrProgressX.set(0), [])
  
  
  
  
  const vThreshold = 150 // %width/s
  
  const animateTo = ({
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
    
    const nextPICurr = 0 // ???
    
    //const nextP = pI + nextPICurr
    ;[nextP, vel0] = (() => {
      if (exists(next)) return [pI - 100, -vThreshold]
      if (exists(prev)) return [pI + 100, vThreshold]
      //if (exists(nextItemI)) return [0, 0]
      if (exists(nextP)) return [nextP, vel0 ?? nextP > p ? vThreshold : -vThreshold]
      return [undefined, 0]
    })()
    if (notExists(nextP)) return
    
    //console.log('nextP', nextP)
    if (p !== nextP) {
      const nextPCurr = nextP - pStart
      // Начальная скорость
      const v0 = vel0 ?? -vThreshold
      const t1 = 0.2 // s
      // Начальное ускорение
      const a0 = 2 * (nextP - p - v0 * t1) / t1**2
      
      //console.log('s0', pCurr, 't1', t1, 'a0', a0, 'v0', v0)
      
      // TODO
      //  1) Если чуть-чуть отодвинуть фото и отпустить, то оно отпружинивает за порог
      //  2) Надо чтобы анимация поднятия колоды в конце анимации перелистывания была медленней
      void animatedCurrProgressX.start({
        startValue: pCurr,
        animationFunction: (startValue, t) => {
          // Начальный путь
          const s0 = startValue
          t /= 1000 // ms => s
          
          const finished = t >= t1
          if (finished) t = t1
          let s = a0 * t**2 / 2 + v0 * t + s0
          s = MathU.round3(s)
          setCurrProgressX(s)
          return [s, finished]
        },
      })
    }
  }
  
  
  
  const updateViews = () => {
    animatedCurrProgressX.set(getCurrProgressX())
  }
  
  const updateViewsAndFinish = (velx = 0) => {
    updateViews()
    
    // px/ms => %width/s
    const velxPercent = velx * 1000 / getTrackProps().w * 100
    
    const pStart = getStartProgressX()
    const pCurr = getCurrProgressX()
    const p = pStart + pCurr
    const pICurr = p % 100
    const pI = p - pICurr
    
    const [nextPICurr, vel] = (() => {
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
    
    const nextP = pI + nextPICurr
    animateTo({ p: nextP, vel0: vel })
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
    setStartProgressX(MathU.round3(RangeU.loop(p, [0, viewMaxP])))
    const photoP = getStartItemProgress() + getCurrProgressX()
    // Если имеем 0 или 1 item, то листать не можем, поэтому считаем что 0 прогресс
    const itemMaxP = itemsCnt * 100
    setStartItemProgress(MathU.round3(RangeU.loop(photoP, [0, itemMaxP])))
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


