import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Ripple, { RippleProps } from 'src/ui/elements/Ripple/Ripple.tsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import abs = EmotionCommon.abs
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable
import trueOrUndef = TypeUtils.trueOrUndef







type ButtonElement = HTMLButtonElement
type ButtonProps = React.ComponentPropsWithoutRef<typeof ButtonFrame> & PartialUndef<{
  hasError: boolean
  rippleMode: React.ComponentProps<typeof Ripple>['mode']
  rippleDuration: RippleProps['rippleDuration']
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
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const buttonProps = {
    [ButtonStyle.Attr.error.name]: trueOrUndef(hasError),
    className: clsx(className, ButtonStyle.El.btn.name),
    type: type ?? 'button',
    ...restProps
  }
  const borderProps = {
    className: ButtonStyle.El.border.name
  }
  const rippleProps = {
    mode: rippleMode ?? 'cursor',
    rippleDuration,
  }
  
  
  
  return <ButtonFrame css={buttonStyle}
    {...buttonProps}
    ref={elemRef}
  >
    
    { children }
    
    <div css={borderStyle}
      {...borderProps}
    >
      <Ripple
        targetElement={elemRef}
        {...rippleProps}
      />
    </div>
    
  </ButtonFrame>
}))
export default Button




const ButtonFrame = styled.button``



const buttonStyle = css`
  ${resetButton};
  position: relative;
  ${row};
  place-content: center;
  place-items: center;

  :active, :focus-visible {
    cursor: pointer;
  }
  ${hoverable}{ :hover {
    cursor: pointer;
  } }
  :disabled {
    cursor: auto;
  }
`



const borderStyle = css`
  ${abs};
  place-self: stretch;
  pointer-events: none;
  border-radius: inherit;
`