import { ReactU } from 'src/util/common/ReactU.ts'
import { useElemRef } from 'src/util/react-state/useElemRef.ts'
import clsx from 'clsx'
import React, {
  useCallback, useEffect,
} from 'react'
import { getElemProps } from '@util/element/ElemProps.ts'
import css from 'src/ui/elements/Ripple0/Ripple.module.scss'
import { TypeU } from '@util/common/TypeU.ts'
import { RippleStyle } from 'src/ui/elements/Ripple0/RippleStyle.ts'
import Puro = TypeU.Puro
import ClassStyleProps = ReactU.ClassStyleProps



type CursorInfo = {
  clientX: number
  clientY: number
  pointerId?: number | undefined
}


export type RippleMode = 'center' | 'cursor'



type RippleProps = ClassStyleProps & Puro<{
  rippleDuration: number // ripple animation duration per 200px
  mode: RippleMode
  rippleColor: string
  targetElement: React.RefObject<HTMLElement>
}>


const Ripple =
React.memo(
(props: RippleProps) => {
  
  const {
    rippleDuration,
    mode,
    rippleColor,
    targetElement,
    className,
    ...restProps
  } = props
  
  const [frameRef, getFrame] = useElemRef<HTMLDivElement>()
  const [rippleRef, getRipple] = useElemRef<HTMLDivElement>()
  const getTargetElement = () => props.targetElement?.current
  
  
  const showRipple = useCallback((ev?: CursorInfo) => {
    //console.log('showRipple')
    
    const frame = getFrame()
    const ripple = getRipple()
    //console.log('frame', frame)
    //console.log('ripple', ripple)
    if (frame && ripple) {
      ripple.classList.remove(css.rippleShow, css.rippleHide)
      
      const mode = function() {
        const modes: RippleMode[] = ['center', 'cursor']
        let mode: any = getElemProps(frame)
          .cssPropValue(RippleStyle.W.e.frame.e.p.mode.name)
        //console.log('mode', mode)
        //console.log('mode name', RippleStyle.W.e.frame.e.p.mode.name)
        if (!modes.includes(mode)) mode = props.mode
        if (!ev) mode = 'center'
        if (!modes.includes(mode)) mode = 'center'
        return mode as RippleMode
      }()
      
      const dimens = getElemProps(frame)
      const el = {
        clientX: dimens.clientXFloat,
        clientY: dimens.clientYFloat,
        w: dimens.width,
        h: dimens.height,
      }
      const d = function() {
        switch (mode) {
          case 'cursor': return {
            toTop: ev!.clientY - el.clientY,
            toRight: el.w - (ev!.clientX - el.clientX),
            toBottom: el.h - (ev!.clientY - el.clientY),
            toLeft: ev!.clientX - el.clientX,
          }
          case 'center': default: return {
            toTop: el.h / 2,
            toRight: el.w / 2,
            toBottom: el.h / 2,
            toLeft: el.w / 2,
          }
        }
      }()
      const dxd = {
        toTop: d.toTop * d.toTop,
        toRight: d.toRight * d.toRight,
        toBottom: d.toBottom * d.toBottom,
        toLeft: d.toLeft * d.toLeft,
      }
      const rippleProps = function() {
        const radius = Math.max(
          Math.sqrt(dxd.toTop + dxd.toLeft), // расстояние от точки касания до левого верхнего угла
          Math.sqrt(dxd.toTop + dxd.toRight), // расстояние от точки касания до правого верхнего угла
          Math.sqrt(dxd.toBottom + dxd.toRight), // расстояние от точки касания до правого нижнего угла
          Math.sqrt(dxd.toBottom + dxd.toLeft), // расстояние от точки касания до левого нижнего угла
        )
        return {
          radius: radius,
          left: d.toLeft - radius,
          top: d.toTop - radius,
        }
      }()
      
      // console.log('ev.clientY',ev.clientY)
      // console.log('ev.clientX',ev.clientX)
      // console.log('el',el)
      // console.log('d',d)
      // console.log('dxd',dxd)
      // console.log('rippleProps',rippleProps)
      
      const dur = props.rippleDuration ?? 500
      
      const style = frame.style
      props.rippleColor && style.setProperty(RippleStyle.W.e.frame.e.p.color.name, props.rippleColor)
      style.setProperty(
        '--ripple-animation-duration',
        Math.max(400, dur * rippleProps.radius / 200) + 'ms'
      )
      style.setProperty(
        '--dissolve-animation-duration',
        Math.max(500, (dur + 100) * rippleProps.radius / 200) + 'ms'
      )
      style.setProperty('--ripple-top', rippleProps.top + 'px')
      style.setProperty('--ripple-left', rippleProps.left + 'px')
      style.setProperty('--ripple-w', rippleProps.radius * 2 + 'px')
      style.setProperty('--ripple-h', rippleProps.radius * 2 + 'px')
      
      ripple.classList.add(css.rippleShow)
    }
  }, [props.mode, props.rippleColor, props.rippleDuration])
  
  
  const hideRipple = useCallback(() => {
    const rippleView = rippleRef.current
    if (rippleView) {
      rippleView.classList.remove(css.rippleHide)
      rippleView.classList.add(css.rippleHide)
    }
  }, [])
  
  
  // must be NOT useLayoutEffect
  useEffect(() => {
    const target = getTargetElement() ?? getFrame()?.parentElement
    if (target) {
      target.addEventListener('pointerdown', showRipple)
      target.addEventListener('pointerup', hideRipple)
      target.addEventListener('pointerout', hideRipple) // 'out' is 'leave' + 'cancel'
      return () => {
        target.removeEventListener('pointerdown', showRipple)
        target.removeEventListener('pointerup', hideRipple)
        target.removeEventListener('pointerout', hideRipple)
      }
    }
  }, [getTargetElement(), getFrame(), showRipple, hideRipple])
  
  
  
  return <div
    {...restProps}
    ref={frameRef}
    className={clsx(css.rippleFrame, className, RippleStyle.W.e.frame.e.name)}
  >
    <div
      ref={rippleRef}
      className={clsx(css.rippleView, RippleStyle.W.e.ripple.e.name)}
    />
  </div>
})
export default Ripple
