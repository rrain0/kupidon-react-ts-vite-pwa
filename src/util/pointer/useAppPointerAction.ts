import { useCallback } from 'react'



let wasDraggedGlobal = false



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


