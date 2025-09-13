import styled from '@emotion/styled'
import { useUiValues } from '@libs/ui-text/useUiText'
import { ActionUiText } from 'src/locales/translations/ActionUiText'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import DialogButtons from 'src/components/widgets/modals/DialogButtons'
import Slider from 'src/components/widgets/Slider/Slider'
import React from 'react'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { Cb } from '@utils/base/typeUtils.ts'
import col = EmotionCommon.col
import { Setter } from '@utils/base/typeUtils.ts'
import { NumRange } from '@utils/base/math/rangeUtils.ts'
import Txt = EmotionCommon.Txt
import { Pu } from '@utils/base/typeUtils.ts'




export type ModalSliderProps = {
  isOpen: boolean
  onClose: Cb
  title: string
  text: string
  
  value: number
  setValue: Setter<number>
  minMax: NumRange
} & Pu<{
  children: React.ReactNode
  onValueDragEnd: Setter<number>
  isHideBar: boolean
  onClear: Cb
  onCancel: Cb
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
