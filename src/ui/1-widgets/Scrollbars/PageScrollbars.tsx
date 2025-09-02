import { Global } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import {
  PageScrollbarsOverlayFrame
} from 'src/ui/1-widgets/Scrollbars/PageScrollbarsOverlayFrame.tsx'
import ScrollbarOverlay from 'src/ui/1-widgets/Scrollbars/ScrollbarOverlay.tsx'
import { ScrollbarOverlayStyle } from 'src/ui/1-widgets/Scrollbars/ScrollbarOverlayStyle.ts'
import UseScrollbars from 'src/ui/1-widgets/Scrollbars/UseScrollbars.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import hideWindowScrollbar = EmotionCommon.noWindowScrollbars
import Pu = TypeU.Pu





export type PageScrollbarsProps = Pu<{
  pageRef: React.RefObject<HTMLElement | null>
}>



const PageScrollbars = React.memo((props: PageScrollbarsProps) => {
  const { pageRef } = props
  
  const frameRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const frame = frameRef.current
    if (!pageRef && frame) {
      parentRef.current = frame.parentElement
    }
  }, [pageRef, frameRef.current])
  const ref = pageRef ?? parentRef
  
  
  return (
    <>
      {isBrowser && (
        <>
          <Global styles={hideWindowScrollbar}/>
          <PageScrollbarsOverlayFrame
            ref={frameRef}
            data-display-name='PageScrollbars'
          >
            <UseScrollbars
              containerIsWindow={true}
              contentRef={ref}
              render={scrollbarProps => (
                <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
                  {...scrollbarProps}
                />
              )}
            />
          </PageScrollbarsOverlayFrame>
        </>
      )}
    </>
  )
})
PageScrollbars.displayName = 'PageScrollbars'
export default PageScrollbars