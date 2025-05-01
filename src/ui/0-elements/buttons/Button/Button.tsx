import { css } from '@emotion/react'
import { useClickFix } from '@util/pointer/useClickFix.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import combineProps = ReactU.combineProps
import attrExists = TypeU.attrEmpty





type ButtonProps = React.ComponentPropsWithRef<'button'> & Pu<{
  hasError: boolean
}>


const Button = React.memo((props: ButtonProps) => {
  const {
    ref, className, children, onClick,
    hasError,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  const clickFix = useClickFix()
  
  return (
    <UseRipple>
      {rippleProps => (
        <button
          data-display-name='Button'
          ref={elemRef}
          data-error={attrExists(hasError)}
          className={clsx(className, ButtonS6.W.els.button.n)}
          type='button'
          {...combineProps(clickFix(onClick), restProps, rippleProps.target)}
          css={css`
            & > * {
              position: relative;
            }
          `}
        >
          
          <div
            data-display-name='Button Border'
            className={ButtonS6.W.els.bord.n}
            style={{ position: 'absolute' }}
          >
            <Ripple
              {...rippleProps.ripple}
              disabled={props.disabled}
            />
          </div>
          
          {children}
        
        </button>
      )}
    </UseRipple>
  )
})
Button.displayName = 'Button'
export default Button



