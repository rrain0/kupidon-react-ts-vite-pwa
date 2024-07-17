import { css } from '@emotion/react'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import Input from "src/ui/elements/inputs/Input/Input.tsx"
import { useRef, useState } from 'react'
import React from "react"
import { SvgIcons } from "src/ui/elements/icons/SvgIcons/SvgIcons.tsx"
import EyeCrossedOutIc = SvgIcons.EyeCrossedOutIc
import EyeIc = SvgIcons.EyeIc
import Ripple from "src/ui/elements/Ripple0/Ripple.tsx"
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { RippleStyle } from 'src/ui/elements/Ripple0/RippleStyle.ts'
import center = EmotionCommon.center
import resetButton = EmotionCommon.resetButton
import hoverable = EmotionCommon.hoverable





const PwdInput =
React.memo(
React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<typeof Input>,'type'|'children'>
>(
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
  ${SvgIconsStyle.El.icon.thiz()}{
    ${SvgIconsStyle.El.icon.props.size.set('24px')}
    ${SvgIconsStyle.El.icon.props.color.set(t.input.content[0])}
  }
`
const rippleCss = (t:AppTheme.Theme)=>css`
  ${RippleStyle.El0.frame}{
    ${RippleStyle.Prop.mode}: center;
    ${RippleStyle.Prop.color}: ${t.ripple.contentOnTransparent[0]};
  }
`
