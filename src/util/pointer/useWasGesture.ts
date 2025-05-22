import { useCallback, useEffect } from 'react'
import { isIOS } from 'react-device-detect'
import { TypeU } from 'src/util/common/TypeU.ts'
import { getDragDirection } from 'src/util/drag/getDragDirection.ts'
import { onPointer, OnPointerEvent } from 'src/util/pointer/onPointer.ts'
import { useAsCallback } from 'src/util/react-state/useAsCallback.ts'
import { getViewProps } from 'src/util/view/ViewProps.ts'
import Callback = TypeU.Callback



let wasDraggedGlobal = false
let wasLongPressedGlobal = false

const onDragStartedListeners = new Set<Callback>()
const onLongPressedListeners = new Set<Callback>()



const checkIosBackGesture = (ev: OnPointerEvent) => {
  const { firstMove, vpx0, velx, vely, mx, my } = ev
  const { toRight80deg } = getDragDirection({ mx, my })
  const { w } = getViewProps(window)
  if (isIOS && firstMove && vpx0 < 0.05 * w && Math.hypot(velx, vely) > 0.06 && toRight80deg) {
    wasDraggedGlobal = true
    onDragStartedListeners.forEach(it => it())
  }
}



const { onPointerDown, onPointerMove } = onPointer(ev => {
  const { first } = ev
  
  if (first) {
    // reset state
    wasDraggedGlobal = false
    wasLongPressedGlobal = false
  }
  
  checkIosBackGesture(ev)
})



window.addEventListener('pointerdown', (ev) => {
  onPointerDown(ev)
}, { capture: true })
window.addEventListener('pointermove', (ev) => {
  onPointerMove(ev)
}, { capture: true })


window.addEventListener('scroll', () => {
  wasDraggedGlobal = true
  onDragStartedListeners.forEach(it => it())
})



// Началом драга считается либо когда внешний код решил,
// что драг начался, установив его через setWasDragged(true) или applyWasDragged(),
// либо когда появился эвент скролла от браузера.
// Сброс состояния происходит onPointerDown.
export const useWasGesture = ({
  onDragStarted = undefined as Callback | undefined, // supports unstable
  onLongPressed = undefined as Callback | undefined, // supports unstable
} = { }) => {
  
  const onDragStartedStable = useAsCallback(onDragStarted)
  useEffect(() => {
    if (onDragStarted) {
      onDragStartedListeners.add(onDragStartedStable)
      return () => { onDragStartedListeners.delete(onDragStartedStable) }
    }
  }, [!!onDragStarted])
  
  const getWasDragged = useCallback(() => {
    return wasDraggedGlobal
  }, [])
  const setWasDragged = useCallback((wasDragged: boolean) => {
    if (wasDraggedGlobal !== wasDragged) {
      wasDraggedGlobal = wasDragged
      if (wasDragged) onDragStartedListeners.forEach(it => it())
    }
  }, [])
  const applyWasDragged = useCallback(() => setWasDragged(true), [])
  
  
  
  const onLongPressedStable = useAsCallback(onLongPressed)
  useEffect(() => {
    if (onLongPressed) {
      onLongPressedListeners.add(onLongPressedStable)
      return () => { onLongPressedListeners.delete(onLongPressedStable) }
    }
  }, [!!onLongPressed])
  
  const getWasLongPressed = useCallback(() => {
    return wasLongPressedGlobal
  }, [])
  const setWasLongPressed = useCallback((wasLongPressed: boolean) => {
    if (wasLongPressedGlobal !== wasLongPressed) {
      wasLongPressedGlobal = wasLongPressed
      if (wasLongPressed) onLongPressedListeners.forEach(it => it())
    }
  }, [])
  const applyLongPressed = useCallback(() => setWasLongPressed(true), [])
  
  
  
  const getWasGesture = useCallback(() => {
    return wasDraggedGlobal || wasLongPressedGlobal
  }, [])
  
  
  return {
    getWasDragged, setWasDragged, applyWasDragged,
    getWasLongPressed, setWasLongPressed, applyLongPressed,
    getWasGesture,
  }
}


