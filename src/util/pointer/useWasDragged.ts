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



// Хук, чтобы установить или определить,
// был ли drag после текущего pointerDown и до следующего pointerDown
export const useWasDragged = (
  onDragStart?: Callback // need stable
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
  
  return {
    getWasDragged, setWasDragged,
  }
}


