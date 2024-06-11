import BottomSheet from 'src/ui/widgets/BottomSheet/BottomSheet.tsx'
import { css } from '@emotion/react'
import { BottomSheetBasicParts } from 'src/ui/widgets/BottomSheetBasic/BottomSheetBasicParts.ts'
import {
  BottomSheetDialogBasicProps
} from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import OverflowWrapper from 'src/ui/widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/widgets/Scrollbars/OverflowWrapperStyle.ts'
import React, { useRef } from 'react'









const BottomSheetBasic =
  React.memo(
    (props: BottomSheetDialogBasicProps)=>{
      
      const { header, children, ...restProps } = props
      const { sheetState } = props
      
      
      const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
      const bottomSheetRef = useRef<HTMLDivElement>(null)
      const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
      const bottomSheetContentRef = useRef<HTMLDivElement>(null)
      
      
      
      
      return <BottomSheet
        {...restProps}
        bottomSheetFrameRef={bottomSheetFrameRef}
        bottomSheetRef={bottomSheetRef}
        bottomSheetHeaderRef={bottomSheetHeaderRef}
        bottomSheetContentRef={bottomSheetContentRef}
      >
        {({ sheetDrag })=><>
          {/*
           // Header Component
           // Must be without margins!!!
           */}
          <div css={t=>css`
        ${BottomSheetBasicParts.headerStyle(t)};
        ${sheetState==='dragging' && css`cursor: grabbing;`}
      `}
            ref={bottomSheetHeaderRef as any}
            {...sheetDrag()}
          >
            
            <div /* Header handle */ css={t=>css`
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
      
      </BottomSheet>
    })
export default BottomSheetBasic



