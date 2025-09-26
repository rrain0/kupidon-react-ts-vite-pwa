import { useEffect } from 'react'

import { Cb } from 'src/utils/base/tsUtils.ts'
import { isdef } from 'src/utils/base/tsUtils.ts'



export const useInterval2 = (
  { offset = 0, interval = 0, disabled = false },
  callback: Cb, // must be stable
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
