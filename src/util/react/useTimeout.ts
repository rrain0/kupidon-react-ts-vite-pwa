import { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback = TypeU.Callback




export const useTimeout = (delay: number, callback: Callback, deps?: any[] | undefined) => {
  useEffect(() => {
    const id = setTimeout(callback, delay)
    return () => clearTimeout(id)
  }, deps)
}
