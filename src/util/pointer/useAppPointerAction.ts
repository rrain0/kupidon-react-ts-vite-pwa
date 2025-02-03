import { useCallback } from 'react'



let wasDraggedGlobal = false

window.addEventListener('pointerdown', () => {
  wasDraggedGlobal = false
}, { capture: true })



export const useAppPointerAction = () => {
  
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


