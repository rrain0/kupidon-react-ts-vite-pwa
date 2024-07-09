import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import React, {useImperativeHandle, useRef} from "react"
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import RadioActiveIc = SvgIcons.RadioActiveIc
import Ripple, { RippleMode } from 'src/ui/elements/Ripple/Ripple.tsx'
import RadioInactiveIc = SvgIcons.RadioInactiveIc
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import row = EmotionCommon.row
import trueOrUndef = TypeU.trueOrUndef
import Puro = TypeU.Puro






export type RadioInputProps = React.ComponentPropsWithoutRef<'input'> & Puro<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
  rippleMode: RippleMode
}>



const RadioInput = 
React.memo(
React.forwardRef<HTMLInputElement, RadioInputProps>
((props, forwardedRef)=> {
  const {
    hasError,
    startViews, endViews,
    children, childrenPosition = 'end',
    rippleMode = 'cursor',
    className, style,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLInputElement>(null)
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

