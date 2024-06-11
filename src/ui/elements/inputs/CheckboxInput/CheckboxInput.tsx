import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Input from 'src/ui/elements/inputs/Input/Input.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { CheckboxInputStyle } from 'src/ui/elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import React, {useImperativeHandle, useRef} from "react"
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import row = EmotionCommon.row
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef
import center = EmotionCommon.center
import Checkmark2Ic = SvgIcons.Checkmark2Ic








type CheckboxElement = HTMLInputElement
type CheckboxProps = React.ComponentPropsWithoutRef<typeof Input> & PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
  //rippleMode: React.ComponentProps<typeof Ripple>['mode']
}>


const CheckboxInput =
React.memo(
React.forwardRef<CheckboxElement, CheckboxProps>
((props, forwardedRef)=> {
  const {
    hasError,
    startViews, endViews,
    children, childrenPosition = 'end',
    //rippleMode = 'cursor',
    className, style,
    ...restProps
  } = props
  
  
  const elemRef = useRef<CheckboxElement>(null)
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
  
  
  return <Button /* Frame */
    as='label'
    css={t => [ButtonStyle.textRectBig(t), frameStyle]}
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
        <Checkmark2Ic color={!hasError ? 'black' : '#ff8787'} />
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
    
  </Button>
}))
export default CheckboxInput







const frameStyle = css`
  position: relative;
  ${row};
  justify-content: start;
  align-items: center;
  //cursor: pointer;
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
  border-radius: 4px;
  height: 100%;
  aspect-ratio: 1;
  ${center};
  padding: 2px;
  position: relative;
  
  ::after {
    content: '';
    ${abs};
    border: 2px solid black;
    border-radius: inherit;
  }

  input:where(:active,:focus-visible,:focus) ~ * & {
    ::after {
      border-width: 2.5px;
    }
  }
  input[data-error] ~ * & {
    ::after {
      border-color: #ff8787;
    }
  }
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

