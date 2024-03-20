/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import React, {useImperativeHandle, useRef} from "react"
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import RadioActiveIc = SvgIcons.RadioActiveIc
import Ripple, { RippleProps } from 'src/views/Ripple/Ripple'
import RadioInactiveIc = SvgIcons.RadioInactiveIc
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import row = EmotionCommon.row
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef





export type RadioInputCustomProps = PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start'|'end'
  rippleMode: RippleProps['mode']
}>
export type RadioInputForwardRefProps = JSX.IntrinsicElements['input']
export type RadioInputRefElement = HTMLInputElement
export type RadioInputProps = RadioInputCustomProps & RadioInputForwardRefProps



const RadioInput = 
React.memo(
React.forwardRef<RadioInputRefElement, RadioInputProps>
((props, forwardedRef)=> {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    rippleMode,
    className, style,
    ...restProps
  } = props
  childrenPosition ??= 'end'
  rippleMode ??= 'cursor'
  
  
  const elemRef = useRef<RadioInputRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const frameProps = {
    className: classNames(className, RadioInputStyle.El.frameClassName),
    style: style,
  }
  const inputProps = {
    className: RadioInputStyle.El.inputClassName,
    type: 'radio',
    [RadioInputStyle.Attr.errorName]: trueOrUndef(hasError),
    'aria-checked': restProps.checked,
    role: 'radio',
    ...restProps,
  }
  const activeIcWrapProps = {
    className: RadioInputStyle.El.iconWrapClassName
  }
  const inactiveIcWrapProps = {
    className: RadioInputStyle.El.iconWrapClassName
  }
  const borderProps = {
    className: RadioInputStyle.El.borderClassName
  }
  
  
  return <label /* Frame */ css={frameStyle}
    {...frameProps}
  >
    
    <input /* Input */ css={inputStyle}
      {...inputProps}
      ref={elemRef}
    />
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <div /* ActiveIcWrap */ css={activeIcWrapStyle}
      {...activeIcWrapProps}
    >
      <RadioActiveIc/>
    </div>
    <div /* InactiveIcWrap */ css={inactiveIcWrapStyle}
      {...inactiveIcWrapProps}
    >
      <RadioInactiveIc/>
    </div>
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <div /* Border */ css={borderStyle}
      {...borderProps}
    >
      <Ripple
        targetElement={elemRef}
        mode={rippleMode}
      />
    </div>
    
  </label>
}))
export default RadioInput




const frameStyle = css`
  position: relative;
  ${row};
  justify-content: start;
  align-items: center;
  cursor: pointer;
`



const inputStyle = css`
  ${resetInput};
  ${abs};
  opacity: 0;
  cursor: pointer;
`



const activeIcWrapStyle = css`
  display: none;
  input:checked ~ & { display: flex; }
  ${SvgIcStyle.El.el.icon} {
    ${SvgIcStyle.Prop.prop.color}: var(${RadioInputStyle.Prop.activeIconColor})
  }
`


const inactiveIcWrapStyle = css`
  display: flex;
  input:checked ~ & { display: none }
  ${SvgIcStyle.El.el.icon} {
    ${SvgIcStyle.Prop.prop.color}: var(${RadioInputStyle.Prop.inactiveIconColor})
  }
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

