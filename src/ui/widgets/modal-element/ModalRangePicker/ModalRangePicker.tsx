import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import React, { useCallback, useMemo, useState } from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/elements/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import RangePicker from 'src/ui/elements/RangePicker/RangePicker.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import Callback = TypeUtils.Callback
import col = EmotionCommon.col
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import NumRangeNullable = TypeUtils.NumRangeNullable
import NumRange = TypeUtils.NumRange
import Txt = EmotionCommon.Txt





export type ModalRangePickerProps = {
  isOpen: boolean
  close: Callback
  title: string
  text: string
  
  range: NumRange
  setRange: SetterOrUpdater<NumRange>
  minMax: NumRange
}



const ModalRangePicker =
React.memo(
(props: ModalRangePickerProps)=>{
  const {
    isOpen, close,
    title, text,
    range, setRange, minMax,
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


const Content = styled.section`
  ${col};
  gap: 10px;
  padding: 20px 10px 60px 10px;
`
const Text = styled.div`
  padding: 16px 0;
  ${Txt.large3b};
  text-align: center;
`
