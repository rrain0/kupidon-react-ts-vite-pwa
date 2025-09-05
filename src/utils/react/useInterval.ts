import { useEffect } from 'react'

import { Callback } from 'src/utils/base/typeUtils.ts'




export const useInterval = (
  interval: number,
  callback: Callback,
  deps: any[] = [],
) => {
  useEffect(() => {
    const id = setInterval(callback, interval)
    return () => clearInterval(id)
  }, deps)
}


