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
  
  const [getUpdateStyleTransform] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.transform = `${value}`
  })
  const [getUpdateStyleTranslate] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.translate = `${value}`
  })
  const [getUpdateStyleRotate] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.rotate = `${value}`
  })
  const [getUpdateStyleScale] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.scale = `${value}`
  })
  const [getUpdateStyleOpacity] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.opacity = `${value}`
  })
  
  const [getUpdateStyleTop] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.top = `${value}`
  })
  const [getUpdateStyleRight] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.right = `${value}`
  })
  const [getUpdateStyleBottom] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.bottom = `${value}`
  })
  const [getUpdateStyleLeft] = useRefGetSet((value: string) => {
    const el = elemRef.current
    if (el) el.style.left = `${value}`
  })
  const [getUpdateStyleZIndex] = useRefGetSet((value: string | number) => {
    const el = elemRef.current
    if (el) el.style.zIndex = `${value}`
  })
  
  return {
    updateStyleTransform: getUpdateStyleTransform(),
    updateStyleTranslate: getUpdateStyleTranslate(),
    updateStyleRotate: getUpdateStyleRotate(),
    updateStyleScale: getUpdateStyleScale(),
    updateStyleOpacity: getUpdateStyleOpacity(),
    
    updateStyleTop: getUpdateStyleTop(),
    updateStyleRight: getUpdateStyleRight(),
    updateStyleBottom: getUpdateStyleBottom(),
    updateStyleLeft: getUpdateStyleLeft(),
    updateStyleZIndex: getUpdateStyleZIndex(),
  } as const
}



