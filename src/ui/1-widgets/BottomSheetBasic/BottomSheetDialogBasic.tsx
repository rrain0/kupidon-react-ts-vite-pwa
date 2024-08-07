import { TypeU } from '@util/common/TypeU.ts'
import BottomSheetDialog, { BottomSheetOptionsProps } from 'src/ui/1-widgets/BottomSheet/BottomSheetDialog.tsx'
import { css } from '@emotion/react'
import { BottomSheetBasicParts } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicParts.ts'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import React, { useRef } from 'react'
import PartialUndef = TypeU.PartialUndef







export type BottomSheetDialogBasicProps =
  BottomSheetOptionsProps & PartialUndef<{
    header: React.ReactNode
    children: React.ReactNode
  }>



const BottomSheetDialogBasic =
React.memo(
(props: BottomSheetDialogBasicProps) => {
  
  const { header, children, ...restProps } = props
  const { sheetState } = props
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  
  
  
  return <BottomSheetDialog
    {...restProps}
    bottomSheetFrameRef={bottomSheetFrameRef}
    bottomSheetRef={bottomSheetRef}
    bottomSheetHeaderRef={bottomSheetHeaderRef}
    bottomSheetContentRef={bottomSheetContentRef}
  >
    {({ sheetDrag }) => <>
      {/*
       // Header Component
       // Must be without margins!!!
       */}
      <div css={t => css`
        ${BottomSheetBasicParts.headerStyle(t)};
        ${sheetState==='dragging' && css`cursor: grabbing;`}
      `}
        ref={bottomSheetHeaderRef as any}
        {...sheetDrag()}
      >
        
        <div /* Header handle */ css={t => css`
          ${BottomSheetBasicParts.headerHandleStyle(t)};
          ${sheetState==='dragging' && css`background: ${t.page.content2[0]};`}
        `}/>
        
        <div css={BottomSheetBasicParts.headerTextStyle}>
          {header}
        </div>
      
      </div>
      
      {/*
       // Body Component
       // Must be without margins & paddings!!!
       */}
      <div css={BottomSheetBasicParts.bodyStyle}>
        <OverflowWrapper css={OverflowWrapperStyle.defolt}
          showVertical={
            ![null,'closed','close','closing','open','opening'].includes(sheetState)
          }
        >
          {/*
           // scrollable content
           // Must be without margins!!!
           */}
          <div css={BottomSheetBasicParts.scrollableContentStyle}
            ref={bottomSheetContentRef as any}
          >
            { children }
          </div>
        </OverflowWrapper>
      </div>
    </>}
    
  </BottomSheetDialog>
})
export default BottomSheetDialogBasic



