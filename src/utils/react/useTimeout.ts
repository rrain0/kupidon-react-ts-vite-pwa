import { useEffect } from 'react'

import { Callback } from 'src/utils/base/math/typeUtils.ts'




export const useTimeout = (
  delay: number,
  callback: Callback, // must be stable
  deps: any[] = [],
) => {
  useEffect(() => {
    const id = setTimeout(callback, delay)
    return () => clearTimeout(id)
  }, [delay, ...deps])
}
