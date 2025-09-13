import { useEffect } from 'react'

import { Cb } from 'src/utils/base/typeUtils.ts'




export const useTimeout = (
  delay: number,
  callback: Cb, // must be stable
  deps: any[] = [],
) => {
  useEffect(() => {
    const id = setTimeout(callback, delay)
    return () => clearTimeout(id)
  }, [delay, ...deps])
}
