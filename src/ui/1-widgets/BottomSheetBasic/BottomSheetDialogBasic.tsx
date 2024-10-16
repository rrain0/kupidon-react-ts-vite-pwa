import { TypeU } from '@util/common/TypeU.ts'
import BottomSheetDialog, { BottomSheetOptionsProps } from 'src/ui/1-widgets/BottomSheet/BottomSheetDialog.tsx'
import { css } from '@emotion/react'
import { BottomSheetBasicParts } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicParts.ts'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import React, { useRef } from 'react'
import Puro = TypeU.Puro



export type BottomSheetDialogBasicProps = BottomSheetOptionsProps & Puro<{
  headerHandle: React.ReactNode
  headerTitle: React.ReactNode
  children: React.ReactNode
}>



const BottomSheetDialogBasic = React.memo(
  (props: BottomSheetDialogBasicProps) => {
    
    const { headerHandle, headerTitle, children, ...restProps } = props
    const { sheetState } = props
    
    
    const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
    const bottomSheetRef = useRef<HTMLDivElement>(null)
    const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
    const bottomSheetContentRef = useRef<HTMLDivElement>(null)
    
    
    
    
    return (
      <BottomSheetDialog
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
              css={t => css`
                ${BottomSheetBasicParts.headerStyle(t)};
                ${sheetState === 'dragging' && 'cursor: grabbing;'}
              `}
              ref={bottomSheetHeaderRef}
              {...sheetDrag()}
            >
              
              {/* Header - Handle */}
              { headerHandle ?? (
                <div
                  css={t => css`
                    ${BottomSheetBasicParts.headerHandleStyle(t)};
                    ${sheetState === 'dragging' && `background: ${t.page.content2[0]};`}
                  `}
                />
              )}
              
              {/* Header - Title */}
              <div css={BottomSheetBasicParts.headerTextStyle}>
                {headerTitle}
              </div>
            
            </div>
            
            {/*
             // Body Component
             // Must be without margins & paddings!!!
             */}
            <div css={BottomSheetBasicParts.bodyStyle}>
              <OverflowWrapper css={OverflowWrapperStyle.defolt}
                showVertical={
                  ![null, 'closed', 'close', 'closing', 'open', 'opening'].includes(sheetState)
                }
              >
                {/*
                 Scrollable content
                 Must be without margins!!!
                */}
                <div css={BottomSheetBasicParts.scrollableContentStyle}
                  ref={bottomSheetContentRef}
                >
                  { children }
                </div>
              </OverflowWrapper>
            </div>
          </>
        )}
      
      </BottomSheetDialog>
    )
  }
)
export default BottomSheetDialogBasic



