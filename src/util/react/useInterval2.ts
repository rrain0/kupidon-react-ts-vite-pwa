import { useEffect } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import Callback = TypeU.Callback
import isdef = TypeU.isdef



export const useInterval2 = (
  { offset = 0, interval = 0, disabled = false },
  callback: Callback, // must be stable
  deps: any[] = [],
) => {
  useEffect(() => {
    if (!disabled) {
      let intervalId
      let timeoutId
      if (isdef(offset)) {
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
    }
  }, [interval, disabled, ...deps])
}
