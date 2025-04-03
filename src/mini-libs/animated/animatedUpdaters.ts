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
import Pu = TypeU.Pu
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



export type ImgAttrsUpdatersExplicit = Pu<{
  src: (value: string) => void
}>
export type ImgAttrsUpdaters = ImgAttrsUpdatersExplicit
const createImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
  animatedImgAttrs: AnimatedImgAttrs = { },
): ImgAttrsUpdaters => {
  
  const updaters = { } as ImgAttrsUpdaters
  
  for (const attr in animatedImgAttrs) {
    if (attr === 'src') {
      updaters[attr] = (value: string) => {
        const el = imgRef.current
        if (el) {
          el.src = value
        }
      }
    }
    else {
      updaters[attr] = (value: string) => {
        const el = imgRef.current
        if (el) {
          el.style[attr] = value
        }
      }
    }
  }
  
  return updaters
}



export type ElemStyleUpdatersExplicit = Pu<{
  transform: (value: string) => void
  translate: (value: string) => void
  rotate: (value: string | number) => void
  scale: (value: string | number) => void
  opacity: (value: string | number) => void
  top: (value: string | number) => void
  right: (value: string | number) => void
  bottom: (value: string | number) => void
  left: (value: string | number) => void
  zIndex: (value: string | number) => void
}>
export type ElemStyleUpdatersRest = Pu<{
  [Prop in Exclude<keyof CSSStyleDeclaration, keyof ElemStyleUpdatersExplicit>]: (value: string) => void
}>
export type ElemStyleUpdaters = ElemStyleUpdatersExplicit & ElemStyleUpdatersRest

const createElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement>,
  animatedElemStyle: AnimatedElemStyle = { },
): ElemStyleUpdaters => {
  
  const updaters = { } as ElemStyleUpdaters
  
  for (const prop in animatedElemStyle) {
    if (prop === 'transform' || prop === 'translate') {
      updaters[prop] = (value: string) => {
        const el = elemRef.current
        if (el) {
          el.style[prop] = value
        }
      }
    }
    else if (prop === 'rotate') {
      updaters[prop] = (value: string | number) => {
        const el = elemRef.current
        if (el) {
          if (isnumber(value)) value = `${value}turn`
          el.style[prop] = value
        }
      }
    }
    else if (prop === 'scale' || prop === 'opacity' || prop === 'zIndex') {
      updaters[prop] = (value: string | number) => {
        const el = elemRef.current
        if (el) {
          value = `${value}`
          el.style[prop] = value
        }
      }
    }
    else if (prop === 'top' || prop === 'right' || prop === 'bottom' || prop === 'left') {
      updaters[prop] = (value: string | number) => {
        const el = elemRef.current
        if (el) {
          if (isnumber(value)) value = `${value}px`
          el.style[prop] = value
        }
      }
    }
    else {
      updaters[prop] = (value: string) => {
        const el = elemRef.current
        if (el) {
          el.style[prop] = value
        }
      }
    }
  }
  
  return updaters
}



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

// TODO Animated - make any attr type ???
export const useUpdateImgAttrsUpdaters = (
  imgRef: React.RefObject<HTMLImageElement>,
  animated?: AnimatedImgAttrs,
) => {
  const updaters = createImgAttrsUpdaters(imgRef, animated)
  useUpdateUpdaters(animated, updaters)
}

