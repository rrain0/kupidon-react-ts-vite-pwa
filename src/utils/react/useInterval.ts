import { useEffect } from 'react'

import { Cb } from 'src/utils/base/typeUtils.ts'




export const useInterval = (
  interval: number,
  callback: Cb,
  deps: any[] = [],
) => {
  useEffect(() => {
    const id = setInterval(callback, interval)
    return () => clearInterval(id)
  }, deps)
}


