import { css } from '@emotion/react'
import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option'
import { Sizes } from 'src/ui-data/Sizes'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl'
import SelectItem from 'src/ui/0-elements/select-item/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/0-elements/select-item/SelectItem/SelectItemS'
import SelectItemText from 'src/ui/0-elements/select-item/SelectItemText/SelectItemText'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic'
import ModalInput from 'src/ui/1-widgets/modals/ModalInput/ModalInput'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Setter = TypeU.Setter
import col = EmotionCommon.col
import Ro = TypeU.Ro
import Puro = TypeU.Puro
import noop = TypeU.noop
import exists = TypeU.exists



const overlayEdit = 'edit'



type ModalSingleSelectListProps<T extends string> = Ro<{
  isOpen: boolean
  close: Callback
  title: string
  
  options: Option<T>[]
  selected: T
  setSelected: Setter<T>
  
  notSelectedValue?: T | undefined
  customValue?: T | undefined
}> & Puro<{
  customOptionText: string
  setCustomOptionText: Setter<string>
}>

const ModalSingleSelectList = ReactU.memo(
  <T extends string>(props: ModalSingleSelectListProps<T>) => {
    
    const {
      isOpen,
      close,
      title,
      
      options,
      selected,
      setSelected,
      
      notSelectedValue,
      customValue,
      
      customOptionText = '',
      setCustomOptionText = noop,
    } = props
    
    const toggleSelected = (value: T) => {
      if (selected === value && exists(notSelectedValue)) setSelected(notSelectedValue)
      else setSelected(value)
    }
    
    
    const defaultOption = useMemo(() => {
      if (exists(notSelectedValue)) return notSelectedValue
      return options[0].value
    }, [options, notSelectedValue])
    
    
    const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayEdit)
    const [inputText, setInputText] = useState(customOptionText)
    const onEditClose = () => {
      closeEdit()
      setCustomOptionText(inputText)
      if (exists(customValue)) {
        if (inputText) setSelected(customValue)
        if (selected === customValue && !inputText) setSelected(defaultOption)
      }
    }
    
    
    return (
      <UseBottomSheetState
        isOpen={isOpen}
        close={close}
      >
        { sheetProps => (
          <>
            
            <ModalPortal>
              <BottomSheetDialogBasic
                {...sheetProps.sheetProps}
                header={title}
              >
                <div css={selectItemsContainer}>
                  {options.filter(opt => opt.value !== notSelectedValue).map(opt => (
                    <SelectItem
                      css={SelectItemS.normal}
                      key={opt.value}
                      onClick={() => {
                        if (opt.value !== customValue) toggleSelected(opt.value)
                        if (opt.value === customValue && customOptionText) toggleSelected(opt.value)
                        if (opt.value === customValue && !customOptionText) openEdit()
                      }}
                      onClickEdit={openEdit}
                      isSelected={opt.value === selected}
                      isAdd={opt.value === customValue && !customOptionText}
                      isEdit={opt.value === customValue}
                      indicatorsSelection={opt.value === selected ? [true] : [false]}
                    >
                      <SelectItemText>
                        {(() => {
                          if (opt.value === customValue) return customOptionText
                          return opt.text
                        })()}
                      </SelectItemText>
                    </SelectItem>
                  ))}
                </div>
              
              </BottomSheetDialogBasic>
            </ModalPortal>
            
            
            <ModalInput
              isOpen={isEditOpen}
              onClose={onEditClose}
              onClear={() => setInputText('')}
              value={inputText}
              onChange={ev => setInputText(ev.currentTarget.value)}
              title={title}
            />
          
          </>
        )}
      </UseBottomSheetState>
    )
  }
)
export default ModalSingleSelectList



const selectItemsContainer = css`
  ${col};
  padding-bottom: ${Sizes.pb}px;
  gap: ${Sizes.g}px;
`
