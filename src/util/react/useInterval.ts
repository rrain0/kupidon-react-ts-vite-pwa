import { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback = TypeU.Callback




export const useInterval = (
  interval: number,
  callback: Callback,
  deps: any[] = []
) => {
  useEffect(() => {
    const id = setInterval(callback, interval)
    return () => clearInterval(id)
  }, deps)
}


