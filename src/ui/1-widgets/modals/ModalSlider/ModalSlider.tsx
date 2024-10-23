import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import Slider from 'src/ui/1-widgets/Slider/Slider'
import { TypeU } from 'src/util/common/TypeU.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import { ModalElement } from 'src/ui/1-widgets/modals/ModalElement.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { RangeU } from 'src/util/common/RangeU'
import Callback = TypeU.Callback
import col = EmotionCommon.col
import Setter = TypeU.Setter
import NumRange = RangeU.NumRange
import Txt = EmotionCommon.Txt
import Puro = TypeU.Puro
import Button from 'ui/0-elements/buttons/Button/Button'




export type ModalSliderProps = {
  isOpen: boolean
  onClose: Callback
  title: string
  text: string
  
  value: number
  setValue: Setter<number>
  minMax: NumRange
} & Puro<{
  children: React.ReactNode
  onValueDragEnd: Setter<number>
  isHideBar: boolean
  onClear: Callback
  onCancel: Callback
}>



const ModalSlider = React.memo(
  (props: ModalSliderProps) => {
    const {
      isOpen,
      onClose,
      title,
      text,
      value,
      setValue,
      minMax,
      onValueDragEnd,
      isHideBar,
      onClear,
      onCancel,
      children,
    } = props
    
    
    const actionText = useUiValues(ActionUiText)
    
    
    return (
      <UseBottomSheetState isOpen={isOpen} onClose={onClose}>
        {sheetProps => (
          <ModalPortal>
            <BottomSheetDialogBasic
              {...sheetProps.sheetProps}
              headerTitle={title}
            >
              
              <Text>{text}</Text>
              
              <Content>
                
                {children}
                
                <Slider
                  value={value}
                  setValue={setValue}
                  minMax={minMax}
                  onValueDragEnd={onValueDragEnd}
                  isHideBar={isHideBar}
                />
                
                <DialogButtons
                  //onCancel={onCancel}
                  //onClear={onClear}
                  onOk={onClose}
                />
                
              </Content>
              
            </BottomSheetDialogBasic>
          </ModalPortal>
        )}
      </UseBottomSheetState>
    )
  }
)
export default ModalSlider



const Content = styled.div`
  ${col};
  gap: 20px;
  padding: 20px 10px 60px 10px;
`
const Text = styled.div`
  padding: 16px 0;
  ${Txt.large3b};
  text-align: center;
`
