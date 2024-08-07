import { css } from '@emotion/react'
import React, { useMemo, useState } from 'react'
import { Option, OPTION_CUSTOM, OPTION_NOTHING } from 'src/ui-data/models/Option'
import { Sizes } from 'src/ui-data/Sizes'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl'
import SelectItem from 'src/ui/elements/inputs/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/elements/inputs/SelectItem/SelectItemS'
import SelectItemText from 'src/ui/elements/inputs/SelectItem/SelectItemText/SelectItemText'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState'
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic'
import ModalInput from 'src/ui/widgets/modals/ModalInput/ModalInput'
import { ArrayU } from 'src/util/common/ArrayU'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Setter = TypeU.Setter
import col = EmotionCommon.col
import Puro = TypeU.Puro
import noop = TypeU.noop



const overlayEdit = 'edit'



type ModalMultiSelectListProps<T extends string> = {
  isOpen: boolean
  close: Callback
  title: string
  
  options: Option<T>[]
  selected: T[]
  setSelected: Setter<T[]>
} & Puro<{
  customOptionText: string
  setCustomOptionText: Setter<string>
}>

const ModalMultiSelectList = ReactU.memo(
  <T extends string>(props: ModalMultiSelectListProps<T>) => {
    
    const {
      isOpen,
      close,
      title,
      options,
      selected,
      setSelected,
      customOptionText = '',
      setCustomOptionText = noop,
    } = props
    
    const toggleSelected = (value: T) => {
      setSelected(ArrayU.toggleTo(selected, value))
    }
    
    
    const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayEdit)
    const [inputText, setInputText] = useState(customOptionText)
    const onEditClose = () => {
      closeEdit()
      setCustomOptionText(inputText)
      if (inputText) setSelected(ArrayU.pushUniqToIf(selected, OPTION_CUSTOM as T))
      else setSelected(ArrayU.removeToIf(selected, OPTION_CUSTOM as T))
    }
    
    
    return (
      <>
        
        <UseBottomSheetState
          isOpen={isOpen}
          close={close}
        >{ sheetProps => (
          <ModalPortal>
            <BottomSheetDialogBasic
              {...sheetProps.sheetProps}
              header={title}
            >
              <div css={selectItemsContainer}>
                {options
                  .filter(opt => opt.value !== OPTION_NOTHING)
                  .map((opt, i) => (
                    <SelectItem
                      css={SelectItemS.normal}
                      key={opt.value}
                      onClick={() => {
                        if (opt.value !== OPTION_CUSTOM) toggleSelected(opt.value)
                        if (opt.value === OPTION_CUSTOM && customOptionText) toggleSelected(opt.value)
                        if (opt.value === OPTION_CUSTOM && !customOptionText) openEdit()
                      }}
                      onClickEdit={openEdit}
                      isSelected={selected.includes(opt.value)}
                      isAdd={opt.value === OPTION_CUSTOM && !customOptionText}
                      isEdit={opt.value === OPTION_CUSTOM}
                      indicatorsSelection={options.map((it, i2) => {
                        if (!selected.includes(it.value)) return 0
                        //if (i !== i2) return 1
                        if (i !== i2) return 0
                        return 2
                      })}
                    >
                      <SelectItemText>
                        {(() => {
                          if (opt.value === OPTION_CUSTOM) return customOptionText
                          return opt.text
                        })()}
                      </SelectItemText>
                    </SelectItem>
                  ))
                }
              </div>
            
            </BottomSheetDialogBasic>
          </ModalPortal>
        )}</UseBottomSheetState>
        
        
        <ModalInput
          isOpen={isEditOpen}
          onClose={onEditClose}
          onClear={() => setInputText('')}
          value={inputText}
          onChange={ev => setInputText(ev.currentTarget.value)}
          title={title}
        />
      
      </>
    )
  }
)
export default ModalMultiSelectList



const selectItemsContainer = css`
  ${col};
  padding-bottom: ${Sizes.pb}px;
  gap: ${Sizes.g}px;
`
