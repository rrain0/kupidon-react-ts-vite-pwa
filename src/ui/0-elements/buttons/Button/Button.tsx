import { useRefGetSet } from '@util/react-state/useRefGetSet.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import trueOrUndef = TypeU.trueOrUndef
import combineProps = ReactU.combineProps





type ButtonProps = React.ComponentPropsWithoutRef<'button'> & PartialUndef<{
  hasError: boolean
}>


const Button = React.memo(React.forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const {
    hasError,
    className, children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!, [])
  
  // TODO костыль для клика.
  //  Без костыля если при закрывании шторки на андроиде жать кнопку, то клик не работает, хотя всё ок.
  const [getWasClicked, setWasClicked] = useRefGetSet(false)
  
  
  return (
    <UseRipple>
      { rippleProps => (
        <button
          data-display-name="Button"
          ref={elemRef}
          {...{ [ButtonS6.W.els.button.ss!.error.n]: trueOrUndef(hasError) }}
          className={clsx(className, ButtonS6.W.els.button.n)}
          type="button"
          {...combineProps(restProps, rippleProps.target)}
          // TODO костыль для клика
          onPointerUp={ev => {
            rippleProps.target.onPointerUp(ev)
            restProps.onPointerUp?.(ev)
            setWasClicked(false)
            setTimeout(() => {
              if (!getWasClicked()) elemRef.current?.click()
            }, 50)
          }}
          // TODO костыль для клика
          onClick={ev => {
            setWasClicked(true)
            restProps.onClick?.(ev)
          }}
        >
          
          {children}
          
          <div // Border
            className={ButtonS6.W.els.border.n}
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
}))
Button.displayName = 'Button'
export default Button



