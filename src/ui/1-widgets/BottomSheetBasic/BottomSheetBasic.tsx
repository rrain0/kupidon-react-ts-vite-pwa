import { TypeU } from '@util/common/TypeU.ts'
import { css } from '@emotion/react'
import { BottomSheetS6 } from 'src/ui/1-widgets/BottomSheet/BottomSheetS6.ts'
import { BottomSheetBasicParts } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicParts.ts'
import BottomSheet, {
  BottomSheetOptionsProps,
} from 'src/ui/1-widgets/BottomSheet/BottomSheet.tsx'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import React, { useRef } from 'react'
import Puro = TypeU.Puro



export type BottomSheetBasicProps = BottomSheetOptionsProps & Puro<{
  headerHandle: React.ReactNode
  headerTitle: React.ReactNode
  children: React.ReactNode
}>



const BottomSheetBasic = React.memo((props: BottomSheetBasicProps) => {
  const { headerHandle, headerTitle, children, ...restProps } = props
  const { sheetState } = props
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  
  
  
  return (
    <BottomSheet
      css={BottomSheetS6.t(BottomSheetS6.S.Normal.normal)}
      {...restProps}
      bottomSheetFrameRef={bottomSheetFrameRef}
      bottomSheetRef={bottomSheetRef}
      bottomSheetHeaderRef={bottomSheetHeaderRef}
      bottomSheetContentRef={bottomSheetContentRef}
    >
      {({ sheetDrag }) => (
        <>
          {/*
           Header Component
           Must be without margins!!!
          */}
          <div
            data-display-name="Bottom Sheet Basic - Header"
            css={t => css`
              ${BottomSheetBasicParts.headerStyle(t)};
              ${sheetState === 'dragging' && 'cursor: grabbing;'}
            `}
            ref={bottomSheetHeaderRef}
            {...sheetDrag()}
          >
            
            {/* Header - Handle */}
            {headerHandle ?? (
              <div
                data-display-name="Bottom Sheet Basic - Header Handle"
                css={t => css`
                  ${BottomSheetBasicParts.headerHandleStyle(t)};
                  ${sheetState === 'dragging' && `background: ${t.page.ct2};`}
                `}
              />
            )}
            
            {/* Header - Title */}
            <div
              data-display-name="Bottom Sheet Basic - Header Title"
              css={BottomSheetBasicParts.headerTextStyle}
            >
              {headerTitle}
            </div>
          
          </div>
          
          {/*
           // Body Component
           // Must be without margins & paddings!!!
           */}
          <div
            data-display-name="Bottom Sheet Basic - Body"
            css={BottomSheetBasicParts.bodyStyle}
          >
            <OverflowWrapper css={OverflowWrapperStyle.defolt}
              showVertical={
                ![null, 'closed', 'close', 'closing', 'open', 'opening'].includes(sheetState)
              }
            >
              {/*
               Scrollable content
               Must be without margins!!!
              */}
              <div
                data-display-name="Bottom Sheet Basic - Scrollable Content"
                css={BottomSheetBasicParts.scrollableContentStyle}
                ref={bottomSheetContentRef}
              >
                { children }
              </div>
            </OverflowWrapper>
          </div>
        </>
      )}
    
    </BottomSheet>
  )
}
)
export default BottomSheetBasic



