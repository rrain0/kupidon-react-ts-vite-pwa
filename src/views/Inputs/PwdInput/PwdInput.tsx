/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import Input, {InputProps} from "src/views/Inputs/Input/Input"
import { useRef, useState } from 'react'
import React from "react"
import {SvgIcons} from "src/views/icons/SvgIcons"
import EyeCrossedOutIc = SvgIcons.EyeCrossedOutIc
import EyeIc = SvgIcons.EyeIc
import Ripple from "src/views/Ripple/Ripple"
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { RippleStyle } from 'src/views/Ripple/RippleStyle'
import center = EmotionCommon.center
import resetButton = EmotionCommon.resetButton
import hoverable = EmotionCommon.hoverable




const PwdInput =
React.memo(
React.forwardRef<HTMLInputElement, Omit<InputProps,'type'|'children'>>(
  (props, forwardedRef) => {
  const { ...restProps } = props
  
  const [pwdHidden, setPwdHidden] = useState(true)
  
  const eyeRef = useRef<HTMLButtonElement>(null)
  
  
  return <Input
    {...restProps}
    ref={forwardedRef}
    type={pwdHidden ? 'password' : 'text'}
  >
    <EyeFrame>
      <EyeWrap
        ref={eyeRef}
        tabIndex={0}
        onClick={() => setPwdHidden(!pwdHidden)}
        onPointerDown={ev => {
          ev.preventDefault() // prevents focus
        }}
      >
        
        <Ripple
          targetElement={eyeRef}
          css={rippleCss}
        />
        
        {pwdHidden
          ? <EyeCrossedOutIc css={iconCss}/>
          : <EyeIc css={iconCss}/>
        }
      
      </EyeWrap>
    </EyeFrame>
  </Input>
}))
export default PwdInput



const EyeFrame = styled.div`
  width: min(50px, 100cqh);
  height: min(50px, 100cqh);
  padding: 2px;
`

const EyeWrap = styled.button`
  ${resetButton};
  width: 100%;
  height: 100%;
  border-radius: 999999px;
  cursor: pointer;
  ${center};
  position: relative;
  :focus-visible {
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  }
  ${hoverable}{ :hover {
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  } }
`
EyeWrap.defaultProps = { type: 'button' }


const iconCss = (t:AppTheme.Theme)=>css`
  ${SvgIcStyle.El.thiz.icon}{
    ${SvgIcStyle.Prop.prop.size}: 24px;
    ${SvgIcStyle.Prop.prop.color}: ${t.input.content[0]};
  }
`
const rippleCss = (t:AppTheme.Theme)=>css`
  ${RippleStyle.El.frame}{
    ${RippleStyle.Prop.mode}: center;
    ${RippleStyle.Prop.color}: ${t.ripple.contentOnTransparent[0]};
  }
`
