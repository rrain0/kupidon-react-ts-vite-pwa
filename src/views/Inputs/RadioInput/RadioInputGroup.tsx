/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import {
  RadioInputGroupStyle,
} from 'src/views/Inputs/RadioInput/RadioInputGroupStyle'
import reset = EmotionCommon.reset
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef




export type RadioInputGroupCustomProps = PartialUndef<{
  hasError: boolean
  children: React.ReactNode
}>
export type RadioInputGroupForwardRefProps = JSX.IntrinsicElements['div']
export type RadioInputGroupRefElement = HTMLDivElement
export type RadioInputGroupProps = RadioInputGroupCustomProps & RadioInputGroupForwardRefProps



const RadioInputGroup =
React.memo(
React.forwardRef<RadioInputGroupRefElement, RadioInputGroupProps>(
  (props, forwardedRef)=>{
  const { hasError, children, className, ...restProps } = props
  
  
  const elemRef = useRef<RadioInputGroupRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const radioGroupProps = {
    className: classNames(className, RadioInputGroupStyle.El.radioGroupClassName),
    [RadioInputGroupStyle.Attr.errorName]: trueOrUndef(hasError),
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
    role: 'radiogroup',
    tabIndex: 0,
    ...restProps,
  }
  const borderProps = {
    className: RadioInputGroupStyle.El.borderClassName,
  }
  
  
  return <article /* RadioGroup */ css={radioGroupStyle}
    {...radioGroupProps}
    ref={elemRef}
  >
    
    { children }
    
    <div /* Border */ css={borderStyle}
      {...borderProps}
    />
    
  </article>
}))
export default RadioInputGroup




const radioGroupStyle = css`
  ${reset};
  position: relative;
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`