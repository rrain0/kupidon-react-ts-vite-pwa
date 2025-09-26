import { useCallback } from 'react'
import { useAsCallback } from 'src/utils/state/react/base/useAsCallback.ts'
import { useRefGetSet } from 'src/utils/state/react/base/useRefGetSet.ts'
import { Cb1 } from 'src/utils/base/tsUtils.ts'



// Does not trigger rerender (if you do not set state inside callback)
export const useResizeRef = <T extends HTMLElement = HTMLDivElement>(
  onResize: Cb1<T | null> // supports not stable
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

