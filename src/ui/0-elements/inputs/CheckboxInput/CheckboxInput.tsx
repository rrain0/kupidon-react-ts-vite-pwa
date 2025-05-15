import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { CheckboxInputStyle } from './CheckboxInputStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import CheckmarkBoldIc = SvgIconsPack.CheckmarkBoldIc
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr





type CheckboxInputProps = React.ComponentProps<typeof Input> & Pu<{
  hasError: boolean
  
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
}>


const CheckboxInput = React.memo((props: CheckboxInputProps) => {
  const {
    ref,
    className, style,
    hasError,
    startViews, endViews,
    children, childrenPosition = 'start',
    ...restProps
  } = props
  
  
  
  
  const elemRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const frameProps = {
    className: clsx(className, CheckboxInputStyle.W.e.frame.e.name),
    tabIndex: 0,
    style: style,
  }
  const inputProps = {
    className: CheckboxInputStyle.W.e.input.e.name,
    type: 'checkbox',
    [CheckboxInputStyle.W.s.error.s.name]: toEmptyAttr(hasError),
    ...restProps,
  }
  const iconBoxProps = {
    className: CheckboxInputStyle.W.e.iconBox.e.name,
  }
  const iconBoxCheckedProps = {
    className: CheckboxInputStyle.W.e.iconBoxChecked.e.name,
  }
  
  
  return (
    <Button as='label' // Frame
      {...frameProps}
      css={IconButtonS6.t(IconButtonS6.S.trans.round.lg.secondary)}
    >
      
      <input // Input
        {...inputProps}
        ref={elemRef}
      />
      
      {startViews}
      {childrenPosition === 'start' && children}
      
      <div // IconBox
        {...iconBoxProps}
      />
      
      <div // IconBoxChecked
        {...iconBoxCheckedProps}
      >
        <CheckmarkBoldIc/>
      </div>
      
      {childrenPosition === 'end' && children}
      {endViews}
    
    </Button>
  )
})
CheckboxInput.displayName = 'CheckboxInput'
export default CheckboxInput


