/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import React, {useImperativeHandle, useRef} from "react"
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import row = EmotionCommon.row
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef




export type InputCustomProps = PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start'|'end'
  frameProps: Omit<JSX.IntrinsicElements['label'],'ref'>
}>
export type InputForwardRefProps = JSX.IntrinsicElements['input']
export type InputRefElement = HTMLInputElement
export type InputProps = InputCustomProps & InputForwardRefProps



const Input =
React.memo(
React.forwardRef<InputRefElement, InputProps>(
(props, forwardedRef) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    className, style,
    frameProps: fProps,
    ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const elemRef = useRef<InputRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const frameProps = {
    className: classNames(className, InputStyle.El.frameClassName),
    style: style,
    ...fProps,
  }
  const inputProps = {
    className: InputStyle.El.inputClassName,
    [InputStyle.Attr.errorName]: trueOrUndef(hasError),
    ...restProps,
  }
  const borderProps = {
    className: InputStyle.El.borderClassName,
  }
  
  
  return <label /* Frame */ css={frameStyle}
    {...frameProps}
  >
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <input /* Input */ css={inputStyle}
      {...inputProps}
      ref={elemRef}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <div /* Border */ css={borderStyle}
      {...borderProps}
    />
    
  </label>
}))
export default Input




const frameStyle = css`
  container: input / size;
  ${row};
  align-items: center;
  width: 100%;
  // min-height not works for stretch children while display: flex
  height: 50px;
  position: relative;
`



const inputStyle = css`
  ${resetInput};
  flex: 1;
  align-self: stretch;
  border-radius: inherit;
`




const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

