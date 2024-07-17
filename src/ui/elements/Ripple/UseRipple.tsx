import React, { useMemo } from 'react'
import { TypeU } from 'src/util/common/TypeU'
import { useBool } from 'src/util/react-state-and-ref/useBool'
import Puro = TypeU.Puro



type UseRippleProps = Puro<{
  children: (renderProps: UseRippleRenderProps) => React.ReactNode
}>

const UseRipple = React.memo(
  (props: UseRippleProps) => {
    
    
    const [isShow, show, hide] = useBool(false)
    
    const target = useMemo<RippleTargetProps>(() => {
      return {
        onPointerDown: (ev: React.PointerEvent) => {
          ev.currentTarget.setPointerCapture(ev.pointerId)
          show()
        },
        onPointerUp: hide,
        onPointerCancel: hide,
      }
    }, [])
    
    const useRippleRenderProps = useMemo<UseRippleRenderProps>(() => {
      return {
        target,
        ripple: { isShow },
      }
    }, [target, isShow])
    
    
    return props.children?.(useRippleRenderProps)
  }
)
export default UseRipple



export type RippleTargetProps = {
  onPointerDown: React.PointerEventHandler<any>
  onPointerUp: React.PointerEventHandler<any>
  onPointerCancel: React.PointerEventHandler<any>
}

export type RippleProps = {
  isShow: boolean
}

export type UseRippleRenderProps = {
  target: RippleTargetProps
  ripple: RippleProps
}
