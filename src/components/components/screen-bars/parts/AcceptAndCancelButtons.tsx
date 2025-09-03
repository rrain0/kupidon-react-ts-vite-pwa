import { ReactU } from '@utils/react/ReactU.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import React, { useEffect, useState } from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'

import Flex from '@libs/short-propsed/components/Flex.tsx'
import MountController, { MountControllerRenderProps } from 'src/components/components/animations/MountController.tsx'
import AcceptButton from 'src/components/components/screen-bars/parts/AcceptButton.tsx'
import CancelButton from 'src/components/components/screen-bars/parts/CancelButton.tsx'
import { Callback } from '@utils/base/TypeUtils.ts'
import { Pu } from '@utils/base/TypeUtils.ts'
import StyleProp = ReactU.StyleProp





export type AcceptAndCancelButtonsProps = Pu<{
  onAccept: Callback
  onCancel: Callback
}>
const AcceptAndCancelButtons = React.memo((props: AcceptAndCancelButtonsProps) => {
  
  const isOpen = !!(props.onAccept || props.onCancel)
  
  return (
    <MountController isOpen={isOpen}>
      {mountProps => <Content {...props} {...mountProps}/>}
    </MountController>
  )
})
AcceptAndCancelButtons.displayName = 'AcceptAndCancelButtons'
export default AcceptAndCancelButtons




const Content = React.memo(({
  onAccept, onCancel, isOpen, allowUnmount,
}: AcceptAndCancelButtonsProps & MountControllerRenderProps) => {
  
  
  
  const [getEl, setEl] = useElemRefGetSet()
  
  type State = undefined | 'appearing' | 'appeared' | 'disappearing' | 'disappeared'
  const [state, setState] = useState<{ v: State }>({ v: undefined })
  // useEffect сработает уже после монтирования элемента и получения рефа
  useEffect(() => {
    if (isOpen) setState({ v: 'appearing' })
    else setState({ v: 'disappearing' })
  }, [isOpen])
  
  
  const initialStyle: StyleProp = {
    transform: `translateX(-120%)`,
  }
  useEffect(() => {
    const appearTime = 150
    const disappearTime = 150
    
    let stale = false
    const el = getEl()
    if (el) {
      if (state.v === 'appearing') {
        const time = appearTime
        el.style.transition = `transform ${time}ms linear`
        el.style.transform = 'translateX(0)'
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState(curr => curr === state ? { v: 'appeared' } : curr)
        })
      }
      else if (state.v === 'appeared') {
        el.style.transition = 'none'
        el.style.transform = 'translateX(0)'
        el.ontransitionend = null
      }
      else if (state.v === 'disappearing') {
        const time = disappearTime
        el.style.transition = `transform ${time}ms linear`
        el.style.transform = `translateX(-120%)`
        el.ontransitionend = ev => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setState(curr => curr === state ? { v: 'disappeared' } : curr)
        })
      }
      else if (state.v === 'disappeared') {
        el.style.transition = 'none'
        el.style.transform = `translateY(-120%)`
        el.ontransitionend = null
        allowUnmount()
      }
    }
    return () => { stale = true }
  }, [state])
  
  
  
  return (
    <Flex col g={StyleVals.listGPx} noPointer
      style={initialStyle}
      ref={setEl}
      data-display-name='AcceptAndCancelButtons'
    >
      {onAccept && <AcceptButton onClick={onAccept}/>}
      {onCancel && <CancelButton onClick={onCancel}/>}
    </Flex>
  )
})




