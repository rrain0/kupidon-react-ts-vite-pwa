import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import { CheckboxInputStyle } from './CheckboxInputStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import trueOrUndef = TypeU.trueOrUndef
import Checkmark2Ic = SvgIconsPack.Checkmark2Ic
import Puro = TypeU.Puro
import UseRipple from 'ui/0-elements/Ripple/UseRipple.tsx'





type CheckboxInputProps = React.ComponentPropsWithoutRef<typeof Input> & Puro<{
  hasError: boolean
  
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
}>


const CheckboxInput = React.memo(React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  (props, forwardedRef) => {
    const {
      className, style,
      hasError,
      startViews, endViews,
      children, childrenPosition = 'start',
      ...restProps
    } = props
    
    
    
    
    const elemRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(forwardedRef, () => elemRef.current!, [])
    
    
    const frameProps = {
      className: clsx(className, CheckboxInputStyle.W.e.frame.e.name),
      tabIndex: 0,
      style: style,
    }
    const inputProps = {
      className: CheckboxInputStyle.W.e.input.e.name,
      type: 'checkbox',
      [CheckboxInputStyle.W.s.error.s.name]: trueOrUndef(hasError),
      ...restProps,
    }
    const iconBoxProps = {
      className: CheckboxInputStyle.W.e.iconBox.e.name,
    }
    const iconBoxCheckedProps = {
      className: CheckboxInputStyle.W.e.iconBoxChecked.e.name,
    }
    
    
    return (
      <UseRipple>
        {rippleProps => (
          <label // Frame
            {...frameProps}
            {...rippleProps.target}
          >
            
            <input // Input
              {...inputProps}
              ref={elemRef}
            />
            
            { startViews }
            { childrenPosition === 'start' && children }
            
            <div // IconBox
              {...iconBoxProps}
            />
            
            <div // IconBoxChecked
              {...iconBoxCheckedProps}
            >
              <Checkmark2Ic />
            </div>
            
            { childrenPosition === 'end' && children }
            { endViews }
            
            <Ripple
              css={RippleS6.t(RippleS6.S.onTrans.round.icon.normal)}
              {...rippleProps.ripple}
            />
          
          </label>
        )}
      </UseRipple>
    )
  })
)
export default CheckboxInput


