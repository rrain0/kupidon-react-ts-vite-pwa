import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { ScrollbarOverlayStyle } from 'src/ui/1-widgets/Scrollbars/ScrollbarOverlayStyle.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { ReactU } from 'src/util/common/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import Scrollbar from 'src/ui/1-widgets/Scrollbar/Scrollbar.tsx'
import { ScrollbarStyle } from 'src/ui/1-widgets/Scrollbar/ScrollbarStyle.ts'
import { ScrollProps, SetScrollProps } from 'src/ui/1-widgets/Scrollbar/useContainerScrollState.ts'
import abs = EmotionCommon.abs
import PartialUndef = TypeU.PartialUndef
import ClassStyleProps = ReactU.ClassStyle





export type ScrollbarOverlayProps = {
  scrollProps: ScrollProps,
  setContainerScroll: SetScrollProps
} & PartialUndef<{
  canScrollHorizontally: boolean
  canScrollVertically: boolean
  showVertical: boolean
  showHorizontal: boolean
}> & ClassStyleProps



const ScrollbarOverlay =
React.memo(
(props: ScrollbarOverlayProps)=>{
  const showVertical = (props.canScrollVertically ?? true) && (props.showVertical ?? true)
  const showHorizontal = (props.canScrollHorizontally ?? true) && (props.showHorizontal ?? true)
  
  
  
  return <Overlay // Scrollbar Overlay
    className={clsx(props.className, ScrollbarOverlayStyle.El.overlay.name)}
    style={props.style}
  >
    
    { showVertical &&
    <VerticalScrollbar
      scrollProps={props.scrollProps}
      setContainerScroll={props.setContainerScroll}
      direction="vertical"
    /> }
    
    { showHorizontal &&
    <HorizontalScrollbar
      scrollProps={props.scrollProps}
      setContainerScroll={props.setContainerScroll}
      direction='horizontal'
    /> }
  
  </Overlay>
})
export default ScrollbarOverlay



const Overlay = styled.div`
  ${abs};
  display: grid;
  pointer-events: none;
  grid: '.. vs' 1fr
          'hs ..' auto
        / 1fr auto;
`

const VerticalScrollbar = styled(Scrollbar)`
  ${p=>ScrollbarStyle.scrollbar(p.theme)};
  ${ScrollbarStyle.El.root.thiz('vertical')}{
    grid-area: vs;
    place-self: stretch end;
    height: auto;
    width: 20px;
    pointer-events: auto;
  }
`

const HorizontalScrollbar = styled(Scrollbar)`
  ${p=>ScrollbarStyle.scrollbar(p.theme)};
  ${ScrollbarStyle.El.root.thiz('horizontal')}{
    grid-area: hs;
    place-self: end stretch;
    height: 20px;
    width: auto;
    pointer-events: auto;
  }
`