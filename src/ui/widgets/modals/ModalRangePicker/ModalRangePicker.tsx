import styled from '@emotion/styled'
import { TypeU } from 'src/util/common/TypeU.ts'
import React from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import RangePicker from 'src/ui/widgets/RangePicker/RangePicker.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
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



const ModalRangePicker =
React.memo(
(props: ModalRangePickerProps) => {
  const {
    isOpen, close,
    title, text,
    range, setRange, minMax,
    children,
  } = props
  
  
  
  
  return <UseBottomSheetState isOpen={isOpen} close={close}>
    {sheetProps =>
      <ModalPortal>
        <BottomSheetDialogBasic
          {...sheetProps.sheetProps}
          header={title}
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
          
        </BottomSheetDialogBasic>
      </ModalPortal>
    }</UseBottomSheetState>
})
export default ModalRangePicker



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
