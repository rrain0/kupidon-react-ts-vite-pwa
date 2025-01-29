import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
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
    <UseBottomSheetState
      isOpen={isOpen}
      onClose={close}
      snapPoints={['30%', '50%', '80%', '100%']}
      defaultOpenIdx={1}
    >
      {props => (
        <BottomSheetFrame data-display-name="PreviewInfo">
          <BottomSheetBasic {...props.sheetProps}>
            <Content>
              Здесь будет подробная инфа
            </Content>
          </BottomSheetBasic>
        </BottomSheetFrame>
      )}
    </UseBottomSheetState>
  )
})
PreviewInfo.displayName = 'PreviewInfo'
export default PreviewInfo



const BottomSheetFrame = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  translate: -50%;
  width: var(--photo-w);
  height: calc(
    var(--h)
    - (var(--h) - var(--photos-h)) / 2
    - (var(--photos-h) - var(--photo-h))
  );
  z-index: 20;
  pointer-events: none;
`

const Content = styled.div`
  ${col};
  padding-bottom: 20px;
`