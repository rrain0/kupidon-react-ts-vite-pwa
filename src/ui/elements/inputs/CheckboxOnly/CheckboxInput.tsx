import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from 'src/ui/elements/buttons/Button.tsx'
import Input from 'src/ui/elements/inputs/Input/Input.tsx'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { CheckboxInputStyle } from './CheckboxInputStyle.ts'
import React, { useImperativeHandle, useRef } from "react"
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import abs = EmotionCommon.abs
import trueOrUndef = TypeUtils.trueOrUndef
import center = EmotionCommon.center
import Checkmark2Ic = SvgIcons.Checkmark2Ic
import Puro = TypeUtils.Puro








type CheckboxElement = HTMLInputElement
type CheckboxProps = React.ComponentPropsWithoutRef<typeof Input> & Puro<{
  hasError: boolean
  checkedComponent: React.ReactNode
  uncheckedComponent: React.ReactNode
}>


const CheckboxInput =
React.memo(
React.forwardRef<CheckboxElement, CheckboxProps>
((props, forwardedRef)=> {
  const {
    className, style,
    hasError,
    ...restProps
  } = props
  
  
  const elemRef = useRef<CheckboxElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className, CheckboxInputStyle.W.e.frame.e.name),
    style: style,
  }
  const inputProps = {
    className: CheckboxInputStyle.W.e.input.e.name,
    type: 'checkbox',
    [CheckboxInputStyle.W.s.error.s.name]: trueOrUndef(hasError),
    ...restProps,
  }
  const iconBoxProps = {
    className: CheckboxInputStyle.W.e.iconBox.e.name
  }
  const iconBoxCheckedProps = {
    className: CheckboxInputStyle.W.e.iconBoxChecked.e.name
  }
  
  
  return <Button // Frame
    as="label"
    type={null}
    {...frameProps}
  >
    
    {/* <div css={css`width: 100%;
      height: 100%`}/> */}
    
    <input // Input
      {...inputProps}
      ref={elemRef}
    />
    
    <div // IconBox
      {...iconBoxProps}
    >
      {/* <CheckmarkBox data-error={hasError}/> */}
    </div>
    
    <div // IconBoxChecked
      {...iconBoxCheckedProps}
    >
      {/* <CheckmarkBox>
       <Checkmark2Ic color={!hasError ? 'black' : '#ff8787'}/>
       </CheckmarkBox> */}
    </div>
  
  </Button>
}))
export default CheckboxInput


const CheckmarkBox = styled.div`
  border-radius: 4px;
  height: 100%;
  aspect-ratio: 1;
  ${center};
  padding: 2px;
  position: relative;
  
  ::after {
    content: '';
    ${abs};
    border: 2px solid black;
    border-radius: inherit;
  }

  input:where(:active,:focus-visible,:focus) ~ * & {
    ::after {
      border-width: 2.5px;
    }
  }
  input[data-error] ~ * & {
    ::after {
      border-color: #ff8787;
    }
  }
`

