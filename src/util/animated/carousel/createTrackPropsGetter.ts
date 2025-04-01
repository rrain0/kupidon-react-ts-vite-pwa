import React from 'react'
import { getViewProps } from 'src/util/view/ViewProps.ts'



export const createTrackPropsGetter = (trackRef: React.RefObject<HTMLElement>) => {
  return () => {
    const track = trackRef.current
    if (track) {
      const p = getViewProps(trackRef.current)
      return { x: p.x, y: p.y, w: p.w, h: p.h }
    }
    return { x: 0, y: 0, w: 0, h: 0 }
  }
}

