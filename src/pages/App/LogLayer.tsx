/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { atom, useRecoilValue } from 'recoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col





export type LogLayerRecoilType = string[]
export const LogLayerRecoil = atom<LogLayerRecoilType>({
  key: 'logLayer',
  default: [],
})



const LogLayer =
React.memo(
()=>{
  const logData = useRecoilValue(LogLayerRecoil)
  
  if (logData.length) return <Frame>
    {logData.map((it,i)=><div key={i}>{it}</div>)}
  </Frame>
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
`