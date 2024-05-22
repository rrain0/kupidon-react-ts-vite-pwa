import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ScrollbarOverlay from 'src/ui/elements/Scrollbars/ScrollbarOverlay.tsx'
import { ScrollbarOverlayStyle } from 'src/ui/elements/Scrollbars/ScrollbarOverlayStyle.ts'
import UseScrollbars from 'src/ui/elements/Scrollbars/UseScrollbars.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.noScrollbars
import React, { useRef } from 'react'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import centerAll = EmotionCommon.centerAll
import { TypeUtils } from '@util/common/TypeUtils.ts'
import clsx from 'clsx'
import { isBrowser } from 'react-device-detect'
import PartialUndef = TypeUtils.PartialUndef
import ClassStyleProps = ReactUtils.ClassStyleProps
import fill = EmotionCommon.fill




export type OverflowWrapperProps = PartialUndef<{
  showVertical: boolean
  showHorizontal: boolean
  children: React.ReactNode
}> & ClassStyleProps



const OverflowWrapper =
React.memo(
(props: OverflowWrapperProps)=>{
  const showVertical = props.showVertical ?? true
  const showHorizontal = props.showHorizontal ?? true
  
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  
  
  /*
    Wrapper contains Scroll Container & ScrollbarOverlay
  */
  return <Wrapper
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
      className={'rrainuiScrollContainer'}
    >
      
      {/*
       // Scrollable Content Wrapper.
       // Wraps all scrollable content to represent its dimensions.
       // must be without margins & paddings - just content wrapper!!!
       */}
      <ScrollContent
        ref={scrollContentRef}
        className={'rrainuiScrollContentWrap'}
      >
        
        { props.children }
      
      </ScrollContent>
      
    </ScrollContainer>
    
    
    { isBrowser &&
      <UseScrollbars
        containerRef={scrollContainerRef}
        contentRef={scrollContentRef}
        render={
          (scrollbarProps)=>
            <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
              {...scrollbarProps}
              showVertical={showVertical}
              showHorizontal={showHorizontal}
            />
        }
      />
    }
    
  
  </Wrapper>
})
export default OverflowWrapper




const Wrapper = styled.div`
  ${fill};
  ${centerAll};
  position: relative;
`
const ScrollContainer = styled.div`
  ${col};
  //place-self: stretch;

  ${fill};

  overflow: auto;
  ${isBrowser && hideScrollbar};
`
const ScrollContent = styled.div`
  // customize it via OverflowWrapperStyle
`