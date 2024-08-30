import { useCallback } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'
import Callback1 = TypeU.Callback1



export const useResize = <T extends HTMLElement | null>(onResize: Callback1<T>) => {
  const [getResizeObserver, setResizeObserver] = useRefGetSet(undefined as undefined | ResizeObserver)
  
  const updateElem = useCallback<Callback1<T>>(elem => {
    const r = getResizeObserver()
    if (r) r.disconnect()
    setResizeObserver(undefined)
    
    onResize(elem)
    if (elem) {
      const update = () => onResize(elem)
      const resizeObserver = new ResizeObserver(update)
      setResizeObserver(resizeObserver)
      resizeObserver.observe(elem)
    }
  }, [onResize])
  
  return updateElem
}

