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
import center = EmotionCommon.center
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
            onClick={() => setPwdHidden(!pwdHidden)}
            // prevent input focus
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
  ${center};
  width: min(50px, 100cqh);
  height: min(50px, 100cqh);
  padding: 3px;
`


const eyeButtonS: AppWidgetStyle = t => [IconButtonS6.S.Trans.Round.Big.normal2, {
  button: { sz: 'full', p: 10 },
  icon: { sz: 24, color: t.input.ct[0] },
  inFocus: {
    buttonBgColor: t.buttonTransparent.bgFocus[0],
  },
}]


