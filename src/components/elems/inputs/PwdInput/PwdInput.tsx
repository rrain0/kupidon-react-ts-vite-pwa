import { PointerU } from '@utils/pointer/PointerU.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import EyeCrossedOutIc from 'src/components/elems/icons/SvgIcons/pack/ui/EyeCrossedOutIc.tsx'
import EyeIc from 'src/components/elems/icons/SvgIcons/pack/ui/EyeIc.tsx'
import Input from 'src/components/elems/inputs/Input/Input.tsx'
import { useState } from 'react'
import React from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import flexC = EmotionCommon.flexC
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle'
import evPreventDefault = PointerU.evPreventDefault



export type PwdInputProps = Omit<React.ComponentProps<typeof Input>, 'type' | 'children'>

const PwdInput = React.memo((props: PwdInputProps) => {
  const { ref, ...restProps } = props
  
  const [pwdHidden, setPwdHidden] = useState(true)
  
  
  return (
    <Input
      {...restProps}
      data-display-name='PwdInput'
      ref={ref}
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
            ? <EyeCrossedOutIc/>
            : <EyeIc/>
          }
        </Button>
      </EyeFrame>
    </Input>
  )
})
PwdInput.displayName = 'PwdInput'
export default PwdInput



const EyeFrame = styled.div`
  ${flexC};
  width: min(50px, 100cqh);
  height: min(50px, 100cqh);
  padding: 3px;
`


const eyeButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.trans.round.lg.secondary, {
    button: { sz: 'full', p: 10 },
    icon: { sz: 24, color: t.input.ct },
  },
]


