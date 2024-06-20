import Input from 'src/ui/elements/inputs/Input/Input.tsx'
import Ripple from 'src/ui/elements/Ripple/Ripple.tsx'
import { CheckboxInputStyle } from './CheckboxInputStyle.ts'
import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import trueOrUndef = TypeUtils.trueOrUndef
import Checkmark2Ic = SvgIcons.Checkmark2Ic
import Puro = TypeUtils.Puro





type CheckboxProps = React.ComponentPropsWithoutRef<typeof Input> & Puro<{
  hasError: boolean
  checkedComponent: React.ReactNode
  uncheckedComponent: React.ReactNode
}>


const CheckboxInput =
React.memo(
React.forwardRef<HTMLInputElement, CheckboxProps>(
(props, forwardedRef) => {
  const {
    className, style,
    hasError,
    ...restProps
  } = props
  
  
  
  
  const elemRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, CheckboxInputStyle.W.e.frame.e.name),
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
    
    {/* <div css={css`width: 100%;
      height: 100%`}/> */}
    
    <input // Input
      {...inputProps}
      ref={elemRef}
    />
    
    <div // IconBox
      {...iconBoxProps}
    />
    
    <div // IconBoxChecked
      {...iconBoxCheckedProps}
    >
      <Checkmark2Ic />
    </div>
    
    <Ripple // Ripple
      mode='center'
    />
  
  </label>
}))
export default CheckboxInput


