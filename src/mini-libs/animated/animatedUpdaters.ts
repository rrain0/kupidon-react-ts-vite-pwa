import { ObjectU } from '@util/common/ObjectU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, { useLayoutEffect, useMemo } from 'react'
import { AnimatedProperty } from 'src/mini-libs/animated/AnimatedProperty.ts'
import {
  AnimatedComponentState,
  AnimatedImgAttrs,
  AnimatedElemStyle,
} from 'src/mini-libs/animated/AnimatedProps.ts'
import isnumber = TypeU.isnumber
import ObjectMap = ObjectU.ObjectMap
import Callback1 = TypeU.Callback1
import Puro = TypeU.Puro
import RecordPu = TypeU.RecordPu
import Setter = TypeU.Setter



const useCreateComponentStateUpdaters = <S extends Record<string, any>>(
  updateState: Setter<S>,
  animatedState: AnimatedComponentState<S>,
  state: S,
) => {
  const [getCachedState, setCachedState] = useRefGetSet(state)
  setCachedState(state)
  
  return ObjectMap<
    AnimatedComponentState<S>,
    { [Prop in keyof S]: Callback1<S[Prop]> }
  >(
    animatedState,
    ([prop]) => [
      prop,
      value => {
        const cached = getCachedState()
        if (cached[prop] !== value) {
          const newState = { ...cached, [prop]: value }
          setCachedState(newState)
          updateState(newState)
        }
      },
    ]
  )
}



export type ImgAttrsUpdaters = Puro<{
  src: (value: string) => void
}>
const createImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
  animatedImgAttrs: AnimatedImgAttrs = { },
): ImgAttrsUpdaters => ({
  ...'src' in animatedImgAttrs && {
    src: (value: string) => {
      const el = imgRef.current
      if (el) {
        el.src = value
      }
    },
  },
})


export type ElemStyleUpdaters = Puro<{
  transform: (value: string) => void
  translate: (value: string) => void
  rotate: (value: string) => void
  scale: (value: string) => void
  opacity: (value: string) => void
  top: (value: string) => void
  right: (value: string) => void
  bottom: (value: string) => void
  left: (value: string) => void
  zIndex: (value: string) => void
}>

const createElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement>,
  animatedElemStyle: AnimatedElemStyle = { },
): ElemStyleUpdaters => ({
  ...'transform' in animatedElemStyle && {
    transform: (value: string) => {
      const el = elemRef.current
      if (el) {
        el.style.transform = value
      }
    },
  },
  ...'translate' in animatedElemStyle && {
    translate: (value: string) => {
      const el = elemRef.current
      if (el) {
        el.style.translate = value
      }
    },
  },
  ...'rotate' in animatedElemStyle && {
    rotate: (value: string) => {
      const el = elemRef.current
      if (el) {
        el.style.rotate = value
      }
    },
  },
  ...'scale' in animatedElemStyle && {
    scale: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        value = `${value}`
        el.style.scale = value
      }
    },
  },
  ...'opacity' in animatedElemStyle && {
    opacity: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        value = `${value}`
        el.style.opacity = value
      }
    },
  },
  
  ...'top' in animatedElemStyle && {
    top: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        if (isnumber(value)) value = `${value}px`
        el.style.top = value
      }
    },
  },
  ...'right' in animatedElemStyle && {
    right: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        if (isnumber(value)) value = `${value}px`
        el.style.right = value
      }
    },
  },
  ...'bottom' in animatedElemStyle && {
    bottom: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        if (isnumber(value)) value = `${value}px`
        el.style.bottom = value
      }
    },
  },
  ...'left' in animatedElemStyle && {
    left: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        if (isnumber(value)) value = `${value}px`
        el.style.left = value
      }
    },
  },
  ...'zIndex' in animatedElemStyle && {
    zIndex: (value: string | number) => {
      const el = elemRef.current
      if (el) {
        value = `${value}`
        el.style.zIndex = value
      }
    },
  },
})



const useUpdateUpdaters = (
  animated: RecordPu<string, AnimatedProperty<any>> | undefined,
  updaters: RecordPu<string, (...args: any[]) => void>,
) => {
  const [getPrevAnimated, setPrevAnimated] = useRefGetSet(animated)
  const [getPrevUpdaters, setPrevUpdaters] = useRefGetSet(updaters)
  
  const prevAnimated = getPrevAnimated()
  const prevUpdaters = getPrevUpdaters()
  setPrevAnimated(animated)
  setPrevUpdaters(updaters)
  
  useLayoutEffect(() => {
    for (const prop in prevAnimated) {
      const a = prevAnimated[prop] as AnimatedProperty<any> | undefined
      const u = prevUpdaters[prop]
      if (a && u) a.removeOnChange(u)
    }
    for (const prop in animated) {
      const a = animated[prop] as AnimatedProperty<any> | undefined
      const u = updaters[prop]
      if (a && u) {
        a.onChange(u)
        u(a.get())
      }
    }
  }, undefined)
}



// TODO Animated - make default event handler if unknown property
export const useUpdateComponentStateUpdaters = <S extends Record<string, any>>(
  setState: Setter<S>,
  animated: AnimatedComponentState<S>,
  state: S,
) => {
  const updaters = useCreateComponentStateUpdaters(setState, animated, state)
  useUpdateUpdaters(animated, updaters)
}

export const useUpdateElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement>,
  animated?: AnimatedElemStyle,
) => {
  const updaters = createElemStyleUpdaters(elemRef, animated)
  useUpdateUpdaters(animated, updaters)
}

export const useUpdateImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
  animated?: AnimatedImgAttrs,
) => {
  const updaters = createImgAttrsUpdaters(imgRef, animated)
  useUpdateUpdaters(animated, updaters)
}

