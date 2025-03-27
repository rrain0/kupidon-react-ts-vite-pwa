import { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback = TypeU.Callback
import Puro = TypeU.Puro
import exists = TypeU.exists



export type UseIntervalParams = Puro<{
  offset: number
  interval: number
}>
export const useInterval2 = (
  { offset = 0, interval = 0 }: UseIntervalParams,
  callback: Callback,
  deps: any[] = []
) => {
  useEffect(() => {
    let intervalId
    let timeoutId
    if (exists(offset)) {
      timeoutId = setTimeout(() => {
        callback()
        intervalId = setInterval(callback, interval)
      }, offset)
    }
    else {
      intervalId = setInterval(callback, interval)
    }
    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, deps)
}
