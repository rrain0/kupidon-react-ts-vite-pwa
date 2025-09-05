import { css } from '@emotion/react'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { ReactU } from 'src/utils/react/ReactU'

import React from 'react'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import RadioInput from 'src/components/elems/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/components/elems/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/components/elems/inputs/RadioInput/RadioInputStyle.ts'
import { Option } from 'src/models/ui/Option.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { Callback } from '@utils/base/typeUtils.ts'
import col = EmotionCommon.col
import { Callback1 } from '@utils/base/typeUtils.ts'
import { Pu } from '@utils/base/typeUtils.ts'




export type ModalRadioProps<V extends string> = Pu<{
  isOpen: boolean
  close: Callback
  title: string
  options: Option<V>[]
  value: V
  onSelect: Callback1<V>
}>



const ModalRadio = ReactU.memo(
  <V extends string>(props: ModalRadioProps<V>) => {
    const { isOpen, close, title, options, value, onSelect } = props
    
    return (
      <UseBottomSheetState isOpen={!!isOpen} onClose={close}>
        {sheetProps => (
          <ModalPortal>
            <BottomSheetBasic
              css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
              {...sheetProps.sheetProps}
              title={title}
            >
              <RadioInputGroup css={selectItemsContainer}>
                {options?.map(opt => (
                  <RadioInput
                    css={[
                      RadioInputStyle.radio,
                      css`
                      ${RadioInputStyle.El.frame} {
                        //padding: 12px 18px;
                        //background: #f2f2f2;
                      }
                      ${RadioInputStyle.El.border} {
                        //border: 1px solid #999999;
                      }
                    `,
                    ]}
                    childrenPosition="end"
                    checked={opt.id === value}
                    onChange={() => onSelect?.(opt.id)}
                    ref={undefined}
                    value={opt.id}
                    key={opt.id}
                    onClick={sheetProps.setClosing}
                  >
                    <div css={selectItemText}>
                      {opt.text}
                    </div>
                  </RadioInput>
                ))}
                {/* <div css={css`
                 height: 1px;
                 width: 100%;
                 background: black;
                 `}/> */}
              
              
              </RadioInputGroup>
            </BottomSheetBasic>
          </ModalPortal>
        )}
      </UseBottomSheetState>
    )
  }
)
export default ModalRadio




const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
  gap: 10px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`
