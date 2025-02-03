import { TypeU } from '@util/common/TypeU.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, { useState } from 'react'
import { AnimatedImgAttrs, AnimatedStyle } from 'src/mini-libs/animated/AnimatedProps.ts'
import { batchUpdate } from 'src/mini-libs/animated/AnimatedValue.ts'
import isnumber = TypeU.isnumber



const createImgAttrsUpdaters = (imgRef: React.RefObject<HTMLImageElement>) => ({
  src: (value: string) => {
    const el = imgRef.current
    if (el) {
      el.src = value
    }
  },
})

const createElemStyleUpdaters = (elemRef: React.RefObject<HTMLElement>) => ({
  transform: (value: string) => {
    const el = elemRef.current
    if (el) {
      el.style.transform = value
    }
  },
  translate: (value: string) => {
    const el = elemRef.current
    if (el) {
      el.style.translate = value
    }
  },
  rotate: (value: string) => {
    const el = elemRef.current
    if (el) {
      el.style.rotate = value
    }
  },
  scale: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      value = `${value}`
      el.style.scale = value
    }
  },
  opacity: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      value = `${value}`
      el.style.opacity = value
    }
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
    if (el) {
      value = `${value}`
      el.style.zIndex = value
    }
  },
})




const createImgAttrsUpdaters2 = (imgRef: React.RefObject<HTMLImageElement>) => ({
  src: (value: string) => {
    const el = imgRef.current
    if (el) {
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { src: value }, style: { } })
      else props.attrs.src = value
    }
  },
})

const createElemStyleUpdaters2 = (elemRef: React.RefObject<HTMLElement>) => ({
  transform: (value: string) => {
    const el = elemRef.current
    if (el) {
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { transform: value } })
      else props.style.transform = value
    }
  },
  translate: (value: string) => {
    const el = elemRef.current
    if (el) {
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { translate: value } })
      else props.style.translate = value
    }
  },
  rotate: (value: string) => {
    const el = elemRef.current
    if (el) {
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { rotate: value } })
      else props.style.rotate = value
    }
  },
  scale: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      value = `${value}`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { scale: value } })
      else props.style.scale = value
    }
  },
  opacity: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      value = `${value}`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { opacity: value } })
      else props.style.opacity = value
    }
  },
  
  top: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { top: value } })
      else props.style.top = value
    }
  },
  right: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { right: value } })
      else props.style.right = value
    }
  },
  bottom: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { bottom: value } })
      else props.style.bottom = value
    }
  },
  left: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      if (isnumber(value)) value = `${value}px`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { left: value } })
      else props.style.left = value
    }
  },
  zIndex: (value: string | number) => {
    const el = elemRef.current
    if (el) {
      value = `${value}`
      const props = batchUpdate.get(el)
      if (!props) batchUpdate.set(el, { attrs: { }, style: { zIndex: value } })
      else props.style.zIndex = value
    }
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



// TODO Animated - make default event handler if unknown property
export const useRefreshElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement>,
  animatedStyle?: AnimatedStyle,
) => {
  const [getPrevAnimatedStyle, setPrevAnimatedStyle] = useRefGetSet(animatedStyle)
  //const [getPrevAnimatedStyleI] = useRefGetSet({ } as Record<string, number>)
  const styleUpdaters = useElemStyleUpdaters(elemRef)
  
  const prevAnimated = getPrevAnimatedStyle()
  //const prevI = getPrevAnimatedStyleI()
  for (const s in prevAnimated) {
    prevAnimated[s].removeOnChange(styleUpdaters[s])
    
    //prevAnimated[s].removeOnChange2(prevI[s])
  }
  for (const s in animatedStyle) {
    animatedStyle[s].onChange(styleUpdaters[s])
    
    //prevI[s] = animatedStyle[s].onChange2(styleUpdaters[s])
  }
  setPrevAnimatedStyle(animatedStyle)
}

export const useRefreshImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
  animatedAttrs?: AnimatedImgAttrs,
) => {
  const [getPrevAnimatedImgAttrs, setPrevAnimatedStyleImgAttrs] = useRefGetSet(animatedAttrs)
  //const [getPrevAnimatedStyleI] = useRefGetSet({ } as Record<string, number>)
  const styleUpdaters = useImgAttrsUpdaters(imgRef)
  
  const prevAnimated = getPrevAnimatedImgAttrs()
  //const prevI = getPrevAnimatedStyleI()
  for (const s in prevAnimated) {
    prevAnimated[s].removeOnChange(styleUpdaters[s])
    
    //prevAnimated[s].removeOnChange2(prevI[s])
  }
  for (const s in animatedAttrs) {
    animatedAttrs[s].onChange(styleUpdaters[s])
    
    //prevI[s] = animatedAttrs[s].onChange2(styleUpdaters[s])
  }
  setPrevAnimatedStyleImgAttrs(animatedAttrs)
}

