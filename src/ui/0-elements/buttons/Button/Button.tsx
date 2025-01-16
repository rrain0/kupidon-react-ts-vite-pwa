import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import trueOrUndef = TypeU.trueOrUndef
import combineEvHandlersRecords = ReactU.combineEvHandlersRecords






type ButtonProps = React.ComponentPropsWithoutRef<'button'> & PartialUndef<{
  hasError: boolean
}>


const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, forwardedRef) => {
      const {
        hasError,
        className, children,
        ...restProps
      } = props
      
      
      const elemRef = useRef<HTMLButtonElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      return (
        <UseRipple>
          { rippleProps => (
            <button // Button
              ref={elemRef}
              {...{ [ButtonS.W.s.error.s.name]: trueOrUndef(hasError) }}
              className={clsx(className, ButtonS.W.e.button.e.name)}
              type="button"
              {...restProps}
              {...combineEvHandlersRecords(rippleProps.target, restProps)}
            >
              
              {children}
              
              <div // Border
                className={ButtonS.W.e.border.e.name}
              >
                <Ripple
                  {...rippleProps.ripple}
                  // todo more imperative ripple and ability to cancel
                  {...props.disabled && { isShow: false }}
                />
              </div>
            
            </button>
          )}
        </UseRipple>
      )
    }
  )
)
export default Button



