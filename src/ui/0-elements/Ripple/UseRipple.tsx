import React, { useEffect, useMemo, useState } from 'react'
import { RippleProps, RippleState } from 'src/ui/0-elements/Ripple/Ripple'
import { TypeU } from 'src/util/common/TypeU'
import Puro = TypeU.Puro



type UseRippleProps = Puro<{
  children: (renderProps: UseRippleRenderProps) => React.ReactNode
}>

const UseRipple = React.memo((props: UseRippleProps) => {
  const { children } = props
  
  const [state, setState] = useState('stop' as RippleState)
  const [clientXY, setClientXY] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const end = () => {
      setState('end')
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
        setClientXY({ x: ev.clientX, y: ev.clientY })
        setState('show')
      },
      
      onPointerEnter: () => setState('resume'),
      onPointerLeave: () => setState('hide'),
    }
  }, [])
  
  const useRippleRenderProps = useMemo<UseRippleRenderProps>(() => {
    return {
      target,
      ripple: { state, clientXY },
    }
  }, [target, state])
  
  
  return children?.(useRippleRenderProps)
})
export default UseRipple



export type RippleTargetProps = {
  onPointerDown: React.PointerEventHandler<any>
  onPointerEnter: React.PointerEventHandler<any>
  onPointerLeave: React.PointerEventHandler<any>
}

export type RippleRippleProps = Pick<RippleProps, 'state' | 'clientXY'>

export type UseRippleRenderProps = {
  target: RippleTargetProps
  ripple: RippleRippleProps
}
