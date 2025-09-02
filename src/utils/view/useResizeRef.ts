import { useCallback } from 'react'
import { TypeU } from 'src/utils/common/TypeU'
import { useAsCallback } from 'src/utils/react-state/useAsCallback.ts'
import { useRefGetSet } from 'src/utils/react-state/useRefGetSet'
import Callback1 = TypeU.Callback1



// Does not trigger rerender (if you do not set state inside callback)
export const useResizeRef = <T extends HTMLElement = HTMLDivElement>(
  onResize: Callback1<T | null> // supports not stable
) => {
  const onResizeStable = useAsCallback(onResize)
  
  const [getResizeObserver, setResizeObserver] = useRefGetSet(undefined as undefined | ResizeObserver)
  
  const elementFunctionalRef = useCallback((elem: T | null) => {
    getResizeObserver()?.disconnect()
    setResizeObserver(undefined)
    
    onResizeStable(elem)
    if (elem) {
      const update = () => onResizeStable(elem)
      const resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(elem)
      setResizeObserver(resizeObserver)
    }
  }, [])
  
  return elementFunctionalRef
}

