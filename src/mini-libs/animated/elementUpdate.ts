import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React from 'react'



export const useUpdateImg = (
  imgRef: React.RefObject<HTMLImageElement>,
) => {
  
  const [getUpdateImgSrc] = useRefGetSet((value: string) => {
    const el = imgRef.current
    if (el) el.src = value
  })
  
  return {
    updateImgSrc: getUpdateImgSrc(),
  } as const
}



export const useUpdateStyle = (
  elemRef: React.RefObject<HTMLElement>,
) => {
  
  const [getUpdateStyleOpacity] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.opacity = `${value}`
  })
  const [getUpdateStyleScale] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.scale = `${value}`
  })
  const [getUpdateStyleTransform] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.transform = `${value}`
  })
  const [getUpdateStyleZIndex] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.zIndex = `${value}`
  })
  
  return {
    updateStyleOpacity: getUpdateStyleOpacity(),
    updateStyleScale: getUpdateStyleScale(),
    updateStyleTransform: getUpdateStyleTransform(),
    updateStyleZIndex: getUpdateStyleZIndex(),
  } as const
}



