import styled from '@emotion/styled'
import { useClick } from '@utils/gestures/pointer/useClick.ts'
import { useLongPress } from '@utils/gestures/pointer/useLongPress.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import {
  FlexViewShortProps,
  processFlexViewShortProps,
} from '@libs/short-propsed/props/processFlexViewShortProps.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import Ripple from 'src/components/elems/Ripple/Ripple.tsx'
import UseRipple from 'src/components/elems/Ripple/UseRipple.tsx'

import { Pu } from '@utils/base/typeUtils.ts'
import combineProps = ReactU.combineProps
import { HtmlEmptyAttr } from '@utils/base/typeUtils.ts'
import { Callback } from '@utils/base/typeUtils.ts'



// TODO - риппл должен быть над бэкграундом кнопки и под любым контентом (в том числе и просто текстом)
//  Для этого никак не обойтись без оборачивания контента в доп элемент.
//  Но это ломает поток width / height, так что их придётся более замороченным путйм высталять.
//  Да и не факт, что в таком случае абсолютно позиционированное не захочет вылезти наверх.
// TODO дождаться, когда сделают Paint API и запихать риппл в бэкграунд



type ButtonProps = React.ComponentProps<typeof ButtonElem> & FlexViewShortProps & Pu<{
  'data-locked': HtmlEmptyAttr
  'data-selected': HtmlEmptyAttr
  'data-error': HtmlEmptyAttr
  onLongPress: Callback
}>



const Button = React.memo((props: ButtonProps) => {
  const { css, flexViewRest } = processFlexViewShortProps(props)
  const {
    ref, className, children,
    onClick, onLongPress,
    ...restProps
  } = flexViewRest
  
  
  const elemRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  const getOnClick = useClick()
  const getOnLongPress = useLongPress()
  
  const buttonFlexViewClassName = ButtonS6.W.els.button.n + 'FlexView'
  
  return (
    <UseRipple>
      {rippleProps => (
        <ButtonElem
          data-display-name='Button'
          ref={elemRef}
          className={clsx(className, ButtonS6.W.els.button.n, buttonFlexViewClassName)}
          type='button'
          {...combineProps(
            getOnClick(onClick), getOnLongPress(onLongPress),
            restProps, rippleProps.target,
          )}
          css={{
            [`&.${ButtonS6.W.els.button.n}.${buttonFlexViewClassName}`]: css,
          }}
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


