import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { ActionUiText } from 'src/locales/translations/ActionUiText'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/ui/1-widgets/modals/DialogButtons'
import Slider from 'src/ui/1-widgets/Slider/Slider'
import { TypeU } from 'src/utils/common/TypeU.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { RangeU } from 'src/utils/common/RangeU'
import Callback = TypeU.Callback
import col = EmotionCommon.col
import Setter = TypeU.Setter
import NumRange = RangeU.NumRange
import Txt = EmotionCommon.Txt
import Pu = TypeU.Pu




export type ModalSliderProps = {
  isOpen: boolean
  onClose: Callback
  title: string
  text: string
  
  value: number
  setValue: Setter<number>
  minMax: NumRange
} & Pu<{
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
            <BottomSheetBasic
              css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
              {...sheetProps.sheetProps}
              title={title}
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
                  position="center"
                  //onCancel={onCancel}
                  //onClear={onClear}
                  onAccept={onClose}
                  acceptVariant="filledRounded"
                />
                
              </Content>
              
            </BottomSheetBasic>
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
  ${Txt.s24Bold};
  text-align: center;
`
