import styled from '@emotion/styled'
import { ArrayU } from '@utils/base/ArrayU.ts'
import { ObjectU } from '@utils/base/ObjectU.ts'

import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { RippleS6 } from 'src/components/elems/Ripple/RippleS6.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import { getViewProps } from '@utils/view/ViewProps.ts'
import { ViewU } from '@utils/view/ViewU.ts'
import ClassStyle = ReactU.ClassStyle
import WH = ViewU.WH
import XY = ViewU.XY
import RippleMode = RippleS6.RippleMode
import { Pu } from '@utils/base/math/typeUtils.ts'
import FirstCanUndef = ArrayU.FirstCanUndef
import useLog = ReactU.useLog
import ObjectKeys = ObjectU.ObjectKeys




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
  
  const [getFrame, setFrame] = useElemRefGetSet()
  const [getRipple, setRipple] = useElemRefGetSet()
  
  
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
  const [nextStates, setNextStates] = useState<RippleState[]>([])
  
  const showNext = (newNext?: RippleState[]) => {
    setNextStates(curr => {
      // Продолжаем текущую цепочку, если никто не установил новую
      if (curr === nextStates && !newNext) newNext = curr
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
  
  //useLog(action, state)
  
  
  useEffect(() => {
    if (disabled) showNext(['resetted'])
    else if (action === 'reset') showNext(['resetted'])
    else if (action === 'resetAndShow') showNext(['resetted', 'showing', 'shown'])
    else if (action === 'reveal') showNext(['revealing', 'showing', 'shown'])
    else if (action === 'hide') showNext(['hiding', 'hidden'])
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
  const applyStyle = (newStyle: Partial<Style>) => {
    const el = getRipple()
    if (el) {
      const prevS = getStyle()
      const s = {
        ...prevS, ...newStyle,
        transition: { ...prevS.transition, ...newStyle.transition },
      }
      setStyle(s)
      const tProps = ObjectKeys(s.transition).filter(p => s.transition[p])
      
      el.ontransitionend = null
      el.style.transition = tProps.map(p => s.transition[p]).join(', ') || 'none'
      el.style.opacity = `${s.opacity}`
      el.style.scale = `${s.scale}`
    }
  }
  

  useEffect(() => {
    const el = getRipple()
    if (el) {
      let stale = false
      if (state === 'resetted') {
        applyStyle({
          transition: { scale: '', opacity: '' },
          scale: 0, opacity: 0,
        })
        showNext()
      }
      else if (state === 'showing') {
        applyStyle({
          transition: {
            scale: `scale ${rippleProps.rippleDuration}ms ${StyleVals.easeOutCubic}`,
            opacity: '',
          },
          scale: 1, opacity: 1,
        })
        el.ontransitionend = ev => {
          if (ev.target === el && ev.propertyName === 'scale') requestAnimationFrame(() => {
            if (stale) return
            //console.log('ontransitionend', ev)
            showNext()
          })
        }
      }
      else if (state === 'shown') {
        applyStyle({
          transition: { scale: '', opacity: '' },
          scale: 1, opacity: 1,
        })
        showNext()
      }
      else if (state === 'revealing') {
        applyStyle({
          transition: {
            opacity: `opacity ${rippleProps.dissolveDuration}ms ${StyleVals.easeOutExpo}`,
          },
          opacity: 1,
        })
        el.ontransitionend = ev => {
          if (ev.target === el && ev.propertyName === 'opacity') requestAnimationFrame(() => {
            if (stale) return
            //console.log('ontransitionend', ev)
            showNext()
          })
        }
      }
      else if (state === 'hiding') {
        applyStyle({
          transition: {
            opacity: `opacity ${rippleProps.dissolveDuration}ms ${StyleVals.easeInQuart}`,
          },
          opacity: 0,
        })
        el.ontransitionend = ev => {
          if (ev.target === el && ev.propertyName === 'opacity') requestAnimationFrame(() => {
            if (stale) return
            //console.log('ontransitionend', ev)
            showNext()
          })
        }
      }
      else if (state === 'hidden') {
        applyStyle({
          transition: { opacity: '' },
          opacity: 0,
        })
        showNext()
      }
      else {
        showNext()
      }
      return () => { stale = true }
    }
  }, [state])
  
  
  
  return (
    <RippleFrame
      data-display-name='Ripple'
      ref={setFrame}
      className={clsx(RippleS6.W.els.rippleFrame.n, className)}
      {...restProps}
    >
      <RippleElem
        ref={setRipple}
        className={RippleS6.W.els.ripple.n}
        style={rippleProps.dimens}
      />
    </RippleFrame>
  )
})
Ripple.displayName = 'Ripple'
export default Ripple



const RippleFrame = styled.div()
const RippleElem = styled.div({
  transition: 'none',
  scale: 0,
  opacity: 0,
})


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
