import { useEffect } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Callback = TypeUtils.Callback




export const useTimeout =
(delay: number, callback: Callback, deps?: any[])=>{
  useEffect(
    ()=>{
      const id = setTimeout(callback, delay)
      return ()=>clearTimeout(id)
    },
    deps
  )
}