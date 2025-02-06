import { PointerU } from '@util/pointer/PointerU.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { useState } from 'react'
import React from 'react'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import EyeCrossedOutIc = SvgIconsPack.EyeCrossedOutIc
import EyeIc = SvgIconsPack.EyeIc
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import flexC = EmotionCommon.flexC
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import evPreventDefault = PointerU.evPreventDefault



export type PwdInputProps = Omit<React.ComponentPropsWithoutRef<typeof Input>, 'type' | 'children'>

const PwdInput = React.memo(React.forwardRef<HTMLInputElement, PwdInputProps>(
  (props, forwardedRef) => {
    const { ...restProps } = props
    
    const [pwdHidden, setPwdHidden] = useState(true)
    
    
    return (
      <Input
        {...restProps}
        data-display-name="PwdInput"
        ref={forwardedRef}
        type={pwdHidden ? 'password' : 'text'}
      >
        <EyeFrame>
          <Button
            css={IconButtonS6.t(eyeButtonS)}
            onClick={() => setTimeout(() => setPwdHidden(!pwdHidden), 50)}
            // Prevent input focus.
            // todo hack fix костыль - But focus preventing works only if setTimeout in click
            onPointerDown={evPreventDefault}
          >
            {pwdHidden
              ? <EyeCrossedOutIc />
              : <EyeIc />
            }
          </Button>
        </EyeFrame>
      </Input>
    )
  })
)
PwdInput.displayName = 'PwdInput'
export default PwdInput



const EyeFrame = styled.div`
  ${flexC};
  width: min(50px, 100cqh);
  height: min(50px, 100cqh);
  padding: 3px;
`


const eyeButtonS: AppWidgetStyle = t => [IconButtonS6.S.trans.round.lg.normal2, {
  button: { sz: 'full', p: 10 },
  icon: { sz: 24, color: t.input.ct[0] },
  inFocus: {
    buttonBgColor: t.buttonTrans.bgFc[0],
  },
}]


