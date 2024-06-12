import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import React, {useImperativeHandle, useRef} from "react"
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import row = EmotionCommon.row
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef



/*

export type InputCustomProps = PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start'|'end'
  frameProps: Omit<React.JSX.IntrinsicElements['label'],'ref'>
}>
export type InputForwardRefProps = React.JSX.IntrinsicElements['input']
export type InputRefElement = HTMLInputElement
export type InputProps = InputCustomProps & InputForwardRefProps

*/


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
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, InputStyle.W.elements.frame.element.name),
    style: style,
    ...fProps,
  }
  const inputProps = {
    className: InputStyle.W.elements.input.element.name,
    [InputStyle.W.states.error.state.name]: trueOrUndef(hasError),
    ...restProps,
  }
  const borderProps = {
    className: InputStyle.W.elements.border.element.name,
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




