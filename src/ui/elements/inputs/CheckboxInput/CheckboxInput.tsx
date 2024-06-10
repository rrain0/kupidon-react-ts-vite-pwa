import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { CheckboxInputStyle } from 'src/ui/elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
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
import center = EmotionCommon.center
import CheckmarkIc = SvgIcons.CheckmarkIc





export type CheckboxInputCustomProps = PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
  rippleMode: RippleProps['mode']
}>
export type CheckboxInputForwardRefProps = React.JSX.IntrinsicElements['input']
export type CheckboxInputRefElement = HTMLInputElement
export type CheckboxInputProps = CheckboxInputCustomProps & CheckboxInputForwardRefProps



const CheckboxInput =
React.memo(
React.forwardRef<CheckboxInputRefElement, CheckboxInputProps>
((props, forwardedRef)=> {
  const {
    hasError,
    startViews, endViews,
    children, childrenPosition = 'end',
    rippleMode = 'cursor',
    className, style,
    ...restProps
  } = props
  
  
  const elemRef = useRef<CheckboxInputRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, CheckboxInputStyle.El.frameClassName),
    style: style,
  }
  const inputProps = {
    className: CheckboxInputStyle.El.inputClassName,
    type: 'checkbox',
    [CheckboxInputStyle.Attr.errorName]: trueOrUndef(hasError),
    ...restProps,
  }
  const checkedWrapProps = {
    className: CheckboxInputStyle.El.iconWrapClassName
  }
  const uncheckedWrapProps = {
    className: CheckboxInputStyle.El.iconWrapClassName
  }
  const borderProps = {
    className: CheckboxInputStyle.El.borderClassName
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
    
    <div /* CheckedWrap */
      css={activeIcWrapStyle}
      {...checkedWrapProps}
    >
      <CheckmarkBox data-error={hasError}>
        <CheckmarkIc color={!hasError ? 'black' : '#ff8787'} />
      </CheckmarkBox>
    </div>
    <div /* UncheckedWrap */
      css={inactiveIcWrapStyle}
      {...uncheckedWrapProps}
    >
      <CheckmarkBox data-error={hasError} />
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
export default CheckboxInput




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
    ${SvgIconsStyle.El.icon.props.color.name}: var(${CheckboxInputStyle.Prop.activeIconColor})
  }
`
const inactiveIcWrapStyle = css`
  display: flex;
  input:checked ~ & { display: none }
  ${SvgIconsStyle.El.icon.sel()} {
    ${SvgIconsStyle.El.icon.props.color.name}: var(${CheckboxInputStyle.Prop.inactiveIconColor})
  }
`


const CheckmarkBox = styled.div`
  border: 1px solid black;
  height: 100%;
  aspect-ratio: 1;
  ${center};
  padding: 4px;

  input:where(:active,:focus-visible,:focus) ~ * & {
    border-width: 2px;
    padding: 3px;
  }
  input[data-error] ~ * & {
    //border: 2px solid red;
    border-color: #ff8787;
  }
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

