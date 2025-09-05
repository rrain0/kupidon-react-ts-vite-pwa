import { InputStyle } from 'src/components/elems/inputs/Input/InputStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'

import { Pu } from '@utils/base/typeUtils.ts'
import { toEmptyAttr } from '@utils/base/typeUtils.ts'





type InputProps = React.ComponentProps<'input'> & Pu<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
  frameProps: React.ComponentProps<'label'>
}>


const Input = React.memo((props: InputProps) => {
  let {
    ref, className, style,
    hasError,
    startViews, endViews, children, childrenPosition,
    frameProps: fProps,
    ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const elemRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const frameProps = {
    className: clsx(className, InputStyle.W.e.frame.e.name),
    style: style,
    ...fProps,
  }
  const inputProps = {
    className: InputStyle.W.e.input.e.name,
    [InputStyle.W.states.error.state.name]: toEmptyAttr(hasError),
    ...restProps,
  }
  const borderProps = {
    className: InputStyle.W.e.border.e.name,
  }
  
  
  return (
    <label /* Frame */
      {...frameProps}
    >
      
      { startViews }
      { childrenPosition === 'start' && children }
      
      <input /* Input */
        {...inputProps}
        ref={elemRef}
      />
      
      { childrenPosition === 'end' && children }
      { endViews }
      
      <div /* Border */
        {...borderProps}
      />
    
    </label>
  )
})
export default Input




