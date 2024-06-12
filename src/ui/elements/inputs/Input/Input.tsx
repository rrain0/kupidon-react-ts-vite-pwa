import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef





type InputElement = HTMLInputElement
type InputProps = React.ComponentPropsWithoutRef<'input'> & PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
  frameProps: React.ComponentPropsWithoutRef<'label'>
}>


const Input =
React.memo(
React.forwardRef<InputElement, InputProps>(
(props, forwardedRef) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    className, style,
    frameProps: fProps,
    ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const elemRef = useRef<InputElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, InputStyle.W.e.frame.e.name),
    style: style,
    ...fProps,
  }
  const inputProps = {
    className: InputStyle.W.e.input.e.name,
    [InputStyle.W.states.error.state.name]: trueOrUndef(hasError),
    ...restProps,
  }
  const borderProps = {
    className: InputStyle.W.e.border.e.name,
  }
  
  
  return <label /* Frame */
    {...frameProps}
  >
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <input /* Input */
      {...inputProps}
      ref={elemRef}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <div /* Border */
      {...borderProps}
    />
    
  </label>
}))
export default Input




