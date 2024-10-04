import { css } from '@emotion/react'
import React, { useState } from 'react'
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
import { ArrayU } from 'src/util/common/ArrayU'
import { ReactU } from 'src/util/common/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Setter = TypeU.Setter
import col = EmotionCommon.col
import Puro = TypeU.Puro
import Ro = TypeU.Ro
import emptyArr = TypeU.emptyArr



const overlayEdit = 'edit'



type ModalMultiSelectListProps<T extends string> = Ro<{
  isOpen: boolean
  close: Callback
  title: string
  options: Option<T>[]
}> & Puro<{
  selected: T[]
  add: T[]
  edit: T[]
  setSelected: Setter<T[]>
  setOptionText: Setter<Option<T>>
}>

const ModalMultiSelectList = ReactU.memo(
  <T extends string>(props: ModalMultiSelectListProps<T>) => {
    
    const {
      isOpen,
      close,
      title,
      
      options,
      selected = emptyArr,
      add = emptyArr,
      edit = emptyArr,
      setSelected,
      setOptionText,
    } = props
    
    const toggleSelected = (id: T) => {
      setSelected?.(ArrayU.toggleTo(selected, id))
    }
    
    
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
      // if (editableText) setSelected?.(ArrayU.pushUniqToIf(selected, v))
      // else setSelected?.(ArrayU.removeToIf(selected, v))
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
                  {options.map((opt, i) => {
                    const isSelected = selected.includes(opt.id)
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
                        indicatorsSelection={options.map((it, i2) => {
                          if (!isSelected) return false
                          //if (i !== i2) return 1
                          if (i !== i2) return false
                          return true
                        })}
                      >
                        <SelectItemText>
                          {opt.text}
                        </SelectItemText>
                      </SelectItem>
                    )
                  })}
                </div>
              
              </BottomSheetDialogBasic>
            </ModalPortal>
            
            
            <ModalInput
              isOpen={isEditOpen}
              onClose={onEditClose}
              onClear={() => setEditableText('')}
              id={editableText}
              onChange={ev => setEditableText(ev.currentTarget.value)}
              title={title}
            />
            
          </>
        )}
      </UseBottomSheetState>
    )
  }
)
export default ModalMultiSelectList



const selectItemsContainer = css`
  ${col};
  padding-bottom: ${Sizes.pb}px;
  gap: ${Sizes.g}px;
`
