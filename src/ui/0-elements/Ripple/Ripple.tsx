import { animated, useSpring, config, easings } from '@react-spring/web'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { WidgetElem } from 'src/mini-libs/widget-style-6/transform/WidgetStyleTransform1.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import { ReactU } from 'src/util/react/ReactU'
import { getViewProps } from 'src/util/view/ViewProps'
import { ViewU } from 'src/util/view/ViewU'
import { useElemRef } from 'src/util/react-state/useElemRef'
import ClassStyleProps = ReactU.ClassStyle
import WH = ViewU.WH
import XY = ViewU.XY
import RippleMode = RippleS6.RippleMode



/*
  // SPRING EXAMPLE
  const [hovered, setHover] = useState(false)
  // if passing an object, it updates on every rerender
  const { progress } = useSpring({
  progress: hovered ? 1 : 0,
  
  // config types:
  
  // Predefined Spring Config
  //import { config } from '@react-spring/web'
  config: config.default,
  
  // Predefined Spring Easing Config
  //import { easings } from '@react-spring/web'
  config: {
  duration: 4000,
  easing: easings.easeOutCubic,
  },
  
  // Custom Easing Config via 'bezier-easing' package
  // css 'cubic-bezier(0.17, 0.84, 0.44, 1)'
  //import BezierEasing from 'bezier-easing'
  //const animationEasing = BezierEasing(0.17, 0.84, 0.44, 1)
  config: {
  duration: 4000,
  easing: animationEasing,
  },
  })
*/




export type RippleProps = ClassStyleProps & {
  isShow: boolean
  cancel?: boolean | undefined
  clientXY: { x: number, y: number }
}


const Ripple = React.memo(
  (props: RippleProps) => {
    
    const { isShow, cancel, clientXY, className, ...restProps } = props
    
    const [frameRef, getFrame] = useElemRef()
    const [rippleRef, getRipple] = useElemRef()
    
    const rippleProps = useMemo(() => {
      const frame = getFrame()
      const ripple = getRipple()
      if (frame && ripple) {
        const fProps = getViewProps(frame)
        const rProps = getViewProps(ripple)
        return getRippleProps(
          fProps.xy,
          fProps.wh,
          clientXY,
          // TODO Style - RippleMode type
          rProps.getCssPropValue(RippleS6.W.es.ripple.ps!.mode.n) as RippleMode,
          500
        )
      }
      return {
        dimens: { left: 0, top: 0, width: 0, height: 0 },
        rippleDuration: 0,
        dissolveDuration: 0,
      }
    }, [isShow])
    
    
    
    
    const [{ opacity }] = useSpring(() => {
      if (cancel) return {
        to: { opacity: 0 },
        reset: true,
        immediate: true,
      }
      if (isShow) return {
        from: { opacity: 0.1 },
        to: { opacity: 1 },
        reset: true,
        config: {
          duration: rippleProps.rippleDuration,
          easing: easings.easeOutCubic,
        },
      }
      if (!isShow) return {
        to: { opacity: 0 },
        config: {
          duration: rippleProps.dissolveDuration,
          easing: easings.linear,
        },
      }
    }, [isShow, cancel])
    
    const [{ scale }] = useSpring(() => {
      if (isShow) return {
        from: { scale: 0 },
        to: { scale: 1 },
        config: {
          duration: rippleProps.rippleDuration,
          easing: easings.easeOutCubic,
        },
        reset: true,
      }
    }, [isShow])
    
    
    
    return (
      <div
        //displayName={'RippleFrame'}
        ref={frameRef}
        className={clsx(RippleS6.W.es.frame.n, className)}
        {...restProps}
      >
        <animated.div
          //displayName={'RippleRipple'}
          ref={rippleRef}
          // TODO Style
          className={RippleS6.W.es.ripple.n}
          style={{
            ...rippleProps.dimens,
            // @ts-expect-error
            opacity,
            scale,
          }}
        />
      </div>
    )
  }
)
export default Ripple




function getRippleProps(
  frameXY: XY,
  frameWH: WH,
  clientXY: XY,
  // TODO Style
  mode: RippleMode,
  duration: number,
) {
  
  // console.log('frameXY', frameXY)
  // console.log('frameWH', frameWH)
  // console.log('clientXY', clientXY)
  // console.log('mode', mode)
  // console.log('duration', duration)
  
  const d = (() => {
    if (mode === 'pointer') return {
      toTop: clientXY.y - frameXY.y,
      toLeft: clientXY.x - frameXY.x,
      toBottom: frameWH.h - (clientXY.y - frameXY.y),
      toRight: frameWH.w - (clientXY.x - frameXY.x),
    }
    if (mode === 'center' || true) return {
      toTop: frameWH.h / 2,
      toLeft: frameWH.w / 2,
      toBottom: frameWH.h / 2,
      toRight: frameWH.w / 2,
    }
  })()
  const dxd = {
    toTop: d.toTop * d.toTop,
    toLeft: d.toLeft * d.toLeft,
    toBottom: d.toBottom * d.toBottom,
    toRight: d.toRight * d.toRight,
  }
  const radius = Math.max(
    Math.sqrt(dxd.toTop + dxd.toLeft), // расстояние от точки касания до левого верхнего угла
    Math.sqrt(dxd.toTop + dxd.toRight), // расстояние от точки касания до правого верхнего угла
    Math.sqrt(dxd.toBottom + dxd.toRight), // расстояние от точки касания до правого нижнего угла
    Math.sqrt(dxd.toBottom + dxd.toLeft), // расстояние от точки касания до левого нижнего угла
  )
  
  // console.log('el',el)
  // console.log('d',d)
  // console.log('dxd',dxd)
  // console.log('radius',radius)
  
  const dur = duration ?? 500
  
  return {
    dimens: {
      top: d.toTop,
      left: d.toLeft,
      width: radius * 2,
      height: radius * 2,
    },
    rippleDuration: Math.max(400, dur * radius / 200),
    //dissolveDuration: Math.max(500, (dur + 100) * radius / 200),
    dissolveDuration: 500,
  }
}
