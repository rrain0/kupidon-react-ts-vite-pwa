/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Global } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import {
  PageScrollbarsOverlayFrame
} from 'src/components/Scrollbars/PageScrollbarsOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import hideWindowScrollbar = EmotionCommon.hideWindowScrollbar
import PartialUndef = TypeUtils.PartialUndef





export type PageScrollbarsProps = PartialUndef<{
  pageRef: React.RefObject<HTMLElement>
}>



const PageScrollbars =
React.memo(
(props: PageScrollbarsProps)=>{
  
  
  const frameRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLElement|null>(null)
  useEffect(
    ()=>{
      const frame = frameRef.current
      if (!props.pageRef && frame){
        parentRef.current = frame.parentElement
      }
    },
    [props.pageRef, frameRef.current]
  )
  const ref = props.pageRef ?? parentRef
  
  
  return <>
    { isBrowser && <>
      <Global styles={hideWindowScrollbar}/>
      <PageScrollbarsOverlayFrame ref={frameRef}>
        <UseScrollbars
          containerIsWindow={true}
          contentRef={ref}
          render={scrollbarProps=>
          <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
            {...scrollbarProps}
          />}
        />
      </PageScrollbarsOverlayFrame>
    </>}
  </>
})
export default PageScrollbars