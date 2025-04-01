import { useCallback } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import Callback1 = TypeU.Callback1



// Does not trigger rerender (if you do not set state inside callback)
export const useResizeRef = <T extends HTMLElement = HTMLElement>(onResize: Callback1<T | null>) => {
  const [getResizeObserver, setResizeObserver] = useRefGetSet(undefined as undefined | ResizeObserver)
  
  const elementFunctionalRef = useCallback((elem: T | null) => {
    getResizeObserver()?.disconnect()
    setResizeObserver(undefined)
    
    onResize(elem)
    if (elem) {
      const update = () => onResize(elem)
      const resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(elem)
      setResizeObserver(resizeObserver)
    }
  }, [onResize])
  
  return elementFunctionalRef
}

