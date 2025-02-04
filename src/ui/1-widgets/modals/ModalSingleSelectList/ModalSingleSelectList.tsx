import { css } from '@emotion/react'
import React, { useCallback, useState } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { Option } from 'src/ui-data/models/Option'
import { Sizes } from 'src/ui-data/Sizes'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import { SheetSnaps80 } from 'src/ui/1-widgets/BottomSheet/useBottomSheet'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import { useOverlayUrl } from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl'
import SelectItem from 'src/ui/0-elements/select-item/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/0-elements/select-item/SelectItem/SelectItemS'
import SelectItemText from 'src/ui/0-elements/select-item/SelectItemText/SelectItemText'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import ModalInput from 'src/ui/1-widgets/modals/ModalInput/ModalInput'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Setter = TypeU.Setter
import col = EmotionCommon.col
import Ro = TypeU.Ro
import Puro = TypeU.Puro
import exists = TypeU.exists



const overlayEdit = 'edit'



type ModalSingleSelectListProps<T extends string> = Ro<{
  isOpen: boolean
  onClose: Callback
  title: string
  options: Option<T>[]
  selected: T
}> & Puro<{
  setSelected: Setter<T>
  notSelectedValue: T
  add: T[]
  edit: T[]
  setOptionText: Setter<Option<T>>
  onCancel: Callback
}>

const ModalSingleSelectList = ReactU.memo(
  <T extends string>(props: ModalSingleSelectListProps<T>) => {
    
    const {
      isOpen,
      onClose,
      title,
      
      options,
      selected,
      setSelected,
      
      notSelectedValue,
      add = [],
      edit = [],
      setOptionText,
      
      onCancel,
    } = props
    
    const actionText = useUiValues(ActionUiText)
    
    const toggleSelected = (id: T) => {
      if (selected === id && exists(notSelectedValue)) setSelected?.(notSelectedValue)
      else setSelected?.(id)
    }
    
    const hasOnClear = exists(notSelectedValue)
    const onClear = useCallback(() => {
      if (hasOnClear) setSelected?.(notSelectedValue)
    }, [hasOnClear, setSelected])
    
    const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayEdit)
    
    const [editableValue, setEditableValue] = useState<T | undefined>(undefined)
    const [editableText, setEditableText] = useState('')
    
    const openOptionEdit = (opt: Option<T>) => {
      setEditableValue(opt.id)
      setEditableText(opt.text)
      openEdit()
    }
    
    const onEditClose = () => {
      const v = editableValue!
      closeEdit()
      setOptionText?.({ id: v!, text: editableText })
      // if (exists(customValue)) {
      //   if (editableText) setSelected?.(customValue)
      //   if (selected === customValue && !editableText) setSelected?.(defaultOption)
      // }
    }
    
    
    return (
      <UseBottomSheetState
        isOpen={isOpen}
        onClose={onClose}
        {...SheetSnaps80}
      >
        { sheetProps => (
          <>
            
            <ModalPortal>
              <BottomSheetBasic
                css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
                {...sheetProps.sheetProps}
                title={title}
              >
                
                <div css={selectItemsContainer}>
                  {options.filter(opt => opt.id !== notSelectedValue).map(opt => {
                    const isSelected = selected === opt.id
                    const isAdd = add.includes(opt.id)
                    const isEdit = edit.includes(opt.id)
                    return (
                      <SelectItem
                        css={SelectItemS.normal}
                        key={opt.id}
                        onClick={() => {
                          if (!isAdd) toggleSelected(opt.id)
                          if (isAdd && isEdit) openOptionEdit(opt)
                        }}
                        onClickEdit={() => openOptionEdit(opt)}
                        isSelected={isSelected}
                        isAdd={isAdd}
                        isEdit={isEdit}
                        //indicatorsSelection={opt.id === selected ? [true] : [false]}
                      >
                        <SelectItemText>
                          {opt.text}
                        </SelectItemText>
                      </SelectItem>
                    )
                  })}
                </div>
                
                <DialogButtons
                  position="center"
                  //onCancel={onCancel}
                  //onClear={onClear}
                  onAccept={onClose}
                  acceptVariant="filledRounded"
                />
                
                <div style={{ height: 24 }} />
              
              </BottomSheetBasic>
            </ModalPortal>
            
            
            <ModalInput
              isOpen={isEditOpen}
              onClose={onEditClose}
              onClear={() => setEditableText('')}
              value={editableText}
              onChange={ev => setEditableText(ev.currentTarget.value)}
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
