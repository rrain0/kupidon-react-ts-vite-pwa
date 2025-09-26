import { css } from '@emotion/react'
import React, { useCallback, useState } from 'react'
import { useUiValues } from '@libs/ui-text/useUiText'
import { Option } from 'src/models/ui/Option.ts'
import { Sizes } from 'src/styles/Sizes.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText'
import { SelectItemS6 } from 'src/components/elems/select-item/SelectItem/SelectItemS6.ts'
import { SheetSnaps80 } from 'src/components/widgets/BottomSheet/useBottomSheet'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl'
import SelectItem from 'src/components/elems/select-item/SelectItem/SelectItem'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import ModalInput from 'src/components/widgets/modals/ModalInput/ModalInput'
import { ReactU } from 'src/utils/react/ReactU'

import { Cb } from '@utils/base/tsUtils.ts'
import { Setter } from '@utils/base/tsUtils.ts'
import col = EmotionCommon.col
import { Pu } from '@utils/base/tsUtils.ts'
import { isdef } from '@utils/base/tsUtils.ts'



const overlayEdit = 'edit'



type ModalSingleSelectListProps<T extends string> = {
  isOpen: boolean
  onClose: Cb
  title: string
  options: Option<T>[]
  selected: T
} & Pu<{
  setSelected: Setter<T>
  notSelectedValue: T
  add: T[]
  edit: T[]
  setOptionText: Setter<Option<T>>
  onCancel: Cb
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
      if (selected === id && isdef(notSelectedValue)) setSelected?.(notSelectedValue)
      else setSelected?.(id)
    }
    
    const hasOnClear = isdef(notSelectedValue)
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
      // if (isdef(customValue)) {
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
                        css={SelectItemS6.t(SelectItemS6.S.filled.rect.lg.normal)}
                        key={opt.id}
                        onClick={() => {
                          if (!isAdd) toggleSelected(opt.id)
                          if (isAdd && isEdit) openOptionEdit(opt)
                        }}
                        onClickEdit={() => openOptionEdit(opt)}
                        isSelected={isSelected}
                        isAdd={isAdd}
                        isEdit={isEdit}
                        //metersValues={opt.id === selected ? [true] : [false]}
                      >
                        {opt.text}
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
                
                <div style={{ height: 24 }}/>
              
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
