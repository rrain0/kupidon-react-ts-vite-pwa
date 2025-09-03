import { TypeU } from '@utils/base/TypeU.ts'
import { useAsCallback } from '@utils/react/state/useAsCallback.ts'
import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import React, { useEffect, useState } from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Callback = TypeU.Callback
import StyleProp = ReactU.StyleProp
import Pu = TypeU.Pu





export type OnTransitionEnd = (ev: TransitionEvent) => void

export type UseEnterExitTransitionProps<T extends HTMLElement = HTMLDivElement> = Pu<{
  isOpen: boolean
  allowUnmount: Callback
  enterTime: number
  exitTime: number
  initialStyle: StyleProp
  enterStyle: Partial<CSSStyleDeclaration>
  exitStyle: Partial<CSSStyleDeclaration>
  children: (renderProps: UseEnterExitTransitionRenderProps<T>) => React.ReactNode
}>
export type UseEnterExitTransitionRenderProps<T extends HTMLElement = HTMLDivElement> = {
  style: StyleProp | undefined,
  ref: React.Ref<T>,
}

const UseEnterExitTransition = ReactU.memo(
  <T extends HTMLElement = HTMLDivElement>(props: UseEnterExitTransitionProps<T>) => {
    const {
      isOpen = false,
      allowUnmount,
      enterTime = StyleVals.fadeInTime,
      exitTime = StyleVals.fadeOutTime,
      initialStyle,
      enterStyle,
      exitStyle,
      children,
    } = props
    
    
    const [getEl, setEl] = useElemRefGetSet<T>()
    
    
    const [on] = useRefGetSet({ transitionend: null as OnTransitionEnd | null })
    
    // Create slot for listener to allow outer code to use element.ontransitionend = ...
    const onTransitionEnd: OnTransitionEnd = useAsCallback(ev => { on().transitionend?.(ev) })
    useEffect(() => {
      const el = getEl()
      if (el) {
        // Same listener won't be added twice to the same element
        el.addEventListener('transitionend', onTransitionEnd)
        return () => el.removeEventListener('transitionend', onTransitionEnd)
      }
    }, [])
    
    
    type State = undefined | 'appearing' | 'appeared' | 'disappearing' | 'disappeared'
    const [state, setState] = useState<{ v: State }>({ v: undefined })
    
    // useEffect triggers after ref is acquired so state change will be applied correctly
    useEffect(() => {
      if (isOpen) setState({ v: 'appearing' })
      else setState({ v: 'disappearing' })
    }, [isOpen])
    
    useEffect(() => {
      const el = getEl()
      if (el) {
        let stale = false
        if (state.v === 'appearing') {
          Object.assign(el.style, enterStyle)
          on().transitionend = ev => {
            if (ev.target === el) requestAnimationFrame(() => {
              if (stale) return
              on().transitionend = null
              setState(curr => curr === state ? { v: 'appeared' } : curr)
            })
          }
        }
        else if (state.v === 'appeared') {
          Object.assign(el.style, enterStyle, { transition: 'none' })
          on().transitionend = null
        }
        else if (state.v === 'disappearing') {
          Object.assign(el.style, exitStyle)
          on().transitionend = ev => {
            if (ev.target === el) requestAnimationFrame(() => {
              if (stale) return
              on().transitionend = null
              setState(curr => curr === state ? { v: 'disappeared' } : curr)
            })
          }
        }
        else if (state.v === 'disappeared') {
          Object.assign(el.style, exitStyle, { transition: 'none' })
          on().transitionend = null
          allowUnmount?.()
        }
        return () => { stale = true }
      }
    }, [state])
    
    return children?.({ style: initialStyle, ref: setEl })
  }
)
// @ts-expect-error
UseEnterExitTransition.displayName = 'UseEnterExitTransition'
export default UseEnterExitTransition

