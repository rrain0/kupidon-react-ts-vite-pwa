import { css } from '@emotion/react'
import { useClickFix } from '@util/pointer/useClickFix.ts'
import { ReactU } from '@util/react/ReactU.ts'
import { useWasDragged } from '@util/pointer/useWasDragged.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import combineProps = ReactU.combineProps
import attrExists = TypeU.attrExists





type ButtonProps = React.ComponentPropsWithoutRef<'button'> & PartialUndef<{
  hasError: boolean
}>


const Button = React.memo(React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      hasError,
      className, children,
      ...restProps
    } = props
    
    
    const elemRef = useRef<HTMLButtonElement>(null)
    useImperativeHandle(forwardedRef, () => elemRef.current!, [])
    
    const clickFix = useClickFix()
    const { getWasDragged } = useWasDragged()
    
    
    return (
      <UseRipple>
        { rippleProps => (
          <button
            data-display-name="Button"
            ref={elemRef}
            data-error={attrExists(hasError)}
            className={clsx(className, ButtonS6.W.els.button.n)}
            type="button"
            {...combineProps(clickFix, restProps, rippleProps.target)}
            onClick={(ev) => {
              clickFix.onClick(ev)
              // TODO Pointer - click fix 2
              if (getWasDragged()) return
              restProps.onClick?.(ev)
            }}
            css={css`
              & > * {
                position: relative;
              }
            `}
          >
            
            <div
              data-display-name="Button Border"
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
)
Button.displayName = 'Button'
export default Button



