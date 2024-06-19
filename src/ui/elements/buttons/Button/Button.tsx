import styled from '@emotion/styled'
import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import Ripple, { RippleProps } from 'src/ui/elements/Ripple/Ripple.tsx'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef







type ButtonElement = HTMLButtonElement
type ButtonProps = Omit<React.ComponentPropsWithoutRef<typeof StyledButton>, 'type'> & PartialUndef<{
  hasError: boolean
  rippleMode: React.ComponentProps<typeof Ripple>['mode']
  rippleDuration: RippleProps['rippleDuration']
  type: React.ComponentPropsWithoutRef<typeof StyledButton>['type'] | null
}>


const Button =
React.memo(
React.forwardRef<ButtonElement, ButtonProps>(
(props, forwardedRef) => {
  const {
    hasError, className, type,
    rippleMode, rippleDuration,
    children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<ButtonElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const buttonProps = {
    [ButtonStyle.W.s.error.s.name]: trueOrUndef(hasError),
    className: clsx(className, ButtonStyle.W.e.button.e.name),
    type: type === undefined ? 'button' : type === null ? undefined : type,
    ...restProps
  }
  const borderProps = {
    className: ButtonStyle.W.e.border.e.name
  }
  const rippleProps = {
    mode: rippleMode ?? 'cursor',
    rippleDuration,
  }
  
  
  
  return <StyledButton // button
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
    
  </StyledButton>
}))
export default Button



const StyledButton = styled.button()

