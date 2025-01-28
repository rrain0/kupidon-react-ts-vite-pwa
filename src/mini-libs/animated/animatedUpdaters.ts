import { TypeU } from '@util/common/TypeU.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, { useState } from 'react'
import { AnimatedImgAttrs, AnimatedStyle } from 'src/mini-libs/animated/AnimatedProps.ts'
import isnumber = TypeU.isnumber



const createImgAttrsUpdaters = (imgRef: React.RefObject<HTMLImageElement>) => ({
  src: (value: string) => {
    const el = imgRef.current
    if (el) el.src = value
  },
})

const createElemStyleUpdaters = (elemRef: React.RefObject<HTMLElement>) => ({
  transform: (value: string) => {
    const el = elemRef.current
    if (el) el.style.transform = value
  },
  translate: (value: string) => {
    const el = elemRef.current
    if (el) el.style.translate = value
  },
  rotate: (value: string) => {
    const el = elemRef.current
    if (el) el.style.rotate = value
  },
  scale: (value: string | number) => {
    const el = elemRef.current
    if (el) el.style.scale = `${value}`
  },
  opacity: (value: string | number) => {
    const el = elemRef.current
    if (el) el.style.opacity = `${value}`
  },
  
  top: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      el.style.top = value
    }
  },
  right: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      el.style.right = value
    }
  },
  bottom: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      el.style.bottom = value
    }
  },
  left: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      el.style.left = value
    }
  },
  zIndex: (value: string | number) => {
    const el = elemRef.current
    if (el) el.style.zIndex = `${value}`
  },
})




export const useImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
) => {
  return useState(() => createImgAttrsUpdaters(imgRef))[0]
}

export const useElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement>,
) => {
  return useState(() => createElemStyleUpdaters(elemRef))[0]
}




export const useRefreshElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement>,
  animatedStyle?: AnimatedStyle,
) => {
  const [getPrevAnimatedStyle, setPrevAnimatedStyle] = useRefGetSet(animatedStyle)
  const styleUpdaters = useElemStyleUpdaters(elemRef)
  
  const prevAnimated = getPrevAnimatedStyle()
  for (const s in prevAnimated) {
    prevAnimated[s].removeOnChange(styleUpdaters[s])
  }
  for (const s in animatedStyle) {
    animatedStyle[s].onChange(styleUpdaters[s])
  }
  setPrevAnimatedStyle(animatedStyle)
}

export const useRefreshImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
  animatedAttrs?: AnimatedImgAttrs,
) => {
  const [getPrevAnimatedImgAttrs, setPrevAnimatedStyleImgAttrs] = useRefGetSet(animatedAttrs)
  const styleUpdaters = useImgAttrsUpdaters(imgRef)
  
  const prevAnimated = getPrevAnimatedImgAttrs()
  for (const s in prevAnimated) {
    prevAnimated[s].removeOnChange(styleUpdaters[s])
  }
  for (const s in animatedAttrs) {
    animatedAttrs[s].onChange(styleUpdaters[s])
  }
  setPrevAnimatedStyleImgAttrs(animatedAttrs)
}

