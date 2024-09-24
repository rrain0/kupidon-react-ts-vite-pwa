import React, { useEffect } from 'react'
import { getViewProps } from 'src/util/view/ViewProps.ts'
import { useAwaitMounting } from 'src/util/react/useAwaitMounting.ts'



// Set element width & height to css --w & --h
export const useViewWhAsCssProps = (elemRef: React.RefObject<HTMLElement>) => {
  
  const getElem = () => elemRef.current
  
  useAwaitMounting()
  
  useEffect(() => {
    const elem = getElem()
    if (elem) {
      const update = () => {
        const elemProps = getViewProps(elem)
        elem.style.setProperty('--w', `${elemProps.widthFloat}px`)
        elem.style.setProperty('--h', `${elemProps.heightFloat}px`)
      }
      const resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(elem)
      return () => resizeObserver.disconnect()
    }
  }, [getElem()])
  
}

