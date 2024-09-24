import React, { useMemo } from 'react'
import { getViewProps } from 'src/util/view/ViewProps'
import { useAwaitMounting } from 'src/util/react/useAwaitMounting'



export const useGetViewWh = (viewRef: React.RefObject<any>) => {
  
  useAwaitMounting()
  
  return useMemo(() => {
    return {
      
      w: () => {
        const elem = viewRef.current
        if (!elem) return 0
        return getViewProps(elem).w
      },
      
      h: () => {
        const elem = viewRef.current
        if (!elem) return 0
        return getViewProps(elem).h
      },
      
    }
  }, [])
}


