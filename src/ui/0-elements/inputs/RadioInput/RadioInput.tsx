import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import RadioActiveIc = SvgIconsPack.RadioActiveIc
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import RadioInactiveIc = SvgIconsPack.RadioInactiveIc
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import row = EmotionCommon.row
import Puro = TypeU.Puro
import attrExists = TypeU.attrExists






export type RadioInputProps = React.ComponentPropsWithoutRef<'input'> & Puro<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
}>



const RadioInput = React.memo(React.forwardRef<HTMLInputElement, RadioInputProps>(
  (props, forwardedRef) => {
    const {
      hasError,
      startViews, endViews,
      children, childrenPosition = 'end',
      className, style,
      ...restProps
    } = props
    
    
    const elemRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(forwardedRef, () => elemRef.current!, [])
    
    
    const frameProps = {
      className: clsx(className, RadioInputStyle.El.frameClassName),
      style: style,
    }
    const inputProps = {
      className: RadioInputStyle.El.inputClassName,
      type: 'radio',
      [RadioInputStyle.Attr.errorName]: attrExists(hasError),
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
      <UseRipple>
        {rippleProps => (
          <label /* Frame */
            css={frameStyle}
            {...frameProps}
            {...rippleProps.target}
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
              <RadioActiveIc />
            </div>
            <div /* InactiveWrap */
              css={inactiveWrapStyle}
              {...inactiveWrapProps}
            >
              <RadioInactiveIc />
            </div>
            
            {childrenPosition === 'end' && children}
            {endViews}
            
            <div /* Border */
              css={borderStyle}
              {...borderProps}
            >
              <Ripple
                css={RippleS6.t(RippleS6.S.onTrans.round.full.normal)}
                {...rippleProps.ripple}
              />
            </div>
          
          </label>
        )}
      </UseRipple>
    )
  })
)
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
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

