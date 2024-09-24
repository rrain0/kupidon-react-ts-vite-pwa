import React, { useEffect, useState } from 'react'
import { getViewProps } from 'src/util/view/ViewProps'
import { useAwaitMounting } from 'src/util/react/useAwaitMounting.ts'


// TODO replace & remove - test useResize
export const useViewWh = (elemRef: React.RefObject<HTMLElement>) => {
  
  const getElem = () => elemRef.current
  
  useAwaitMounting()
  
  const [dimens, setDimens] = useState({ w: 0, h: 0 } as { w: number, h: number })
  
  useEffect(() => {
    const elem = getElem()
    if (elem) {
      const update = () => {
        const elemProps = getViewProps(elem)
        setDimens({ w: elemProps.widthFloat, h: elemProps.heightFloat })
      }
      const resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(elem)
      return () => resizeObserver.disconnect()
    }
  }, [getElem()])
  
  return dimens
}
