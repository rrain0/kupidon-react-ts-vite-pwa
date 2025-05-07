import { useClick } from '@util/pointer/useClick.ts'
import { useLongPress } from '@util/pointer/useLongPress.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import {
  FlexShortProps,
  processFlexShortProps,
} from 'src/ui/0-elements/basic-elements/processFlexShortProps.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import Ripple from 'src/ui/0-elements/Ripple/Ripple.tsx'
import UseRipple from 'src/ui/0-elements/Ripple/UseRipple.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import combineProps = ReactU.combineProps
import HtmlEmptyAttr = TypeU.HtmlEmptyAttr
import Callback = TypeU.Callback





type ButtonProps = React.ComponentPropsWithRef<'button'> & Pu<{
  'data-locked': HtmlEmptyAttr
  'data-selected': HtmlEmptyAttr
  'data-error': HtmlEmptyAttr
  onLongPress: Callback
}> & FlexShortProps


const Button = React.memo((props: ButtonProps) => {
  const {
    flex,
    rest: {
      ref, className, children,
      onClick, onLongPress,
      ...restProps
    },
  } = processFlexShortProps(props)
  
  
  const elemRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  const getOnClick = useClick()
  const getOnLongPress = useLongPress()
  
  return (
    <UseRipple>
      {rippleProps => (
        <button
          data-display-name='Button'
          ref={elemRef}
          className={clsx(className, ButtonS6.W.els.button.n)}
          type='button'
          {...combineProps(
            getOnClick(onClick), getOnLongPress(onLongPress), restProps, { style: flex }, rippleProps.target
          )}
          css={[
            // TODO Style
            { '& > *': { position: 'relative' } },
          ]}
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



