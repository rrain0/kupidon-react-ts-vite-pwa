import styled from '@emotion/styled'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import React from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { useLogLayerZustand } from 'src/components/components/LogLayer/LogLayerZustand.ts'
import col = EmotionCommon.col



// HOW TO USE
// useLogLayerZustand.setState(prev => [...prev, 'DATA TO LOG'])

const LogLayer = React.memo(() => {
  const logData = useLogLayerZustand()
  
  if (logData.length) return (
    <Frame data-display-name='LogLayer'>
      {logData.map((it, i) => <div key={i}>{it}</div>)}
    </Frame>
  )
  return undefined
})
LogLayer.displayName = 'LogLayer'
export default LogLayer


const Frame = styled.article(flexStyle({
  fixed: true, l: 0, b: 0, r: 0, z: StyleVals.modalFloor10k,
  h: 'ct', noPointer: true,
  col: true, g: 2, p: 8, pb: 30,
  bgColor: '#00000055', color: 'white',
}))
