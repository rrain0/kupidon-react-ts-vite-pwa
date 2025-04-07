import { useCallback } from 'react'



let wasDraggedGlobal = false

// Сбросить состояние при каждом новом pointerDown
window.addEventListener('pointerdown', () => {
  wasDraggedGlobal = false
}, { capture: true })



// Хук, чтобы установить или определить,
// был ли drag после текущего pointerDown и до следующего pointerDown
export const useWasDragged = () => {
  
  const getWasDragged = useCallback(() => {
    return wasDraggedGlobal
  }, [])
  const setWasDragged = useCallback((wasDragged: boolean) => {
    wasDraggedGlobal = wasDragged
  }, [])
  
  return {
    getWasDragged, setWasDragged,
  }
}


