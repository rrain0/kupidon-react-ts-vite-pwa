import { css } from '@emotion/react'
import React, { useState } from 'react'
import { useUiValues } from '@libs/ui-text/useUiText'
import { Option } from 'src/models/ui/Option.ts'
import { Sizes } from 'src/styles/Sizes.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText'
import { SelectItemS6 } from 'src/components/elems/select-item/SelectItem/SelectItemS6.ts'
import SelectMeter
  from 'src/components/elems/select-item/SelectMeter/SelectMeter.tsx'
import { SelectMeterS6 } from 'src/components/elems/select-item/SelectMeter/SelectMeterS6.ts'
import { SheetSnaps80 } from 'src/components/widgets/BottomSheet/useBottomSheet'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'
import {
  getCommonIndicatorsDataDefault,
  GetIndicatorsData,
} from 'src/components/widgets/modals/ModalMultiSelectList/modalMultiSelectUtils'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl'
import SelectItem from 'src/components/elems/select-item/SelectItem/SelectItem'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import ModalInput from 'src/components/widgets/modals/ModalInput/ModalInput'
import { ReactU } from 'src/utils/react/ReactU'

import { Callback } from '@utils/base/math/typeUtils.ts'
import { Setter } from '@utils/base/math/typeUtils.ts'
import col = EmotionCommon.col
import { Pu } from '@utils/base/math/typeUtils.ts'
import { emptyArr } from '@utils/base/math/typeUtils.ts'
import { Callback1 } from '@utils/base/math/typeUtils.ts'



const overlayEdit = 'edit'

export type ModalMultiSelectListProps<T extends string> = {
  isOpen: boolean
  onClose: Callback
  title: string
  options: Option<T>[]
} & Pu<{
  selected: T[]
  add: T[]
  edit: T[]
  onSelect: Callback1<T>
  setOptionText: Setter<Option<T>>
  getIndicatorsData: GetIndicatorsData<T>
  onCancel: Callback
  onClear: Callback
}>

const ModalMultiSelectList = ReactU.memo(
  <T extends string>(props: ModalMultiSelectListProps<T>) => {
  
    const {
      isOpen,
      onClose,
      title,
      
      options,
      selected = emptyArr,
      add = emptyArr,
      edit = emptyArr,
      onSelect,
      setOptionText,
      getIndicatorsData,
      
      onCancel,
      onClear,
    } = props
    
    const actionText = useUiValues(ActionUiText)
    
    const toggleSelected = (id: T) => {
      onSelect?.(id)
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
                headerHandle={(
                  <SelectMeter
                    css={SelectMeterS6.t(SelectMeterS6.S.row.round.md.normal)}
                    metersValues={getCommonIndicatorsDataDefault(options, selected)}
                  />
                )}
                title={title}
              >
                <div css={selectItemsContainer}>
                  {options.map((opt, i) => {
                    const isSelected = selected.includes(opt.id)
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
                        metersValues={getIndicatorsData?.(options, opt, i, isSelected)}
                      >
                        {opt.text}
                      </SelectItem>
                    )
                  })}
                </div>
                
                <DialogButtons
                  position='center'
                  //onCancel={onCancel}
                  //onClear={onClear}
                  onAccept={onClose}
                  acceptVariant='filledRounded'
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
export default ModalMultiSelectList



const selectItemsContainer = css`
  ${col};
  padding-bottom: ${Sizes.pb}px;
  gap: ${Sizes.g}px;
`
