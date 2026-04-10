import { objectMap } from 'src/utils/base/ObjectU.ts'
import { useRefGetSet } from 'src/utils/react/state/base/useRefGetSet.ts'
import React, { useLayoutEffect } from 'react'
import { AnimatedProperty } from '@libs/animated/AnimatedProperty.ts'
import {
  AnimatedComponentState,
  AnimatedElemAttrs,
  AnimatedElemStyle,
} from '@libs/animated/AnimatedProps.ts'
import { isnumber } from 'src/utils/base/tsUtils.ts'
import { Cb1 } from 'src/utils/base/tsUtils.ts'
import { Pu } from 'src/utils/base/tsUtils.ts'
import { RecordPu } from 'src/utils/base/tsUtils.ts'
import { Setter } from 'src/utils/base/tsUtils.ts'



const useCreateComponentStateUpdaters = <S extends Record<string, any>>(
  updateState: Setter<S>,
  animatedState: AnimatedComponentState<S>,
  state: S,
) => {
  const [getCachedState, setCachedState] = useRefGetSet(state)
  setCachedState(state)
  
  return objectMap<
    AnimatedComponentState<S>,
    { [Prop in keyof S]: Cb1<S[Prop]> }
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




export type ElemAttrsUpdaters = Record<string, (value?: string) => void>
const createElemAttrsUpdaters = (
  elemRef: React.RefObject<HTMLElement | null>,
  animatedElemAttrs: AnimatedElemAttrs = { },
): ElemAttrsUpdaters => {
  
  const updaters = { } as ElemAttrsUpdaters
  
  for (const attr in animatedElemAttrs) {
    updaters[attr] = (value?: string) => {
      if (value === undefined) return
      const el = elemRef.current
      if (el) {
        el[attr] = value
      }
    }
  }
  
  return updaters
}



export type ElemStyleUpdatersExplicit = Pu<{
  transform: (value?: string) => void
  translate: (value?: string) => void
  rotate: (value?: string | number) => void
  scale: (value?: string | number) => void
  opacity: (value?: string | number) => void
  top: (value?: string | number) => void
  right: (value?: string | number) => void
  bottom: (value?: string | number) => void
  left: (value?: string | number) => void
  zIndex: (value?: string | number) => void
}>
export type ElemStyleUpdatersRest = Pu<{
  [Prop in Exclude<keyof CSSStyleDeclaration, keyof ElemStyleUpdatersExplicit>]: (value?: string) => void
}>
export type ElemStyleUpdaters = ElemStyleUpdatersExplicit & ElemStyleUpdatersRest

const createElemStyleUpdaters = (
  elemRef: React.RefObject<HTMLElement | null>,
  animatedElemStyle: AnimatedElemStyle = { },
): ElemStyleUpdaters => {
  
  const updaters = { } as ElemStyleUpdaters
  
  for (const prop in animatedElemStyle) {
    if (prop === 'transform' || prop === 'translate') {
      updaters[prop] = (value: string = '') => {
        const el = elemRef.current
        if (el) {
          el.style[prop] = value
        }
      }
    }
    else if (prop === 'rotate') {
      updaters[prop] = (value: string | number = '') => {
        const el = elemRef.current
        if (el) {
          if (isnumber(value)) value = `${value}turn`
          el.style[prop] = value
        }
      }
    }
    else if (prop === 'scale' || prop === 'opacity' || prop === 'zIndex') {
      updaters[prop] = (value: string | number = '') => {
        const el = elemRef.current
        if (el) {
          value = `${value}`
          el.style[prop] = value
        }
      }
    }
    else if (prop === 'top' || prop === 'right' || prop === 'bottom' || prop === 'left') {
      updaters[prop] = (value: string | number = '') => {
        const el = elemRef.current
        if (el) {
          if (isnumber(value)) value = `${value}px`
          el.style[prop] = value
        }
      }
    }
    else {
      updaters[prop] = (value: string = '') => {
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
  elemRef: React.RefObject<HTMLElement | null>,
  animated?: AnimatedElemStyle,
) => {
  const updaters = createElemStyleUpdaters(elemRef, animated)
  useUpdateUpdaters(animated, updaters)
}


export const useUpdateElemAttrsUpdaters = (
  elemRef: React.RefObject<HTMLElement | null>,
  animated?: AnimatedElemAttrs,
) => {
  const updaters = createElemAttrsUpdaters(elemRef, animated)
  useUpdateUpdaters(animated, updaters)
}

