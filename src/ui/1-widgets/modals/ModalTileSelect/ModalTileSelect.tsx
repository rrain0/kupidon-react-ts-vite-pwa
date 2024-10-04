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
import noop = TypeU.noop

const OPTION_CUSTOM = 'CUSTOM'

const overlayRemove = 'remove'



type ModalTileSelectProps<T extends string> = {
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

const ModalTileSelect = ReactU.memo(
  <T extends string>(props: ModalTileSelectProps<T>) => {
    
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
    
    const toggleSelected = (id: T) => {
      setSelected(ArrayU.toggleTo(selected, id))
    }
    
    
    const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayRemove)
    const [inputText, setInputText] = useState(customOptionText)
    const onEditClose = () => {
      closeEdit()
      setCustomOptionText(inputText)
      if (inputText) setSelected(ArrayU.pushUniqToIf(selected, OPTION_CUSTOM as T))
      else setSelected(ArrayU.removeToIf(selected, OPTION_CUSTOM as T))
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
                <div>ПОЗЖЕ ПЕРЕДЕЛАЮ НА ВЫБОР СЛОВ И МАЛЕНЬКИХ ОКРУГЛЫХ ПЛИТОК</div>
                <div css={selectItemsContainer}>
                  {options
                    .map((opt, i) => (
                      <SelectItem
                        css={SelectItemS.normal}
                        key={opt.id}
                        onClick={() => {
                          if (opt.id !== OPTION_CUSTOM) toggleSelected(opt.id)
                          if (opt.id === OPTION_CUSTOM && customOptionText) toggleSelected(opt.id)
                          if (opt.id === OPTION_CUSTOM && !customOptionText) openEdit()
                        }}
                        onClickEdit={openEdit}
                        isSelected={selected.includes(opt.id)}
                        isAdd={opt.id === OPTION_CUSTOM && !customOptionText}
                        isEdit={opt.id === OPTION_CUSTOM}
                        indicatorsSelection={options.map((it, i2) => {
                          if (!selected.includes(it.id)) return 0
                          //if (i !== i2) return 1
                          if (i !== i2) return 0
                          return 2
                        })}
                      >
                        <SelectItemText>
                          {(() => {
                            if (opt.id === OPTION_CUSTOM) return customOptionText
                            return opt.text
                          })()}
                        </SelectItemText>
                      </SelectItem>
                    ))
                  }
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
export default ModalTileSelect



const selectItemsContainer = css`
  ${col};
  padding-bottom: ${Sizes.pb}px;
  gap: ${Sizes.g}px;
`
