import { AsyncU } from '@util/common/AsyncU.ts'
import { useWasGesture } from '@util/pointer/useWasGesture.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RippleAction, RippleProps } from 'src/ui/0-elements/Ripple/Ripple.tsx'
import { TypeU } from 'src/util/common/TypeU'
import Pu = TypeU.Pu
import wait = AsyncU.wait




export type RippleState = 'reset' | 'show' | 'reveal' | 'conceal' | 'hide'


type UseRippleProps = Pu<{
  children: (renderProps: UseRippleRenderProps) => React.ReactNode
}>

const UseRipple = React.memo(({ children }: UseRippleProps) => {
  
  const [clientXY, setClientXY] = useState({ x: 0, y: 0 })
  
  const [action, setAction] = useState<RippleAction>('reset')
  const [getState, setState] = useRefGetSet<RippleState>('reset')
  
  
  const applyAction = (newState: RippleState) => {
    const s = getState()
    if (newState === 'reset') {
      setState('reset')
      setAction('reset')
    }
    else if (newState === 'show') {
      setState('show')
      setAction('resetAndShow')
    }
    else if (newState === 'reveal') {
      if (s === 'conceal') {
        setState('reveal')
        setAction('reveal')
      }
    }
    else if (newState === 'conceal') {
      if (s === 'show' || s === 'reveal') {
        setState('conceal')
        setAction('hide')
      }
    }
    else if (newState === 'hide') {
      if (s === 'show' || s === 'reveal' || s === 'conceal') {
        setState('hide')
        setAction('hide')
      }
    }
  }
  
  
  const { getWasDragged } = useWasGesture({
    onDragStarted: () => applyAction('reset'),
    onLongPressed: () => applyAction('hide'),
  })
  const [getWasCancelled, setWasCancelled] = useRefGetSet(false)
  
  useEffect(() => {
    const end = () => {
      setWasCancelled(true)
      applyAction('hide')
      //console.log('end')
    }
    window.addEventListener('pointerup', end, { capture: true })
    window.addEventListener('pointercancel', end, { capture: true })
    return () => {
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
    }
  }, [])
  
  
  const target = useMemo<RippleTargetProps>(() => {
    return {
      onPointerDown: (ev: React.PointerEvent) => {
        setWasCancelled(false)
        setClientXY({ x: ev.clientX, y: ev.clientY })
        setTimeout(() => {
          if (!getWasDragged()) {
            //applyAction('show')
            const cancelled = getWasCancelled()
            if (!cancelled) applyAction('show')
            else {
              applyAction('show')
              wait(50, () => applyAction('hide'))
            }
          }
        }, 50)
      },
      
      onPointerEnter: () => {
        applyAction('reveal')
      },
      onPointerLeave: () => {
        applyAction('conceal')
      },
    }
  }, [])
  
  const useRippleRenderProps = useMemo<UseRippleRenderProps>(() => {
    return {
      target,
      ripple: { action, clientXY },
    }
  }, [target, action])
  
  
  return children?.(useRippleRenderProps)
})
export default UseRipple



export type RippleTargetProps = {
  onPointerDown: React.PointerEventHandler<any>
  onPointerEnter: React.PointerEventHandler<any>
  onPointerLeave: React.PointerEventHandler<any>
}

export type RippleRippleProps = Pick<RippleProps, 'action' | 'clientXY'>

export type UseRippleRenderProps = {
  target: RippleTargetProps
  ripple: RippleRippleProps
}
