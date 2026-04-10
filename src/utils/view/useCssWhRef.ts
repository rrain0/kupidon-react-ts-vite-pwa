import { useCallback } from 'react'
import { useResizeRef } from 'src/utils/elem/react/useResizeRef.ts'
import { getViewProps } from 'src/utils/view/ViewProps'


// Set element width & height to css --w & --h
export const useCssWhRef = () => {
  
  const refFunction = useResizeRef<HTMLElement>(useCallback((elem) => {
    if (elem) {
      const p = getViewProps(elem)
      p.setCssProps({
        '--w': `${p.w}px`,
        '--h': `${p.h}px`,
      })
    }
  }, []))
  
  // onElemSetWh
  return refFunction
}

