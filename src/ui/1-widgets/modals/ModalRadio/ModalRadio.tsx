import { css } from '@emotion/react'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import RadioInput from 'src/ui/0-elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import Callback = TypeU.Callback
import col = EmotionCommon.col
import Callback1 = TypeU.Callback1
import PartialUndef = TypeU.PartialUndef




export type ModalRadioProps<V extends string> = PartialUndef<{
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
    
    return <UseBottomSheetState isOpen={!!isOpen} close={close}>
      {sheetProps =>
        <ModalPortal>
          <BottomSheetDialogBasic
            {...sheetProps.sheetProps}
            header={title}
          >
            <RadioInputGroup css={selectItemsContainer}>
              {options?.map(opt => <RadioInput
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
                childrenPosition='end'
                checked={opt.value === value}
                onChange={() => onSelect?.(opt.value)}
                ref={undefined}
                value={opt.value}
                key={opt.value}
                onClick={sheetProps.setClosing}
              >
                <div css={selectItemText}>
                  {opt.text}
                </div>
              </RadioInput>)}
                {/* <div css={css`
                  height: 1px;
                  width: 100%;
                  background: black;
                `}/> */}
              
            
            </RadioInputGroup>
          </BottomSheetDialogBasic>
        </ModalPortal>
      }
    </UseBottomSheetState>
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
