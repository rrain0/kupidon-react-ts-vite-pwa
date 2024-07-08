import Input from 'src/ui/elements/inputs/Input/Input.tsx'
import Ripple from 'src/ui/elements/Ripple/Ripple.tsx'
import { CheckboxInputStyle } from './CheckboxInputStyle.ts'
import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import trueOrUndef = TypeU.trueOrUndef
import Checkmark2Ic = SvgIcons.Checkmark2Ic
import Puro = TypeU.Puro





type CheckboxInputProps = React.ComponentPropsWithoutRef<typeof Input> & Puro<{
  hasError: boolean
  
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
}>


const CheckboxInput =
React.memo(
React.forwardRef<HTMLInputElement, CheckboxInputProps>(
(props, forwardedRef) => {
  const {
    className, style,
    hasError,
    startViews, endViews,
    children, childrenPosition = 'start',
    ...restProps
  } = props
  
  
  
  
  const elemRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, CheckboxInputStyle.W.e.frame.e.name),
    tabIndex: 0,
    style: style,
  }
  const inputProps = {
    className: CheckboxInputStyle.W.e.input.e.name,
    type: 'checkbox',
    [CheckboxInputStyle.W.s.error.s.name]: trueOrUndef(hasError),
    ...restProps,
  }
  const iconBoxProps = {
    className: CheckboxInputStyle.W.e.iconBox.e.name
  }
  const iconBoxCheckedProps = {
    className: CheckboxInputStyle.W.e.iconBoxChecked.e.name
  }
  
  
  return <label // Frame
    {...frameProps}
  >
    
    <input // Input
      {...inputProps}
      ref={elemRef}
    />
    
    { startViews }
    { childrenPosition === 'start' && children }
    
    <div // IconBox
      {...iconBoxProps}
    />
    
    <div // IconBoxChecked
      {...iconBoxCheckedProps}
    >
      <Checkmark2Ic />
    </div>
    
    { childrenPosition === 'end' && children }
    { endViews }
    
    <Ripple />
  
  </label>
}))
export default CheckboxInput


