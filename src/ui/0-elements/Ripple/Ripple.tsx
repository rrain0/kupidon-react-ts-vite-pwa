import { ArrayU } from '@util/common/ArrayU.ts'
import { ObjectU } from '@util/common/ObjectU.ts'
import { StringU } from '@util/common/StringU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { ViewU } from '@util/view/ViewU.ts'
import ClassStyle = ReactU.ClassStyle
import WH = ViewU.WH
import XY = ViewU.XY
import RippleMode = RippleS6.RippleMode
import Pu = TypeU.Pu
import FirstCanUndef = ArrayU.FirstCanUndef
import useLog = ReactU.useLog
import ObjectKeys = ObjectU.ObjectKeys
import kebabCaseToCamelCase = StringU.kebabCaseToCamelCase




export type RippleAction = 'reset' | 'resetAndShow' | 'reveal' | 'hide'

export type RippleState =
  | 'resetted'
  | 'showing' | 'shown'
  | 'revealing'
  | 'hiding' | 'hidden'




export type RippleProps = Pu<{
  action: RippleAction
  disabled: boolean
  clientXY: XY
}> & ClassStyle


const Ripple = React.memo((props: RippleProps) => {
  const {
    action,
    disabled,
    clientXY, 
    className, 
    ...restProps 
  } = props
  
  const [getFrame, , frameRef] = useElemRefGetSet()
  const [getRipple, , rippleRef] = useElemRefGetSet()
  
  
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
  
  
  const [state, setState] = useState<RippleState>('resetted')
  const [next, setNext] = useState<RippleState[]>([])
  
  const toNext = (newNext?: RippleState[]) => {
    setNext(curr => {
      // Если кто-то не установил новую цепочку действий, тогда продолжаем
      if (!newNext && curr === next) newNext = curr
      if (newNext) {
        let newStateI = newNext.findIndex(it => it !== state)
        if (newStateI === -1) newStateI = newNext.length
        const [newState, ...restNext] = newNext.slice(newStateI) as FirstCanUndef<typeof newNext>
        if (newState) setState(newState)
        return restNext
      }
      return curr
    })
  }
  
  useLog(action, state)
  
  
  useEffect(() => {
    if (disabled) toNext(['resetted'])
    else if (action === 'reset') toNext(['resetted'])
    else if (action === 'resetAndShow') toNext(['resetted', 'showing', 'shown'])
    else if (action === 'reveal') toNext(['revealing', 'shown'])
    else if (action === 'hide') toNext(['hiding', 'hidden'])
  }, [action, disabled])
  
  
  type Style = {
    transition: {
      scale?: string
      opacity?: string
    }
    scale: string | number
    opacity: string | number
  }
  const [getStyle, setStyle] = useRefGetSet<Style>({
    transition: { },
    scale: 0,
    opacity: 0,
  })
  const applyStyle = async (newStyle: Partial<Style>) => {
    const r = rippleRef.current
    if (r) {
      const oldS = getStyle()
      const s = { ...oldS, ...newStyle, transition: { ...oldS.transition, ...newStyle.transition } }
      setStyle(s)
      const tProps = ObjectKeys(s.transition).filter(p => s.transition[p])
      const newTProps = ObjectKeys(newStyle.transition).filter(p => newStyle.transition?.[p])
      let newTCnt = newTProps.length
      
      r.ontransitionend = null
      r.style.transition = tProps.map(p => s.transition[p]).join(', ') || 'none'
      r.style.opacity = `${s.opacity}`
      r.style.scale = `${s.scale}`
      
      if (newTCnt) return new Promise<void>(resolve => {
        r.ontransitionend = ev => {
          if (newTProps.includes(kebabCaseToCamelCase(ev.propertyName) as any)) newTCnt--
          if (!newTCnt) resolve()
        }
      })
    }
  }
  

  useEffect(() => {
    (async () => {
      const s = state
      if (s === 'resetted') {
        await applyStyle({
          transition: { scale: '', opacity: '' },
          scale: 0, opacity: 0,
        })
      }
      else if (s === 'showing') {
        await applyStyle({
          transition: {
            scale: `scale ${rippleProps.rippleDuration}ms ${StyleVals.easeOutCubic}`,
            opacity: '',
          },
          scale: 1, opacity: 1,
        })
      }
      else if (s === 'shown') {
        await applyStyle({
          transition: { scale: '', opacity: '' },
          scale: 1, opacity: 1,
        })
      }
      else if (s === 'revealing') {
        await applyStyle({
          transition: {
            opacity: `opacity ${rippleProps.dissolveDuration}ms ${StyleVals.easeOutExpo}`,
          },
          opacity: 1,
        })
      }
      else if (s === 'hiding') {
        await applyStyle({
          transition: {
            opacity: `opacity ${rippleProps.dissolveDuration}ms ${StyleVals.easeInQuart}`,
          },
          opacity: 0,
        })
      }
      else if (s === 'hidden') {
        await applyStyle({
          transition: { opacity: '' },
          opacity: 0,
        })
      }
      toNext()
    })()
  }, [state])
  
  
  
  return (
    <div // RippleFrame
      data-display-name='Ripple'
      ref={frameRef}
      className={clsx(RippleS6.W.els.rippleFrame.n, className)}
      {...restProps}
    >
      <div // Ripple
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
    return {
      toTop: 0,
      toLeft: 0,
      toBottom: 0,
      toRight: 0,
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
    dissolveDuration: 800,
  }
}
