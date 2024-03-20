/** @jsxImportSource @emotion/react */
import { useFakePointerRef } from 'src/components/ActionProviders/UseFakePointerRef'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { AppTheme } from 'src/utils/theme/AppTheme'
import BottomSheet, { BottomSheetOptionsProps } from 'src/views/BottomSheet/BottomSheet'
import { css } from '@emotion/react'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import React, { useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import center = EmotionCommon.center
import PartialUndef = TypeUtils.PartialUndef







export type BottomSheetBasicProps =
  BottomSheetOptionsProps & PartialUndef<{
    header: React.ReactNode
    children: React.ReactNode
  }>



const BottomSheetBasic =
React.memo(
(props: BottomSheetBasicProps)=>{
  
  const { header, children, ...restProps } = props
  const sheetState = props.sheetState
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  useFakePointerRef(bottomSheetHeaderRef)
  
  
  
  
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
        ${headerStyle(t)};
        ${sheetState==='dragging' && css`cursor: grabbing;`}
      `}
        ref={bottomSheetHeaderRef as any}
        {...sheetDrag()}
      >
        
        <div /* Header handle */ css={t=>css`
          ${headerHandleStyle(t)};
          ${sheetState==='dragging' && css`background: ${t.page.content2[0]};`}
        `}/>
        
        <div css={headerTextStyle}>
          {header}
        </div>
      
      </div>
      
      {/*
       // Body Component
       // Must be without margins & paddings!!!
       */}
      <div css={bodyStyle}>
        <OverflowWrapper css={OverflowWrapperStyle.defolt}
          showVertical={
            ![null,'closed','close','closing','open','opening'].includes(sheetState)
          }
        >
          {/*
           // scrollable content
           // Must be without margins!!!
           */}
          <div css={scrollableContentStyle}
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




const headerStyle = (t: AppTheme.Theme)=>css`
  background: ${t.bottomSheet.bgc[0]};
  border-radius: 16px 16px 0 0;
  color: ${t.page.content2[0]};
  padding: 10px;
  ${col};
  align-items: center;
  gap: 6px;
  touch-action: none;
  cursor: grab;
`
const headerHandleStyle = (t: AppTheme.Theme)=>css`
  width: 44px;
  height: 4px;
  border-radius: 2px;
  background: ${t.bottomSheet.handle[0]};
`
const headerTextStyle = (t: AppTheme.Theme)=>css`
  ${center};
  min-height: 20px;
`



const bodyStyle = (t: AppTheme.Theme)=>css`
  display: flex;
  place-items: center;
  overflow: hidden;
  background: ${t.bottomSheet.bgc[0]};
  color: ${t.page.content2[0]};
`



const scrollableContentStyle = (t: AppTheme.Theme)=>css`
  width: 100%;
  padding: 0 10px 10px;
  ${col};
  height: fit-content;
  min-height: fit-content;
`