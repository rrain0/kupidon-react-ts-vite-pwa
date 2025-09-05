import styled from '@emotion/styled'
import ScrollbarOverlay from 'src/components/widgets/Scrollbars/ScrollbarOverlay.tsx'
import { ScrollbarOverlayStyle } from 'src/components/widgets/Scrollbars/ScrollbarOverlayStyle.ts'
import UseScrollbars from 'src/components/widgets/Scrollbars/UseScrollbars.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.noScrollbars
import React, { useRef } from 'react'
import { ReactU } from 'src/utils/react/ReactU.ts'
import gridStackC = EmotionCommon.gridStackC

import clsx from 'clsx'
import { isBrowser } from 'react-device-detect'
import { Pu } from '@utils/base/typeUtils.ts'
import ClassStyle = ReactU.ClassStyle
import fullMinMax = EmotionCommon.fullMinMax




export type OverflowWrapperProps = Pu<{
  showVertical: boolean
  showHorizontal: boolean
  children: React.ReactNode
}> & ClassStyle



const OverflowWrapper = React.memo((props: OverflowWrapperProps) => {
  const showVertical = props.showVertical ?? true
  const showHorizontal = props.showHorizontal ?? true
  
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  
  
  return (
    /* Wrapper contains Scroll Container & ScrollbarOverlay */
    <Wrapper
      className={clsx(props.className, 'rrainuiOverflowWrapper')}
      style={props.style}
    >
      
      
      {/*
       // Container of Scrollable Content.
       // Element that is scrollable.
       // must be without margins & paddings!!!
       */}
      <ScrollContainer
        ref={scrollContainerRef}
        className='rrainuiScrollContainer'
      >
        
        {/*
         // Scrollable Content Wrapper.
         // Wraps all scrollable content to represent its dimensions.
         // must be without margins & paddings - just content wrapper!!!
         */}
        <ScrollContent
          ref={scrollContentRef}
          className='rrainuiScrollContentWrap'
        >
          
          {props.children}
        
        </ScrollContent>
        
      </ScrollContainer>
      
      
      {isBrowser && (
        <UseScrollbars
          containerRef={scrollContainerRef}
          contentRef={scrollContentRef}
          render={(scrollbarProps) => (
            <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
              {...scrollbarProps}
              showVertical={showVertical}
              showHorizontal={showHorizontal}
            />
          )}
        />
      )}
      
    
    </Wrapper>
  )
})
OverflowWrapper.displayName = 'OverflowWrapper'
export default OverflowWrapper




const Wrapper = styled.div`
  ${fullMinMax};
  ${gridStackC};
  position: relative;
`
const ScrollContainer = styled.div`
  ${col};
  //place-self: stretch;

  ${fullMinMax};

  overflow: auto;
  ${isBrowser && hideScrollbar};
`
const ScrollContent = styled.div`
  // customize it via OverflowWrapperStyle
`
