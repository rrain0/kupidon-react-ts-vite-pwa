import { css } from '@emotion/react'
import React, { useMemo, useState } from 'react'
import { Option, OPTION_CUSTOM, OPTION_NOTHING } from 'src/ui-data/models/Option'
import { Sizes } from 'src/ui-data/Sizes'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl'
import SelectItem from 'src/ui/0-elements/selectable-items/SelectItem/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/0-elements/selectable-items/SelectItem/SelectItem/SelectItemS'
import SelectItemText from 'src/ui/0-elements/selectable-items/SelectItem/SelectItemText/SelectItemText'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic'
import ModalInput from 'src/ui/1-widgets/modals/ModalInput/ModalInput'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Setter = TypeU.Setter
import col = EmotionCommon.col
import Puro = TypeU.Puro
import noop = TypeU.noop



const overlayEdit = 'edit'



type ModalSingleSelectListProps<T extends string> = {
  isOpen: boolean
  close: Callback
  title: string
  
  options: Option<T>[]
  selected: T
  setSelected: Setter<T>
} & Puro<{
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
      customOptionText = '',
      setCustomOptionText = noop,
    } = props
    
    const canSelectNothing = useMemo(() => {
      return !!options.find(it => it.value === '')
    }, [options])
    
    const toggleSelected = (value: T) => {
      if (selected === value && canSelectNothing) setSelected(OPTION_NOTHING as any)
      else setSelected(value)
    }
    
    
    const defaultOption = useMemo(() => {
      if (canSelectNothing) return OPTION_NOTHING as T
      return options[0].value
    }, [options, canSelectNothing])
    
    
    const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayEdit)
    const [inputText, setInputText] = useState(customOptionText)
    const onEditClose = () => {
      closeEdit()
      setCustomOptionText(inputText)
      if (inputText) setSelected(OPTION_CUSTOM as T)
      if (selected === OPTION_CUSTOM && !inputText) setSelected(defaultOption)
    }
    
    
    return (
      <UseBottomSheetState
        isOpen={isOpen}
        close={close}
      >{ sheetProps => (
        <>
          
          <ModalPortal>
            <BottomSheetDialogBasic
              {...sheetProps.sheetProps}
              header={title}
            >
              <div css={selectItemsContainer}>
                {options.filter(opt => opt.value !== OPTION_NOTHING).map(opt => (
                  <SelectItem
                    css={SelectItemS.normal}
                    key={opt.value}
                    onClick={() => {
                      if (opt.value !== OPTION_CUSTOM) toggleSelected(opt.value)
                      if (opt.value === OPTION_CUSTOM && customOptionText) toggleSelected(opt.value)
                      if (opt.value === OPTION_CUSTOM && !customOptionText) openEdit()
                    }}
                    onClickEdit={openEdit}
                    isSelected={opt.value === selected}
                    isAdd={opt.value === OPTION_CUSTOM && !customOptionText}
                    isEdit={opt.value === OPTION_CUSTOM}
                    indicatorsSelection={opt.value === selected ? [true] : [false]}
                  >
                    <SelectItemText>
                      {(() => {
                        if (opt.value === OPTION_CUSTOM) return customOptionText
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
      )}</UseBottomSheetState>
    )
  }
)
export default ModalSingleSelectList



const selectItemsContainer = css`
  ${col};
  padding-bottom: ${Sizes.pb}px;
  gap: ${Sizes.g}px;
`
