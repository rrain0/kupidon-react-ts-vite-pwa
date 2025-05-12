import styled from '@emotion/styled'
import React from 'react'
import { Option } from 'src/ui-data/models/Option'
import { Sizes } from 'src/ui-data/Sizes'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import ModalPortal from 'src/ui/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { ArrayU } from 'src/util/common/ArrayU'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Callback = TypeU.Callback
import Setter = TypeU.Setter
import Pu = TypeU.Pu
import emptyArr = TypeU.emptyArr
import Txt = EmotionCommon.Txt
import rowWrap = EmotionCommon.rowWrap



/*
TODO
  1) Добавить масимальное кол-во выбранного.
  Если попытаться выбрать больше, то сделать ещё 1 шторку с предложением убрать ненужное
  2) Сделать поиск
 */



const overlayRemove = 'remove'



type ModalTileSelectProps<T extends string> = {
  isOpen: boolean
  onClose: Callback
  title: string
  options: Option<T>[]
} & Pu<{
  selected: T[]
  setSelected: Setter<T[]>
  onCancel: Callback
  onClear: Callback
}>

const ModalTileSelect = ReactU.memo(
  <T extends string>(props: ModalTileSelectProps<T>) => {
    const {
      isOpen,
      onClose,
      title,
      
      options,
      selected = emptyArr,
      setSelected,
      
      onCancel,
      onClear,
    } = props
    
    
    const toggleSelected = (id: T) => {
      setSelected?.(ArrayU.toggleTo(selected, id))
    }
    
    
    //const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useOverlayUrl(overlayRemove)
    
    
    
    return (
      <UseBottomSheetState
        isOpen={isOpen}
        onClose={onClose}
      >
        { sheetProps => (
          <>
            
            <ModalPortal>
              <BottomSheetBasic
                css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
                {...sheetProps.sheetProps}
                title={title}
              >
                
                <SearchStub>{`<Здесь будет поиск>`}</SearchStub>
                
                <ItemsBox>
                  {options.map((opt, i) => {
                    return (
                      <Tile
                        key={opt.id}
                        onClick={() => toggleSelected(opt.id)}
                        isSelected={selected.includes(opt.id)}
                      >
                        {opt.text}
                      </Tile>
                    )
                  })}
                </ItemsBox>
                
                <div style={{ height: 24 }}/>
                
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
          
          </>
        )}
      </UseBottomSheetState>
    )
  }
)
export default ModalTileSelect



const ItemsBox = styled.div`
  ${rowWrap};
  justify-content: space-around;
  gap: ${Sizes.g}px;
`

const SearchStub = styled.div`
  align-self: center;
  padding: ${Sizes.g}px;
`

const Tile = React.memo(styled.div<Pu<{ isSelected: boolean }>>`
  padding: 4px ${Sizes.g}px;
  border-radius: 999999px;
  ${Txt.s16Thin};
  ${p => p.isSelected && `
    background-color: ${p.theme.boxDefault9.bg};
    color: ${p.theme.boxDefault9.ct};
  `}
  cursor: pointer;
`)
