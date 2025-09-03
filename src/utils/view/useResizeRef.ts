import { useCallback } from 'react'
import { useAsCallback } from 'src/utils/react/state/useAsCallback.ts'
import { useRefGetSet } from 'src/utils/react/state/useRefGetSet.ts'
import { Callback1 } from 'src/utils/base/TypeUtils.ts'



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

