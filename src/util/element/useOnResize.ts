import React, { useEffect } from 'react'
import { ArrayU } from 'src/util/common/ArrayU'
import { useAwaitMounting } from 'src/util/react/useAwaitMounting'
import arraify = ArrayU.arraify
import Arraify = ArrayU.Arraify



export const useOnResize = (
  elemRef: Arraify<React.RefObject<any>>,
  onResize: ResizeObserverCallback
) => {
  
  const elems = arraify(elemRef).map(it => it.current)
  
  useAwaitMounting()
  
  useEffect(() => {
    const filteredElems = elems.filter(it => it)
    if (filteredElems.length) {
      const resizeObserver = new ResizeObserver(onResize)
      filteredElems.forEach(it => resizeObserver.observe(it!))
      return () => resizeObserver.disconnect()
    }
  }, [...elems, onResize])
  
}



