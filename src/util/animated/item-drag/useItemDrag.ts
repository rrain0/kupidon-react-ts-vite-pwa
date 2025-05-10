import { AnimationFun } from '@animated/AnimationConfig.ts'
import { createSpring } from '@animated/SpringAnimation.tsx'
import { useAnimatedValue } from '@animated/useAnimatedValue.ts'
import { useDrag } from '@use-gesture/react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { getDragDirection } from 'src/util/drag/getDragDirection.ts'
import { useNoSelect } from 'src/util/pointer/useNoSelect.ts'
import { useNoTouchAction } from 'src/util/pointer/useNoTouchAction.ts'
import { useWasGesture } from 'src/util/pointer/useWasGesture.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet.ts'
import { useStateAndRef } from 'src/util/react-state/useStateAndRef.ts'
import Pu = TypeU.Pu




export type Spring2DAnimationData = Pu<{
  prevTimestamp: number
  prevValue: { mx: number, my: number }
  prevVelocity: { mx: number, my: number }
  finished: { mx: boolean, my: boolean }
}>



export type UseItemDragProps = {
  noDragStart?: boolean | undefined
  noDragging?: boolean | undefined
}

export const useItemDrag = ({
  noDragStart,
  noDragging,
}: UseItemDragProps = { }) => {
  
  const isX = true
  const isY = true
  
  
  const {
    get: getIsDragging, set: setIsDragging, state: isDragging,
  } = useStateAndRef(false)
  
  const [getDragWasStarted, setDragWasStarted] = useRefGetSet(false)
  
  const { setLockTouchAction } = useNoTouchAction()
  useNoSelect(isDragging && !noDragging)
  
  // Второй и тд пальцы не смогут вызвать драг.
  // Если текущий драг был прерван, то он не сможет продолжиться.
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, applyWasDragged } = useWasGesture()
  
  
  const [getMxMy, setMxMy] = useRefGetSet({ mx: 0, my: 0 })
  const animatedMxMy = useAnimatedValue({ mx: 0, my: 0 })
  
  const updateViews = () => {
    animatedMxMy.set(getMxMy())
    return
    
    
    const { mx: toMx, my: toMy } = getMxMy()
    const { mx: vel0Mx, my: vel0My } =
      (animatedMxMy.animationData as Spring2DAnimationData | undefined)?.prevVelocity ?? { }
    const mxMyAnimationFun: AnimationFun<
      { mx: number, my: number }, Spring2DAnimationData | undefined
    > = ({
      startValue, time,
      data: { prevTimestamp, prevValue, prevVelocity, finished } = { },
    }) => {
      
      const springMx = createSpring({
        mass: 1, tension: 120, friction: 7, from: startValue.mx, initVelocity: vel0Mx,
      })
      const prevMx = {
        time: prevTimestamp, finished: finished?.mx,
        velocity: prevVelocity?.mx, value: prevValue?.mx,
      }
      const currMx = springMx({ to: toMx, time, prev: prevMx })
      
      
      const springMy = createSpring({
        mass: 1, tension: 120, friction: 7, from: startValue.my, initVelocity: vel0My,
      })
      const prevMy = {
        time: prevTimestamp, finished: finished?.my,
        velocity: prevVelocity?.my, value: prevValue?.my,
      }
      const currMy = springMy({ to: toMy, time, prev: prevMy })
      
      
      return {
        value: { mx: currMx.value, my: currMy.value },
        finished: currMx.finished && currMy.finished,
        data: {
          prevTimestamp: currMx.time,
          prevValue: { mx: currMx.value, my: currMy.value },
          prevVelocity: { mx: currMx.velocity, my: currMy.velocity },
          finished: { mx: currMx.finished, my: currMy.finished },
        },
      }
    }
    
    animatedMxMy.animate({ animationFun: mxMyAnimationFun })
  }
  
  
  
  
  
  
  const applyOnFirstDrag = useAsCallback(() => {
  
  })
  
  const applyOnDragStart = useAsCallback(() => {
    setIsDragging(true)
    setCanStartDrag(false)
    applyWasDragged()
    //tryEmitStartEvent({ fromDrag: true })
  })
  
  const applyOnDragging = ({ m }: { m: { mx: number, my: number } }) => {
    if (isDragging) {
      //setDeltaProgress(dp)
      setMxMy(m)
      if (!noDragging) {
        setLockTouchAction(true)
        applyWasDragged()
        updateViews()
      }
      else {
        setLockTouchAction(false)
      }
    }
  }
  
  const applyOnEachDrag = useAsCallback(({
    m, horizontal, vertical, drag,
  }: {
    m: { mx: number, my: number }, horizontal: boolean, vertical: boolean, drag: boolean,
  }) => {
    if (noDragStart) setCanStartDrag(false)
    const directional = isX && horizontal || isY && vertical
    if (directional) {
      let lockTouchAction = true
      if (!getIsDragging() && getCanStartDrag() && !getWasDragged() && drag) {
        applyOnDragStart()
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        lockTouchAction = false
      }
      setLockTouchAction(lockTouchAction)
    }
    applyOnDragging({ m })
  })
  
  const applyOnLastDrag = useAsCallback(() => {
    //if (isDragging) updateViewsAndFinish(vel, true) // TODO
    if (isDragging) updateViews()
    setCanStartDrag(true)
    setLockTouchAction(false)
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


