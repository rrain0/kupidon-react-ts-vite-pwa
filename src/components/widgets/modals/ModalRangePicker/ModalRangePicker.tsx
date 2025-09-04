import styled from '@emotion/styled'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import React from 'react'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import RangePicker from 'src/components/widgets/RangePicker/RangePicker.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { Callback } from '@utils/base/math/typeUtils.ts'
import col = EmotionCommon.col
import { SetterOrUpdater } from '@utils/base/math/typeUtils.ts'
import { NumRange } from '@utils/base/math/rangeUtils.ts'
import Txt = EmotionCommon.Txt
import { Pu } from '@utils/base/math/typeUtils.ts'




export type ModalRangePickerProps = {
  isOpen: boolean
  close: Callback
  title: string
  text: string
  
  range: NumRange
  setRange: SetterOrUpdater<NumRange>
  minMax: NumRange
} & Pu<{
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
              css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
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
  ${Txt.s24Bold};
  text-align: center;
`
