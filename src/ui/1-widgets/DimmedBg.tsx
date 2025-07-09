import styled from '@emotion/styled'
import { ReactU } from '@util/react/ReactU.ts'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { MountControllerRenderProps } from 'src/ui/components/MountController.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import React, { useEffect, useState } from 'react'
import Callback = TypeU.Callback
import StyleProp = ReactU.StyleProp
import ClassStyle = ReactU.ClassStyle
import Children = ReactU.Children





export type DimmedBgProps = MountControllerRenderProps & ClassStyle & Children

const DimmedBg = React.memo((props: DimmedBgProps) => {
  const {
    isOpen, allowUnmount,
    className, style, children,
  } = props
  
  const { initialStyle, setEl } = useEnterExitAnimation(isOpen, allowUnmount)
  
  return (
    <DimmedBgView
      style={{ ...style, ...initialStyle }}
      className={className}
      ref={setEl}
      data-display-name='DimmedBg'
    >
      {children}
    </DimmedBgView>
  )
})
DimmedBg.displayName = 'DimmedBg'
export default DimmedBg



const DimmedBgView = styled.div(flexStyle({
  full: true,
}))




const useEnterExitAnimation = (isOpen: boolean, allowUnmount: Callback) => {
  const [getEl, setEl] = useElemRefGetSet()
  
  type State = undefined | 'appearing' | 'appeared' | 'disappearing' | 'disappeared'
  const [state, setState] = useState<{ v: State }>({ v: undefined })
  
  // useEffect сработает уже после монтирования элемента и получения рефа
  useEffect(() => {
    if (isOpen) setState({ v: 'appearing' })
    else setState({ v: 'disappearing' })
  }, [isOpen])
  
  
  const appearTime = StyleVals.fadeInTime
  const disappearTime = StyleVals.fadeOutTime
  
  const initialStyle: StyleProp = {
    backgroundColor: `transparent`,
  }
  useEffect(() => {
    let stale = false
    const el = getEl()
    if (el) {
      if (state.v === 'appearing') {
        const time = appearTime
        el.style.transition = `background-color ${time}ms linear`
        // TODO Theme
        el.style.backgroundColor = '#0000009a'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState(curr => curr === state ? { v: 'appeared' } : curr)
        })
      }
      else if (state.v === 'appeared') {
        el.style.transition = 'none'
        // TODO Theme
        el.style.backgroundColor = '#0000009a'
        el.ontransitionend = null
      }
      else if (state.v === 'disappearing') {
        const time = disappearTime
        el.style.transition = `background-color ${time}ms linear`
        el.style.backgroundColor = `transparent`
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState(curr => curr === state ? { v: 'disappeared' } : curr)
        })
      }
      else if (state.v === 'disappeared') {
        el.style.transition = 'none'
        el.style.backgroundColor = `transparent`
        el.ontransitionend = null
        allowUnmount()
      }
    }
    return () => { stale = true }
  }, [state])
  
  return { initialStyle, setEl }
}

