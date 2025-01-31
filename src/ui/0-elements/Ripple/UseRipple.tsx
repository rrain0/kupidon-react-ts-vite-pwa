import React, { useMemo, useState } from 'react'
import { RippleProps } from 'src/ui/0-elements/Ripple/Ripple'
import { TypeU } from 'src/util/common/TypeU'
import { useBool } from 'src/util/react-state/useBool'
import Puro = TypeU.Puro



type UseRippleProps = Puro<{
  children: (renderProps: UseRippleRenderProps) => React.ReactNode
}>

const UseRipple = React.memo((props: UseRippleProps) => {
  
  // TODO Pointer
  // TODO 'show' | 'hide' | 'resume' | 'stop'
  // TODO попробовать зажать одним пальцем, потом другим, по идее на другой палец должен быть второй риппл
  //  Посмотерть когда событие клика при таком раскладе работает
  // TODO если поинтер вышел за пределы - 'hide', еесли вошёл обратно - 'resume'
  // 'show' сбрасывает параметры для нвого риппла
  // 'hide' прячет текущий риппл, делая прозрачным
  // 'resume' возобновляет спрятанный риппл
  // 'stop' немедленно безвозвратно завершает текущий риппл
  // 'stop' -> 'show'
  // 'show' | 'resume' -> 'hide'
  // 'hide' -> 'resume'
  // any -> 'stop'
  const [isShow, show, hide] = useBool(false)
  const [clientXY, setClientXY] = useState({ x: 0, y: 0 })
  
  const target = useMemo<RippleTargetProps>(() => {
    return {
      onPointerDown: (ev: React.PointerEvent) => {
        // TODO
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
