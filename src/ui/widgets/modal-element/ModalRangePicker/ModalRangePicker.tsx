import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import React, { useState } from 'react'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetDialogBasic from 'src/ui/elements/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import RangePicker from 'src/ui/elements/RangePicker/RangePicker.tsx'
import { RangeNullable } from 'src/ui/model/RangeNullable.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import Callback = TypeUtils.Callback
import col = EmotionCommon.col





export type ModalRangePickerProps<V extends RangeNullable> = {
  isOpen: boolean
  close: Callback
  title: string
}



const ModalRangePicker =
<V extends RangeNullable>(props: ModalRangePickerProps<V>)=>{
  const { isOpen, close, title } = props
  
  const heightRange = [130, 230] as [number, number]
  
  const [range, setRange] = useState<[number, number]>([0, 100])
  
  return <UseBottomSheetState isOpen={isOpen} close={close}>
    {sheetProps =>
      <ModalPortal>
        <BottomSheetDialogBasic
          {...sheetProps.sheetProps}
          header={title}
        >
          <Content>
            <RangePicker
              minMax={[0, 100]}
              range={range}
              setRange={setRange}
            />
          </Content>
        </BottomSheetDialogBasic>
      </ModalPortal>
    }</UseBottomSheetState>
}
export default React.memo(ModalRangePicker) as typeof ModalRangePicker


const Content = styled.section`
  ${col};
  gap: 10px;
  padding: 20px 10px 40px 10px;
`

