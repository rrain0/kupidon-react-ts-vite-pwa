import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import Callback = TypeU.Callback




export type PreviewInfoProps = ClassStyle & Children & Puro<{
  isOpen: boolean
  close: Callback
}>
export const PreviewInfo = React.memo((props: PreviewInfoProps) => {
  const {
    isOpen = false,
    close,
  } = props
  
  return (
    <UseBottomSheetState isOpen={isOpen} onClose={close}>
      {props => (
        <ModalPortal>
          <BottomSheetBasic {...props.sheetProps}>
            <Content>
              Здесь будет подробная инфа
            </Content>
          </BottomSheetBasic>
        </ModalPortal>
      )}
    </UseBottomSheetState>
    /* <div
      data-display-name="PreviewInfo"
    >
      <>
      
      </>
    </div> */
  )
})
PreviewInfo.displayName = 'PreviewInfo'
export default PreviewInfo


const Content = styled.div`
  ${col};
  padding-bottom: 20px;
`