import styled from '@emotion/styled'
import { useRefGetSet } from '@utils/state/react/base/useRefGetSet.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import { useElemRefGetSet } from '@utils/elem/react/useElemRefGetSet.ts'
import { useResizeRef } from '@utils/view/useResizeRef.ts'
import { getViewProps } from '@utils/view/ViewProps.ts'
import React, { useState } from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Contents from '@libs/short-propsed/components/Contents.tsx'
import fixed = EmotionCommon.fixed
import Children = ReactU.Children




const UseViewportContentSize = React.memo(({ children }: Children) => {
  
  const [ready, setReady] = useState(false)
  
  const [getWh, setWh] = useRefGetSet({ w: 0, h: 0 })
  
  const [getCt, , ctFunRef] = useElemRefGetSet<HTMLDivElement>()
  
  const vpSzFunRef = useResizeRef(el => {
    let w = 0, h = 0
    if (el) { ({ w, h } = getViewProps(el)) }
    if (w || h) setReady(true)
    setWh({ w, h })
    
    const ct = getCt()
    if (ct) {
      getViewProps(ct).setCssProps({
        '--vp-ct-w': `${w}px`,
        '--vp-ct-h': `${h}px`,
      })
    }
  })
  
  
  
  
  return (
    <>
      <VpSz
        data-display-name='UseViewportContentSize'
        ref={vpSzFunRef}
      />
      {ready && (
        <Contents
          ref={ctFunRef}
          style={{
            '--vp-ct-w': `${getWh().w}px`,
            '--vp-ct-h': `${getWh().h}px`,
          }}
        >
          {children}
        </Contents>
      )}
    </>
  )
})
UseViewportContentSize.displayName = 'UseViewportContentSize'
export default UseViewportContentSize



const VpSz = styled.div`
  display: block;
  ${fixed};
  //background-color: #cd5c5c77;
  pointer-events: none;
`


