import styled from '@emotion/styled'
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



// TODO - риппл должен быть над бэкграундом кнопки и под любым контентом (в том числе и просто текстом)
//  Для этого никак не обойтись без оборачивания контента в доп элемент.
//  Но это ломает поток width / height, так что их придётся более замороченным путйм высталять.
//  Да и не факт, что в таком случае абсолютно позиционированное не захочет вылезти наверх.



type ButtonProps = React.ComponentProps<typeof ButtonElem> & Pu<{
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
        <ButtonElem
          data-display-name='Button'
          ref={elemRef}
          className={clsx(className, ButtonS6.W.els.button.n)}
          type='button'
          {...combineProps(
            getOnClick(onClick), getOnLongPress(onLongPress),
            restProps, { style: flex }, rippleProps.target,
          )}
          /* css={[
            // TODO Style
            {
              [`& > .${ButtonS6.W.els.bord.n}`]: {
                zIndex: 0,
              },
              [`& > *:not(.${ButtonS6.W.els.bord.n})`]: {
                position: 'relative',
                //zIndex: 10,
              },
            },
          ]} */
        >
          
          <div
            data-display-name='Button Border'
            className={ButtonS6.W.els.bord.n}
          >
            <Ripple
              {...rippleProps.ripple}
              disabled={props.disabled}
            />
          </div>
          
          {children}
        
        </ButtonElem>
      )}
    </UseRipple>
  )
})
Button.displayName = 'Button'
export default Button



const ButtonElem = styled.button()


