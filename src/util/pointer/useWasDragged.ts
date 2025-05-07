import { useCallback, useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback = TypeU.Callback



let wasDraggedGlobal = false

const onDragStartListeners = new Set<Callback>()

// Сбросить состояние при каждом новом pointerDown
window.addEventListener('pointerdown', () => {
  wasDraggedGlobal = false
}, { capture: true })
window.addEventListener('scroll', () => {
  wasDraggedGlobal = true
  onDragStartListeners.forEach(it => it())
})



// Началом драга считается либо когда внешний код решил,
// что драг начался, установив его через setWasDragged(true) или applyWasDragged(),
// либо когда появился эвент скролла от браузера.
// Сброс состояния происходит onPointerDown.
export const useWasDragged = (
  onDragStart?: Callback // require stable
) => {
  
  useEffect(() => {
    if (onDragStart) {
      onDragStartListeners.add(onDragStart)
      return () => { onDragStartListeners.delete(onDragStart) }
    }
  }, [onDragStart])
  
  const getWasDragged = useCallback(() => {
    return wasDraggedGlobal
  }, [])
  const setWasDragged = useCallback((wasDragged: boolean) => {
    wasDraggedGlobal = wasDragged
    if (wasDragged) onDragStartListeners.forEach(it => it())
  }, [])
  const applyWasDragged = useCallback(() => setWasDragged(true), [])
  
  return { getWasDragged, setWasDragged, applyWasDragged }
}


