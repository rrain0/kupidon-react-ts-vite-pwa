/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Scrollbar from 'src/views/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import { ScrollProps, SetScrollProps } from 'src/views/Scrollbar/useContainerScrollState'
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import ClassStyleProps = ReactUtils.ClassStyleProps





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
    className={classNames(props.className, ScrollbarOverlayStyle.El.overlay.name)}
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