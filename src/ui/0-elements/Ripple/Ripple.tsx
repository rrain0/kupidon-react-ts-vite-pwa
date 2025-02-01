import { TypeU } from '@util/common/TypeU.ts'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { RippleS6 } from './RippleS6.ts'
import { ReactU } from 'src/util/react/ReactU'
import { getViewProps } from 'src/util/view/ViewProps'
import { ViewU } from 'src/util/view/ViewU'
import { useElemRef } from 'src/util/react-state/useElemRef'
import ClassStyleProps = ReactU.ClassStyle
import WH = ViewU.WH
import XY = ViewU.XY
import RippleMode = RippleS6.RippleMode
import Puro = TypeU.Puro




export type RippleState = 'show' | 'hide' | 'resume' | 'end' | 'stop'
export type RippleStateInternal = 'reset' | 'show' | 'hide' | 'resume' | 'end' | 'stop'

export type RippleProps = ClassStyleProps & Puro<{
  state: RippleState
  disabled: boolean
  clientXY: { x: number, y: number }
}>


const Ripple = React.memo((props: RippleProps) => {
  const {
    state: outState = 'stop', 
    disabled,
    clientXY, 
    className, 
    ...restProps 
  } = props
  
  const [frameRef, getFrame] = useElemRef()
  const [rippleRef, getRipple] = useElemRef()
  
  
  const rippleProps = (() => {
    const frame = getFrame()
    const ripple = getRipple()
    if (frame && ripple) {
      const fProps = getViewProps(frame)
      const rProps = getViewProps(ripple)
      return calculateRippleProps(
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
  })()
  
  
  const [state, setState] = useState('stop' as RippleStateInternal)
  useEffect(() => {
    if (disabled) {
      setState('stop')
    }
    else if (outState === 'stop') {
      setState('stop')
    }
    else if (outState === 'show') {
      setState('reset')
    }
    else if (outState === 'hide' && (state === 'show' || state === 'resume')) {
      setState('hide')
    }
    else if (outState === 'end' && (state === 'show' || state === 'resume' || state === 'hide')) {
      setState('end')
    }
    else if (outState === 'resume' && state === 'hide') {
      setState('resume')
    }
  }, [outState, disabled])
  useEffect(() => {
    //console.log('state', state)
    // In case if 'hide' is set when there was 'reset' that become 'show'
    if (outState === 'hide' && state === 'show') setState('hide')
  }, [state])

  useEffect(() => {
    const r = rippleRef.current
    if (r) {
      // 'stop' немедленно безвозвратно завершает текущий риппл
      if (state === 'stop') {
        r.style.transition = 'none'
        r.style.opacity = '0'
        r.style.scale = '0'
      }
      // 'reset' сбрпсывает риппл
      else if (state === 'reset') {
        r.style.transition = 'none'
        r.style.opacity = '0.5'
        r.style.scale = '0'
        // ensure that style changes were applied
        requestAnimationFrame(() => setState(prev => prev === 'reset' ? 'show' : prev))
      }
      // 'show' начинает показывать риппл или означает, что он сейчас показывается
      else if (state === 'show') {
        r.style.transition =
          `opacity ${rippleProps.rippleDuration}ms ${StyleVals.easeOutCubic}` +
          `,scale ${rippleProps.rippleDuration}ms ${StyleVals.easeOutCubic}`
        r.style.opacity = '1'
        r.style.scale = '1'
      }
      // 'hide' прячет текущий риппл, делая прозрачным, показ можно возобновить по 'resume'
      else if (state === 'hide' || state === 'end') {
        r.style.transition =
          `opacity ${rippleProps.dissolveDuration}ms linear` +
          `,scale ${rippleProps.dissolveDuration}ms linear`
        r.style.opacity = '0'
      }
      // 'resume' возобновляет показ риппл или означает, что он сейчас показывается
      else if (state === 'resume') {
        r.style.transition =
          `opacity ${rippleProps.dissolveDuration}ms linear` +
          `,scale ${rippleProps.dissolveDuration}ms linear`
        r.style.opacity = '1'
      }
    }
  }, [state])
  
  
  
  return (
    <div
      data-display-name="Ripple"
      //displayName={'RippleFrame'}
      ref={frameRef}
      className={clsx(RippleS6.W.els.frame.n, className)}
      {...restProps}
    >
      <div
        ref={rippleRef}
        className={RippleS6.W.els.ripple.n}
        style={rippleProps.dimens}
      />
    </div>
  )
})
Ripple.displayName = 'Ripple'
export default Ripple




function calculateRippleProps(
  frameXY: XY,
  frameWH: WH,
  clientXY: XY | undefined,
  mode: RippleMode,
  duration: number,
) {
  
  // console.log('frameXY', frameXY)
  // console.log('frameWH', frameWH)
  // console.log('clientXY', clientXY)
  // console.log('mode', mode)
  // console.log('duration', duration)
  
  const d = (() => {
    if (mode === 'pointer' && clientXY) return {
      toTop: clientXY.y - frameXY.y,
      toLeft: clientXY.x - frameXY.x,
      toBottom: frameWH.h - (clientXY.y - frameXY.y),
      toRight: frameWH.w - (clientXY.x - frameXY.x),
    }
    if (mode === 'center' || !clientXY) return {
      toTop: frameWH.h / 2,
      toLeft: frameWH.w / 2,
      toBottom: frameWH.h / 2,
      toRight: frameWH.w / 2,
    }
    throw new Error(`Unknown ripple mode: ${mode}. Or wrong mode conditions`)
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
