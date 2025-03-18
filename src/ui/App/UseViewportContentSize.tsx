import styled from '@emotion/styled'
import { useResizeRef } from '@util/view/useResizeRef.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import fixed = EmotionCommon.fixed



const UseViewportContentSize = React.memo(() => {
  
  const funRef = useResizeRef(el => {
    let w = 0, h = 0
    if (el) {
      ;({ w, h } = getViewProps(el))
    }
    getViewProps().setCssProps({
      '--vp-ct-w': `${w}px`,
      '--vp-ct-h': `${h}px`,
    })
  })
  
  return (
    <Div
      data-display-name="UseViewportContentSize"
      ref={funRef}
    />
  )
})
UseViewportContentSize.displayName = 'UseViewportContentSize'
export default UseViewportContentSize



const Div = styled.div`
  display: block;
  ${fixed};
  //background-color: #cd5c5c77;
  pointer-events: none;
`


