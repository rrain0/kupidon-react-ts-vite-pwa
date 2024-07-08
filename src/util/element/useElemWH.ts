import React, { useEffect, useState } from 'react'
import { getElemProps } from 'src/util/element/ElemProps'
import { useAwaitMounting } from 'src/util/react/useAwaitMounting.ts'



export const useElemWH = (elemRef: React.RefObject<HTMLElement>) => {
  
  const getElem = () => elemRef.current
  
  useAwaitMounting()
  
  const [dimens, setDimens] = useState({ w: 0, h: 0 } as { w: number, h: number })
  
  useEffect(() => {
    const elem = getElem()
    if (elem) {
      const update = () => {
        const elemProps = getElemProps(elem)
        setDimens({ w: elemProps.widthFloat, h: elemProps.heightFloat })
      }
      const resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(elem)
      return () => resizeObserver.disconnect()
    }
  }, [getElem()])
  
  return dimens
}
