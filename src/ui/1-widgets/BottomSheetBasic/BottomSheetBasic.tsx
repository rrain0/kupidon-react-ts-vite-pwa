import { TypeU } from '@utils/common/TypeU.ts'
import BottomSheet, {
  BottomSheetOptionsProps,
} from 'src/ui/1-widgets/BottomSheet/BottomSheet.tsx'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import React, { useRef } from 'react'
import Pu = TypeU.Pu



export type BottomSheetBasicProps = BottomSheetOptionsProps & Pu<{
  headerHandle: React.ReactNode
  headerTitle: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
}>



const BottomSheetBasic = React.memo((props: BottomSheetBasicProps) => {
  const {
    headerHandle,
    headerTitle,
    title,
    children,
    ...restProps
  } = props
  const { sheetState } = props
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  
  
  
  return (
    <BottomSheet
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
            className={BottomSheetBasicS6.W.els.header.n}
            ref={bottomSheetHeaderRef}
            {...sheetDrag()}
          >
            
            {/* Header - Handle */}
            {headerHandle ?? (
              <div
                data-display-name="Bottom Sheet Basic - Header Handle"
                className={BottomSheetBasicS6.W.els.headerHandle.n}
              />
            )}
            
            {/* Header - Title */}
            {headerTitle ?? (
              <div
                data-display-name="Bottom Sheet Basic - Header Title"
                className={BottomSheetBasicS6.W.els.headerTitle.n}
              >
                {title}
              </div>
            )}
          
          </div>
          
          {/*
           // Body Component
           // Must be without margins & paddings!!!
           */}
          <div
            data-display-name="Bottom Sheet Basic - Body"
            className={BottomSheetBasicS6.W.els.body.n}
          >
            <OverflowWrapper
              // TODO Style - allow string styles and move this to BottomSheetBasicS6
              css={OverflowWrapperStyle.defolt}
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
                className={BottomSheetBasicS6.W.els.cont.n}
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
})
export default BottomSheetBasic



