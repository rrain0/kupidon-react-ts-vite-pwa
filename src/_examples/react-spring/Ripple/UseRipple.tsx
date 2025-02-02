import React, { useMemo, useState } from 'react'
import { RippleProps } from './Ripple.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import { useBool } from '@util/react-state/useBool.ts'
import Puro = TypeU.Puro



type UseRippleProps = Puro<{
  children: (renderProps: UseRippleRenderProps) => React.ReactNode
}>

const UseRipple = React.memo((props: UseRippleProps) => {
  
  
  const [isShow, show, hide] = useBool(false)
  const [clientXY, setClientXY] = useState({ x: 0, y: 0 })
  
  const target = useMemo<RippleTargetProps>(() => {
    return {
      onPointerDown: (ev: React.PointerEvent) => {
        ev.currentTarget.setPointerCapture(ev.pointerId)
        setClientXY({ x: ev.clientX, y: ev.clientY })
        show()
      },
      onPointerUp: hide,
      onPointerCancel: hide,
    }
  }, [])
  
  const useRippleRenderProps = useMemo<UseRippleRenderProps>(() => {
    return {
      target,
      ripple: { isShow, clientXY },
    }
  }, [target, isShow])
  
  
  return props.children?.(useRippleRenderProps)
})
export default UseRipple



export type RippleTargetProps = {
  onPointerDown: React.PointerEventHandler<any>
  onPointerUp: React.PointerEventHandler<any>
  onPointerCancel: React.PointerEventHandler<any>
}

export type RippleRippleProps = Pick<RippleProps, 'isShow' | 'clientXY'>

export type UseRippleRenderProps = {
  target: RippleTargetProps
  ripple: RippleRippleProps
}
