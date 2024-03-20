import { useCallback, useEffect, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Consumer = TypeUtils.Consumer
import Predicate = TypeUtils.Predicate
import Callback = TypeUtils.Callback






export const useAsyncEffect = 
(
  callback: (lock: Predicate<any>, unlock: Consumer<any>)=>(void|Callback), 
  deps: any[] | undefined
)=>{
  
  
  const inUseRef = useRef(new Set<any>())
  const lockId = useCallback(
    (id: any)=>{
      if (inUseRef.current.has(id)) return false
      inUseRef.current.add(id)
      return true
    },
    []
  )
  const unlockId = useCallback(
    (id: any)=>{
      inUseRef.current.delete(id)
    },
    []
  )
  
  
  useEffect(
    ()=>{
      // local set allows multiple calls of 'unlock'
      const inUseLocal = new Set<any>()
      const lockLocal = (id: any) => {
        const locked = lockId(id)
        if (locked) inUseLocal.add(id)
        return locked
      }
      const unlockLocal = (id: any) => {
        if (inUseLocal.has(id)) {
          inUseLocal.delete(id)
          unlockId(id)
        }
      }
      
      return callback(lockLocal, unlockLocal)
    },
    deps
  )
}