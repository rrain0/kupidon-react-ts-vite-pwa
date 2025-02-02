import styled from '@emotion/styled'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import RangePicker from 'src/ui/1-widgets/RangePicker/RangePicker.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { RangeU } from 'src/util/common/RangeU'
import Callback = TypeU.Callback
import col = EmotionCommon.col
import SetterOrUpdater = TypeU.SetterOrUpdater
import NumRange = RangeU.NumRange
import Txt = EmotionCommon.Txt
import PartialUndef = TypeU.PartialUndef




export type ModalRangePickerProps = {
  isOpen: boolean
  close: Callback
  title: string
  text: string
  
  range: NumRange
  setRange: SetterOrUpdater<NumRange>
  minMax: NumRange
} & PartialUndef<{
  children: React.ReactNode
}>



const ModalRangePicker = React.memo(
  (props: ModalRangePickerProps) => {
    const {
      isOpen, close,
      title, text,
      range, setRange, minMax,
      children,
    } = props
    
    
    
    
    return (
      <UseBottomSheetState isOpen={isOpen} onClose={close}>
        {sheetProps => (
          <ModalPortal>
            <BottomSheetBasic
              css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.Normal.normal)}
              {...sheetProps.sheetProps}
              title={title}
            >
              
              <Text>{text}</Text>
              
              <Content>
                
                {children}
                
                <RangePicker
                  range={range}
                  setRange={setRange}
                  minMax={minMax}
                />
                
              </Content>
              
            </BottomSheetBasic>
          </ModalPortal>
        )}
      </UseBottomSheetState>
    )
  }
)
export default ModalRangePicker



const Content = styled.div`
  ${col};
  gap: 20px;
  padding: 20px 10px 60px 10px;
`
const Text = styled.div`
  padding: 16px 0;
  ${Txt.lg24bold};
  text-align: center;
`
