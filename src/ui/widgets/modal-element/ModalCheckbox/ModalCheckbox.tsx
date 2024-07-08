import { css } from '@emotion/react'
import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import CheckboxInput from 'src/ui/elements/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/ui/elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
//import CheckboxInput from 'src/ui/elements/inputs/CheckboxInput/CheckboxInput0.tsx'
//import { CheckboxInputStyle } from 'src/ui/elements/inputs/CheckboxInput/CheckboxInputStyle.ts'
import CheckboxInputGroup from 'src/ui/elements/inputs/CheckboxInputGroup/CheckboxInputGroup.tsx'
import { Option } from 'src/ui/model/Option.ts'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import Callback = TypeU.Callback
import col = EmotionCommon.col
import Callback1 = TypeU.Callback1
import row = EmotionCommon.row




export type ModalCheckboxProps<V extends string> = {
  isOpen: boolean
  close: Callback
  title: string
  options: Option<V>[]
  checked: V[]
  onChange: Callback1<V>
}



const ModalCheckbox =
<V extends string>(props: ModalCheckboxProps<V>) => {
  const { isOpen, close, title, options, checked, onChange } = props
  
  return <UseBottomSheetState isOpen={isOpen} close={close}>
    {sheetProps =>
      <ModalPortal>
        <BottomSheetDialogBasic
          {...sheetProps.sheetProps}
          header={title}
        >
          
          
          {/* <CheckboxInputGroup css={selectItemsContainer}>
            
            {options.map(opt => <CheckboxInput
              css={CheckboxInputStyle.normal}
              childrenPosition="start"
              checked={checked.includes(opt.value)}
              onChange={() => onChange(opt.value)}
              value={opt.value}
              key={opt.value}
            >
              <div css={selectItemText}>
                {opt.text}
              </div>
            </CheckboxInput>)}
          
          </CheckboxInputGroup> */}
          
          
          <CheckboxInputGroup css={selectItemsContainer}>
            
            {options.map(opt => <CheckboxInput
              key={opt.value}
              css={CheckboxInputStyle.rectBigNormal}
              checked={checked.includes(opt.value)}
              onChange={() => onChange(opt.value)}
              value={opt.value}
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
  gap: 10px;
  padding-bottom: 20px;
`

const selectItemContainer = css`
  ${row};
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
`