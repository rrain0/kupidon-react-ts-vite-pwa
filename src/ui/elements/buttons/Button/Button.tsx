import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import Ripple from 'src/ui/elements/Ripple/Ripple.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import trueOrUndef = TypeU.trueOrUndef






type ButtonProps = React.ComponentPropsWithoutRef<'button'> & PartialUndef<{
  hasError: boolean
  rippleMode: React.ComponentProps<typeof Ripple>['mode']
  rippleDuration: React.ComponentProps<typeof Ripple>['rippleDuration']
}>


const Button =
React.memo(
React.forwardRef<HTMLButtonElement, ButtonProps>(
(props, forwardedRef) => {
  const {
    hasError, className,
    rippleMode, rippleDuration,
    children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const buttonProps = {
    [ButtonStyle.W.s.error.s.name]: trueOrUndef(hasError),
    className: clsx(className, ButtonStyle.W.e.button.e.name),
    type: 'button' as const, // will be overridden by 'type' from 'restProps'
    ...restProps
  }
  const borderProps = {
    className: ButtonStyle.W.e.border.e.name
  }
  const rippleProps = {
    mode: rippleMode ?? 'cursor',
    rippleDuration,
  }
  
  
  
  return <button // Button
    {...buttonProps}
    ref={elemRef}
  >
    
    { children }
    
    <div // Border
      {...borderProps}
    >
      <Ripple // Ripple
        targetElement={elemRef}
        {...rippleProps}
      />
    </div>
    
  </button>
}))
export default Button



