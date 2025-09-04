import { css } from '@emotion/react'
import { ReactU } from '@utils/react/ReactU.ts'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'

import React from 'react'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import CheckboxInput from 'src/components/elems/inputs/CheckboxInput/CheckboxInput.tsx'
import { CheckboxInputStyle } from 'src/components/elems/inputs/CheckboxInput/CheckboxInputStyle.ts'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import CheckboxInputGroup from 'src/components/elems/inputs/CheckboxInputGroup/CheckboxInputGroup.tsx'
import { Option } from 'src/models/ui/Option.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { Callback } from '@utils/base/math/typeUtils.ts'
import col = EmotionCommon.col
import { Callback1 } from '@utils/base/math/typeUtils.ts'
import row = EmotionCommon.row




export type ModalCheckboxProps<V extends string> = {
  isOpen: boolean
  close: Callback
  title: string
  options: Option<V>[]
  checked: V[]
  onChange: Callback1<V>
}



const ModalCheckbox = ReactU.memo(<V extends string>(props: ModalCheckboxProps<V>) => {
  const { isOpen, close, title, options, checked, onChange } = props
  
  return (
    <UseBottomSheetState isOpen={isOpen} onClose={close}>
      {sheetProps => (
        <ModalPortal>
          <BottomSheetBasic
            css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
            {...sheetProps.sheetProps}
            title={title}
          >
            
            
            <CheckboxInputGroup css={selectItemsContainer}>
              
              {options.map(opt => (
                <CheckboxInput
                  key={opt.id}
                  css={CheckboxInputStyle.rectBigNormal}
                  checked={checked.includes(opt.id)}
                  onChange={() => onChange(opt.id)}
                  value={opt.id}
                >
                  <div css={selectItemText}>
                    {opt.text}
                  </div>
                </CheckboxInput>
              ))}
            
            </CheckboxInputGroup>
          
          
          </BottomSheetBasic>
        </ModalPortal>
      )}
    </UseBottomSheetState>
  )
})
export default ModalCheckbox




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
