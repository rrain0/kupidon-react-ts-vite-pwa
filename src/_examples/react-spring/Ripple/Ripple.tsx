import { animated, useSpring, config, easings } from '@react-spring/web'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import clsx from 'clsx'
import React, { useEffect, useMemo } from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { RippleS6 } from './RippleS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { ViewU } from '@util/view/ViewU.ts'
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
    
    const [getFrame, , frameRef] = useElemRefGetSet()
    const [getRipple, , rippleRef] = useElemRefGetSet()
    
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
          rProps.getCssPropValue(RippleS6.W.els.ripple.ps!.mode.n) as RippleMode,
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
        from: { opacity: 0.3 },
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
    
    
    
    useEffect(() => {
      const r = rippleRef.current
      if (r) {
        if (cancel) {
          r.style.transition = 'none'
          r.style.opacity = '0'
          r.style.scale = '0'
        }
        else if (isShow) {
          r.style.transition = 'none'
          r.style.opacity = '0.3'
          r.style.scale = '0'
          setTimeout(() => {
            r.style.transition =
              `opacity ${rippleProps.rippleDuration}ms ${StyleVals.easeOutCubic}` +
              `,scale ${rippleProps.rippleDuration}ms ${StyleVals.easeOutCubic}`
            r.style.opacity = '1'
            r.style.scale = '1'
          })
        }
        else if (!isShow) {
          r.style.transition =
            `opacity ${rippleProps.dissolveDuration}ms linear` +
            `,scale ${rippleProps.dissolveDuration}ms linear`
          r.style.opacity = '0'
        }
      }
    }, [isShow, cancel])
    
    
    
    return (
      <div
        //displayName={'RippleFrame'}
        ref={frameRef}
        className={clsx(RippleS6.W.els.frame.n, className)}
        {...restProps}
      >
        <animated.div
          //displayName={'RippleRipple'}
          ref={rippleRef}
          className={RippleS6.W.els.ripple.n}
          style={{
            ...rippleProps.dimens,
            // @ts-expect-error
            opacity,
            scale,
          }}
        />
        {/*
        <div
          //displayName={'RippleRipple'}
          ref={rippleRef}
          className={RippleS6.W.els.ripple.n}
          style={rippleProps.dimens}
        />
         */}
      </div>
    )
  }
)
export default Ripple




function getRippleProps(
  frameXY: XY,
  frameWH: WH,
  clientXY: XY,
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
