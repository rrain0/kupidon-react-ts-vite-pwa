import clsx from 'clsx'
import React, {
  useCallback, useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { getElemProps } from '@util/element/ElemProps.ts'
import css from 'src/ui/elements/Ripple/Ripple.module.scss'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import empty = TypeUtils.empty
import { RippleStyle } from 'src/ui/elements/Ripple/RippleStyle.ts'
import PartialUndef = TypeUtils.PartialUndef




export type RippleCustomProps = PartialUndef<{
  rippleDuration: number // ripple animation duration per 200px
  mode: 'center'|'cursor'
  rippleColor: string
  targetElement: React.RefObject<HTMLElement>
}>
export type RippleForwardRefProps = React.JSX.IntrinsicElements['div']
export type RippleRefElement = HTMLDivElement


export type RippleProps = RippleCustomProps & RippleForwardRefProps
type CursorInfo = {
  clientX: number
  clientY: number
  pointerId?: number|empty
}


const Ripple =
React.memo(
React.forwardRef<RippleRefElement, RippleProps>(
(props, forwardedRef) => {
  
  let {
    rippleDuration,
    mode,
    rippleColor,
    targetElement,
    className,
    ...restProps
  } = props
  
  const rippleFrameRef = useRef<RippleRefElement>(null)
  const rippleViewRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(forwardedRef, ()=>rippleFrameRef.current!,[])
  
  
  const getTargetElement = () => props.targetElement?.current
  const getRippleFrame = () => rippleFrameRef.current
  const getRippleView = () => rippleViewRef.current
  
  
  const showRipple = useCallback(
    (ev?: CursorInfo) => {
      const rippleFrame = getRippleFrame()
      const rippleView = getRippleView()
      if (rippleFrame && rippleView){
        rippleView.classList.remove(css.rippleHide, css.rippleShow)
        
        const mode = function(){
          const modes = ['center','cursor']
          let mode: any = getElemProps(rippleFrame)
            .cssPropValue(RippleStyle.Prop.mode)
          if (!modes.includes(mode)) mode = props.mode
          if (!ev) mode = 'center'
          if (!modes.includes(mode)) mode = 'center'
          return mode as 'center'|'cursor'
        }()
        
        const dimens = getElemProps(rippleFrame)
        const el = {
          clientX: dimens.clientXFloat,
          clientY: dimens.clientYFloat,
          w: dimens.width,
          h: dimens.height,
        }
        const d = function(){
          switch (mode){
            case 'cursor': return {
              toTop: ev!.clientY-el.clientY,
              toRight: el.w-(ev!.clientX-el.clientX),
              toBottom: el.h-(ev!.clientY-el.clientY),
              toLeft: ev!.clientX-el.clientX
            }
            case 'center': default: return {
              toTop: el.h/2,
              toRight: el.w/2,
              toBottom: el.h/2,
              toLeft: el.w/2,
            }
          }
        }()
        const dxd = {
          toTop: d.toTop*d.toTop,
          toRight: d.toRight*d.toRight,
          toBottom: d.toBottom*d.toBottom,
          toLeft: d.toLeft*d.toLeft,
        }
        const ripple = function(){
          const radius = Math.max(
            Math.sqrt(dxd.toTop+dxd.toLeft), // расстояние от точки касания до левого верхнего угла
            Math.sqrt(dxd.toTop+dxd.toRight), // расстояние от точки касания до правого верхнего угла
            Math.sqrt(dxd.toBottom+dxd.toRight), // расстояние от точки касания до правого нижнего угла
            Math.sqrt(dxd.toBottom+dxd.toLeft), // расстояние от точки касания до левого нижнего угла
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
        // console.log('ripple',ripple)
        
        const dur = props.rippleDuration ?? 500
        
        const style = rippleFrame.style
        props.rippleColor && style.setProperty(RippleStyle.Prop.color, props.rippleColor)
        style.setProperty(
          '--ripple-animation-duration',
          Math.max(400, dur * ripple.radius/200) + 'ms'
        )
        style.setProperty(
          '--dissolve-animation-duration',
          Math.max(500, (dur+100) * ripple.radius/200) + 'ms'
        )
        style.setProperty('--ripple-top', ripple.top+'px')
        style.setProperty('--ripple-left', ripple.left+'px')
        style.setProperty('--ripple-w', ripple.radius*2+'px')
        style.setProperty('--ripple-h', ripple.radius*2+'px')
        
        rippleView.classList.add(css.rippleShow)
      }
      
    },
    [props.mode, props.rippleColor, props.rippleDuration]
  )
  
  const hideRipple = useCallback(
    ()=>{
      const rippleView = rippleViewRef.current
      if (rippleView){
        rippleView.classList.remove(css.rippleHide)
        rippleView.classList.add(css.rippleHide)
      }
    },
    []
  )
  
  
  // must be NOT useLayoutEffect
  useEffect(()=>{
    const target = props.targetElement?.current
      ?? rippleFrameRef.current?.parentElement
    if (target){
      target.addEventListener('pointerdown', showRipple)
      target.addEventListener('pointerup', hideRipple)
      target.addEventListener('pointerout', hideRipple) // 'out' is 'leave' + 'cancel'
      return ()=>{
        target.removeEventListener('pointerdown', showRipple)
        target.removeEventListener('pointerup', hideRipple)
        target.removeEventListener('pointerout', hideRipple)
      }
    }
  }, [getTargetElement(), getRippleFrame(), showRipple, hideRipple])
  
  
  
  return <div
    {...restProps}
    ref={rippleFrameRef}
    className={clsx(css.rippleFrame, className, RippleStyle.El.frameClassName)}
  >
    <div
      ref={rippleViewRef}
      className={clsx(css.rippleView, RippleStyle.El.viewClassName)}
    />
  </div>
}))
export default Ripple