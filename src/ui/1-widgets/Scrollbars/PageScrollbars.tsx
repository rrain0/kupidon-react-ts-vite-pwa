import { css } from '@emotion/react'
import { Global } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import {
  PageScrollbarsOverlayFrame
} from 'src/ui/1-widgets/Scrollbars/PageScrollbarsOverlayFrame.tsx'
import ScrollbarOverlay from 'src/ui/1-widgets/Scrollbars/ScrollbarOverlay.tsx'
import { ScrollbarOverlayStyle } from 'src/ui/1-widgets/Scrollbars/ScrollbarOverlayStyle.ts'
import UseScrollbars from 'src/ui/1-widgets/Scrollbars/UseScrollbars.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import hideWindowScrollbar = EmotionCommon.hideWindowScrollbar
import PartialUndef = TypeU.PartialUndef





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