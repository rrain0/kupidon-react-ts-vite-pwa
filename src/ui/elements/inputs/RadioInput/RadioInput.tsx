import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import React, {useImperativeHandle, useRef} from "react"
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import RadioActiveIc = SvgIcons.RadioActiveIc
import Ripple, { RippleProps } from 'src/ui/elements/Ripple/Ripple.tsx'
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
  childrenPosition: 'start' | 'end'
  rippleMode: RippleProps['mode']
}>
export type RadioInputForwardRefProps = React.JSX.IntrinsicElements['input']
export type RadioInputRefElement = HTMLInputElement
export type RadioInputProps = RadioInputCustomProps & RadioInputForwardRefProps



const RadioInput = 
React.memo(
React.forwardRef<RadioInputRefElement, RadioInputProps>
((props, forwardedRef)=> {
  const {
    hasError,
    startViews, endViews,
    children, childrenPosition = 'end',
    rippleMode = 'cursor',
    className, style,
    ...restProps
  } = props
  
  
  const elemRef = useRef<RadioInputRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, RadioInputStyle.El.frameClassName),
    style: style,
  }
  const inputProps = {
    className: RadioInputStyle.El.inputClassName,
    type: 'radio',
    [RadioInputStyle.Attr.errorName]: trueOrUndef(hasError),
    ...restProps,
  }
  const activeWrapProps = {
    className: RadioInputStyle.El.iconWrapClassName
  }
  const inactiveWrapProps = {
    className: RadioInputStyle.El.iconWrapClassName
  }
  const borderProps = {
    className: RadioInputStyle.El.borderClassName
  }
  
  
  return <label /* Frame */
    css={frameStyle}
    {...frameProps}
  >
    
    <input /* Input */
      css={inputStyle}
      {...inputProps}
      ref={elemRef}
    />
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <div /* ActiveWrap */
      css={activeIcWrapStyle}
      {...activeWrapProps}
    >
      <RadioActiveIc/>
    </div>
    <div /* InactiveWrap */
      css={inactiveWrapStyle}
      {...inactiveWrapProps}
    >
      <RadioInactiveIc/>
    </div>
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <div /* Border */
      css={borderStyle}
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
  ${SvgIconsStyle.El.icon.sel()} {
    ${SvgIconsStyle.El.icon.props.color.name}: var(${RadioInputStyle.Prop.activeIconColor})
  }
`


const inactiveWrapStyle = css`
  display: flex;
  input:checked ~ & { display: none }
  ${SvgIconsStyle.El.icon.sel()} {
    ${SvgIconsStyle.El.icon.props.color.name}: var(${RadioInputStyle.Prop.inactiveIconColor})
  }
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

