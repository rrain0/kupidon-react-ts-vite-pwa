import styled from '@emotion/styled'
import React from 'react'
import { Option } from 'src/models/ui/Option.ts'
import { Sizes } from 'src/styles/Sizes.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { arrToggleTo } from '@utils/base/array/arrayUtils.ts'
import { ReactU } from 'src/utils/react/ReactU'
import { Cb } from '@utils/base/typeUtils.ts'
import { Setter } from '@utils/base/typeUtils.ts'
import { Pu } from '@utils/base/typeUtils.ts'
import { emptyArr } from '@utils/base/typeUtils.ts'
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
  onClose: Cb
  title: string
  options: Option<T>[]
} & Pu<{
  selected: T[]
  setSelected: Setter<T[]>
  onCancel: Cb
  onClear: Cb
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
      setSelected?.(arrToggleTo(selected, id))
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
