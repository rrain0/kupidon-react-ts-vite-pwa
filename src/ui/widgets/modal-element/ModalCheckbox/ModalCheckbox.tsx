import { css } from '@emotion/react'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/elements/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import CheckboxInput from 'src/ui/elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import CheckboxInputGroup from 'src/ui/elements/inputs/CheckboxInputGroup/CheckboxInputGroup.tsx'
import { InputProps } from 'src/ui/elements/inputs/Input/Input.tsx'
import { Option } from 'src/ui/model/Option.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import Callback = TypeUtils.Callback
import col = EmotionCommon.col
import Callback1 = TypeUtils.Callback1




export type ModalCheckboxProps<V extends string> = {
  isOpen: boolean
  close: Callback
  title: string
  options: Option<V>[]
  checked: V[]
  onCheck: Callback1<V>
}



const ModalCheckbox =
<V extends string>(props: ModalCheckboxProps<V>) => {
  const { isOpen, close, title, options, checked, onCheck } = props
  
  return <UseBottomSheetState isOpen={isOpen} close={close}>
    {sheetProps =>
      <ModalPortal>
        <BottomSheetDialogBasic
          {...sheetProps.sheetProps}
          header={title}
        >
          <CheckboxInputGroup css={selectItemsContainer}>
            {options.map(opt => <CheckboxInput
              css={CheckboxInputStyle.normal}
              childrenPosition="start"
              checked={checked.includes(opt.value)}
              onChange={() => onCheck(opt.value)}
              value={opt.value}
              key={opt.value}
            >
              <div css={selectItemText}>
                {opt.text}
              </div>
            </CheckboxInput>)}
          
          </CheckboxInputGroup>
        </BottomSheetDialogBasic>
      </ModalPortal>
    }</UseBottomSheetState>
}
export default React.memo(ModalCheckbox) as typeof ModalCheckbox




const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`