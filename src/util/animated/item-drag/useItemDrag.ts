import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import { useLockAppGestures } from 'src/util/app/useLockAppGestures.ts'
import { getDragDirection } from 'src/util/drag/getDragDirection.ts'
import { useNoSelect } from 'src/util/pointer/useNoSelect.ts'
import { useNoTouchAction } from 'src/util/pointer/useNoTouchAction.ts'
import { useWasGesture } from 'src/util/pointer/useWasGesture.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useStateAndRef } from 'src/util/react-state/useStateAndRef.ts'




export type UseItemDragProps = {
  noDrag?: boolean | undefined
}

export const useItemDrag = ({
  noDrag,
}: UseItemDragProps = { }) => {
  
  const isX = true
  const isY = true
  
  
  const {
    get: getIsDragging, set: setIsDragging, state: isDragging,
  } = useStateAndRef(false)
  
  const [lockTouchAction, unlockTouchAction] = useNoTouchAction()
  useNoSelect(isDragging)
  const canUseGestures = useLockAppGestures(isDragging)
  
  
  
  const [getMxMy, setMxMy] = useRefGetSet({ mx: 0, my: 0 })
  const animatedMxMy = useAnimatedValue({ mx: 0, my: 0 })
  
  const updateViews = () => {
    animatedMxMy.set(getMxMy())
  }
  
  
  
  // Второй и тд пальцы не смогут вызвать драг.
  // Если текущий драг был прерван, то он не сможет продолжиться.
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, applyWasDragged } = useWasGesture()
  
  
  
  const applyOnFirstDrag = useAsCallback(() => {
    if (noDrag) setCanStartDrag(false)
  })
  
  const applyOnDragStart = useAsCallback(() => {
    setIsDragging(true)
    setCanStartDrag(false)
    applyWasDragged()
    //tryEmitStartEvent({ fromDrag: true })
  })
  
  
  const applyOnEachDrag = useAsCallback(({
    m, horizontal, vertical, drag,
  }: {
    m: { mx: number, my: number }, horizontal: boolean, vertical: boolean, drag: boolean,
  }) => {
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
      //setDeltaProgress(dp)
      setMxMy(m)
      updateViews()
    }
  })
  
  const applyOnLastDrag = useAsCallback(() => {
    //if (isDragging) updateViewsAndFinish(vel, true) // TODO
    if (isDragging) updateViews()
    setCanStartDrag(true)
    unlockTouchAction()
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
    
    const { horizontal, vertical, drag } = getDragDirection({ mx, my })
    
    // onFirstDrag
    if (first) {
      //updateIntervalProgress({ value: vpVal, dValue: dVal, dValueProgress: getDeltaProgress() })
      applyOnFirstDrag()
    }
    // onEachDrag
    {
      //updateIntervalProgress({ dValue: dVal })
      //applyOnEachDrag({ dp: rf3(getIntervalDeltaProgress()), horizontal, vertical, drag })
      applyOnEachDrag({ m: { mx, my }, horizontal, vertical, drag })
    }
    // onDragging
    if (!first && !last) {
      /* applyOnDragging(...) */
    }
    // onLastDrag
    if (last) {
      applyOnLastDrag()
    }
  }, { })
  
  
  return {
    isDragging,
    getIsDragging, // stable
    getWasDragged, // stable
    onTrackDrag, // not stable
    
    getMxMy, // stable
    animatedMxMy, // stable
  }
}


