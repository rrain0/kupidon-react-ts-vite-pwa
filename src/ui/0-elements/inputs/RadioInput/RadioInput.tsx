import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import RadioActiveIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/RadioActiveIc.tsx'
import RadioInactiveIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/RadioInactiveIc.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { TypeU } from '@utils/common/TypeU.ts'
import resetInput = EmotionCommon.resetInput
import absTlwh = EmotionCommon.absTlwh
import row = EmotionCommon.row
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr






export type RadioInputProps = React.ComponentProps<'input'> & Pu<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
}>



const RadioInput = React.memo((props: RadioInputProps) => {
  const {
    ref, className, style,
    hasError,
    startViews, endViews,
    children, childrenPosition = 'end',
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const frameProps = {
    className: clsx(className, RadioInputStyle.El.frameClassName),
    style: style,
  }
  const inputProps = {
    className: RadioInputStyle.El.inputClassName,
    type: 'radio',
    [RadioInputStyle.Attr.errorName]: toEmptyAttr(hasError),
    ...restProps,
  }
  const activeWrapProps = {
    className: RadioInputStyle.El.iconWrapClassName,
  }
  const inactiveWrapProps = {
    className: RadioInputStyle.El.iconWrapClassName,
  }
  const borderProps = {
    className: RadioInputStyle.El.borderClassName,
  }
  
  
  return (
    <Button as='label' // Frame
      css={[ButtonS6.t(ButtonS6.S.text.rect.md.normal), frameStyle]}
      {...frameProps}
    >
      
      <input /* Input */
        css={inputStyle}
        {...inputProps}
        ref={elemRef}
      />
      
      {startViews}
      {childrenPosition === 'start' && children}
      
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
      
      {childrenPosition === 'end' && children}
      {endViews}
    
    </Button>
  )
})
RadioInput.displayName = 'RadioInput'
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
  ${absTlwh};
  opacity: 0;
  cursor: pointer;
`



const activeIcWrapStyle = css`
  display: none;
  input:checked ~ & { display: flex; }
  // TODO Style - make NOT this selector
  /* ${SvgIconS6.t0({
    iconColor: `var(${RadioInputStyle.Prop.activeIconColor})`,
  })()} */
  ${SvgIconS.El.icon.sel()} {
    ${SvgIconS.El.icon.props.color.name}: var(${RadioInputStyle.Prop.activeIconColor})
  }
`


const inactiveWrapStyle = css`
  display: flex;
  input:checked ~ & { display: none }
  // TODO Style - make NOT this selector
  /* ${SvgIconS6.t0({
    iconColor: `var(${RadioInputStyle.Prop.inactiveIconColor})`,
  })()} */
  ${SvgIconS.El.icon.sel()} {
    ${SvgIconS.El.icon.props.color.name}: var(${RadioInputStyle.Prop.inactiveIconColor})
  }
`



const borderStyle = css`
  ${absTlwh};
  pointer-events: none;
  border-radius: inherit;
`

