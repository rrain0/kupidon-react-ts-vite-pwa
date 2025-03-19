import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { create } from 'zustand'
import col = EmotionCommon.col




export type LogLayerZustand = string[]
export const useLogLayerZustand = create<LogLayerZustand>(() => [])


// HOW TO USE
// const setLogData = useSetRecoilState(LogLayerRecoil)
// setLogData(prev => [...prev, 'DATA TO LOG'])


const LogLayer = React.memo(() => {
  const logData = useLogLayerZustand()
  
  if (logData.length) return (
    <Frame>
      {logData.map((it, i) => <div key={i}>{it}</div>)}
    </Frame>
  )
  return undefined
})
export default LogLayer




const Frame = styled.article`
  position: fixed;
  left: 0; bottom: 0; right: 0;
  height: fit-content;
  pointer-events: none;
  background: #00000055;
  color: white;
  overflow-wrap: anywhere;
  padding: 8px;
  ${col};
  z-index: ${StyleVals.modalFloor10k};
`
