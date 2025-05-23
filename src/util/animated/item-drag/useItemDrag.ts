import { AnimationFun } from '@animated/AnimationConfig.ts'
import { createSpring, SpringAnimationData } from '@animated/SpringAnimation.tsx'
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
import Callback = TypeU.Callback




export type Spring2DAnimationData = Pu<{
  x: SpringAnimationData
  y: SpringAnimationData
}>


export type UseItemDragEventListeners = Pu<{
  onDragStart: Callback
  onDragEnd: Callback
}>

export type UseItemDragProps = {
  noDragStart?: boolean | undefined
  noDragging?: boolean | undefined
}

export const useItemDrag = ({
  noDragStart, noDragging,
}: UseItemDragProps = { }) => {
  
  const isX = true
  const isY = true
  
  const [getEventListeners] = useRefGetSet<UseItemDragEventListeners>({ })
  
  
  const {
    get: getIsDragging, set: setIsDragging, state: isDragging,
  } = useStateAndRef(false)
  
  const [getDragWasStarted, setDragWasStarted] = useRefGetSet(false)
  
  const { setNoTouchAction } = useNoTouchAction()
  const { setNoSelect } = useNoSelect()
  
  // Второй и тд пальцы не смогут вызвать драг.
  // Если текущий драг был прерван, то он не сможет продолжиться.
  const [getCanStartDrag, setCanStartDrag] = useRefGetSet(true)
  const { getWasDragged, applyWasDragged } = useWasGesture()
  
  
  const [getMxMy, setMxMy] = useRefGetSet({ mx: 0, my: 0 })
  const animatedMxMy = useAnimatedValue({ mx: 0, my: 0 })
  
  
  const updateViews = () => {
    //console.log('updateViews')
    
    animatedMxMy.set(getMxMy())
    
    
    
    // TODO Animation - Springy drag
    // Doesn't work
    
    // const { mx: toMx, my: toMy } = getMxMy()
    // const {
    //   x: { prevVelocity: vel0X, prevTime: time0X } = {},
    //   y: { prevVelocity: vel0Y, prevTime: time0Y } = {},
    // } = animatedMxMy.animationData as Spring2DAnimationData | undefined ?? { }
    //
    // console.log('animatedMxMy.animationData', animatedMxMy.animationData)
    // console.log('time0X', time0X)
    //
    // const mxMyAnimationFun: AnimationFun<
    //   { mx: number, my: number }, Spring2DAnimationData | undefined
    // > = ({
    //   startValue, time,
    //   data: { x, y } = {},
    // }) => {
    //
    //   const springX = createSpring({
    //     mass: 1, tension: 120, friction: 7, from: startValue.mx, initVelocity: vel0X,
    //   })
    //   const currX = springX({ to: toMx, time, prev: x })
    //   console.log('currX', currX)
    //
    //   const springY = createSpring({
    //     mass: 1, tension: 120, friction: 7, from: startValue.my, initVelocity: vel0Y,
    //   })
    //   const currY = springY({ to: toMy, time, prev: y })
    //
    //   return {
    //     value: { mx: currX.value, my: currY.value },
    //     finished: currX.finished && currY.finished,
    //     data: { x: currX, y: currY },
    //   }
    // }
    //
    // animatedMxMy.animate({
    //   animationFun: mxMyAnimationFun,
    //   /* initialData: {
    //    x: { prevTime: time0X },
    //    y: { prevTime: time0Y },
    //    }, */
    // })
    //
  }
  
  
  
  
  // onFirstDrag - start pointer event (pointer down)
  // onEachDrag - each pointer event (down, move, up, cancel, ...)
  // onLastDrag - end pointer event (up, cancel)
  
  // onDragStart - fires when was decided that actual drag gesture was recognized and started
  // onDragging - fires onPointerMove when drag was started and wasn't ended
  // onDragEnd - fires when was decided that actual drag gesture was ended
  
  
  
  
  const applyOnFirstDrag = useAsCallback(() => {
  
  })
  
  const applyOnDragStart = useAsCallback(() => {
    if (!noDragging) setNoSelect(true)
    setIsDragging(true)
    setCanStartDrag(false)
    applyWasDragged()
    getEventListeners().onDragStart?.()
    //tryEmitStartEvent({ fromDrag: true })
  })
  
  
  
  const applyOnDragging = ({ m }: { m: { mx: number, my: number } }) => {
    if (isDragging) {
      //setDeltaProgress(dp)
      setMxMy(m)
      if (!noDragging) {
        setNoTouchAction(true)
        applyWasDragged()
        updateViews()
      }
      else {
        setNoTouchAction(false)
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
      let noTouchAction = false
      if (!getIsDragging() && getCanStartDrag() && !getWasDragged() && drag) {
        applyOnDragStart()
      }
      if (!getIsDragging() && !getCanStartDrag()) {
        noTouchAction = true
      }
      setNoTouchAction(noTouchAction)
    }
    applyOnDragging({ m })
  })
  
  
  
  const applyOnDragEnd = () => {
    if (isDragging && !noDragging) {
      //updateViewsAndFinish(vel, true) // TODO
      updateViews()
      getEventListeners().onDragEnd?.()
    }
    else {
      setMxMy({ mx: 0, my: 0 })
    }
  }
  
  const applyOnLastDrag = useAsCallback(() => {
    applyOnDragEnd()
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
    
    eventListeners: getEventListeners(), // stable, supports not stable listeners
  }
}


