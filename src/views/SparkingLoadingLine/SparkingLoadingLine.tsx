/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import abs = EmotionCommon.abs




const kfs = keyframes`
  from { --progress: -130% }
  to   { --progress:  130% }
`



const SparkingLoadingLine = styled.div`
  ${abs};
  
  @property --progress {
    syntax: '<length-percentage>';
    initial-value: -100%;
    inherits: false;
  }
  
  background-image: linear-gradient(
    135deg,
    transparent 0% calc(30% + var(--progress)), transparent calc(30% + var(--progress)),
    #ffffff calc(43% + var(--progress)),
    #ffffff calc(43% + var(--progress)) calc(57% + var(--progress)),
    #ffffff calc(57% + var(--progress)),
    transparent calc(70% + var(--progress)), transparent calc(70% + var(--progress)) 100%
  );
  animation: ${kfs} 1250ms linear infinite;
  
  /*background-image: linear-gradient(
    135deg,
    transparent 0% 30%, transparent 30%,
    #ffffff 43%,
    #ffffff 43% 57%,
    #ffffff 57%,
    transparent 70%, transparent 70% 100%
  );*/
`
export default SparkingLoadingLine

