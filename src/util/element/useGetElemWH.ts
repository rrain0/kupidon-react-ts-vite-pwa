import React, { useMemo } from 'react'
import { getElemProps } from 'src/util/element/ElemProps'
import { ElemU } from 'src/util/element/ElemU'
import { useAwaitMounting } from 'src/util/react/useAwaitMounting'
import WH = ElemU.WH



export const useGetElemWH = (elemRef: React.RefObject<any>) => {
  
  useAwaitMounting()
  
  return useMemo(() => {
    return {
      
      w: () => {
        const elem = elemRef.current
        if (!elem) return 0
        return getElemProps(elem).w
      },
      
      h: () => {
        const elem = elemRef.current
        if (!elem) return 0
        return getElemProps(elem).h
      },
      
    }
  }, [])
}


