import { css } from '@emotion/react'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import { InputProps } from 'src/ui/elements/inputs/Input/Input.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import { Option } from 'src/ui/model/Option.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import Callback = TypeUtils.Callback
import col = EmotionCommon.col




export type ModalRadioProps<V extends string> = {
  isOpen: boolean
  close: Callback
  title: string
  options: Option<V>[]
  radioInputProps: (value: V)=>InputProps
}



const ModalRadio =
<V extends string>(props: ModalRadioProps<V>) => {
  const { isOpen, close, title, options, radioInputProps } = props
  
  return <UseBottomSheetState isOpen={isOpen} close={close}>
    {sheetProps =>
      <ModalPortal>
        <BottomSheetDialogBasic
          {...sheetProps.sheetProps}
          header={title}
        >
          <RadioInputGroup css={selectItemsContainer}>
            {options.map(opt => <RadioInput
              css={RadioInputStyle.radio}
              childrenPosition="start"
              {...radioInputProps(opt.value)}
              ref={undefined}
              value={opt.value}
              key={opt.value}
              onClick={sheetProps.setClosing}
            >
              <div css={selectItemText}>
                {opt.text}
              </div>
            </RadioInput>)}
          
          </RadioInputGroup>
        </BottomSheetDialogBasic>
      </ModalPortal>
    }</UseBottomSheetState>
}
export default React.memo(ModalRadio) as typeof ModalRadio




const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`