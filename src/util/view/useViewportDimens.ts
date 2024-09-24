import { useEffect, useLayoutEffect, useMemo, useState } from 'react'



export const useViewportDimens = () => {
  const [dimens, setDimens] = useState({ w: window.innerWidth, h: window.innerHeight })
  
  useLayoutEffect(() => {
    const onResize = () => {
      setDimens({ w: window.innerWidth, h: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  useEffect(() => setDimens({ w: window.innerWidth, h: window.innerHeight }), [])
  
  const vpProps = useMemo(() => {
    const orientation = getOrientation(dimens.w, dimens.h)
    return {
      w: dimens.w,
      h: dimens.h,
      orientation,
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape',
      ratio: dimens.w / dimens.h,
    }
  }, [dimens])
  
  return vpProps
}



export type Orientation = 'landscape' | 'portrait' | 'square'
export const getOrientation = (w: number, h: number): Orientation => {
  if (w > h) return 'landscape'
  else if (h > w) return 'portrait'
  else return 'square'
}
