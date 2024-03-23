import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import React, { useImperativeHandle, useRef } from "react"
import classNames from "classnames"
import { ButtonStyle } from 'src/ui/widgets/Buttons/ButtonStyle.ts'
import Ripple, { RippleProps } from 'src/ui/widgets/Ripple/Ripple.tsx'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import abs = EmotionCommon.abs
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable
import trueOrUndef = TypeUtils.trueOrUndef





export type ButtonCustomProps = PartialUndef<{
  hasError: boolean
  rippleMode: RippleProps['mode']
  rippleDuration: RippleProps['rippleDuration']
}>
export type ButtonForwardRefProps = React.JSX.IntrinsicElements['button']
export type ButtonRefElement = HTMLButtonElement
export type ButtonProps = ButtonCustomProps & ButtonForwardRefProps



const Button =
React.memo(
React.forwardRef<ButtonRefElement, ButtonProps>(
(props, forwardedRef) => {
  const {
    hasError, className, type,
    rippleMode, rippleDuration,
    children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<ButtonRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const buttonProps = {
    [ButtonStyle.Attr.error.name]: trueOrUndef(hasError),
    className: classNames(className, ButtonStyle.El.btn.name),
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
  
  
  
  return <button css={buttonStyle}
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
    
  </button>
}))
export default Button




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