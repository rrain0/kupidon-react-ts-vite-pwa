import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col





export type TabProps = {
  width: number
}
const Tab = styled.div<TabProps>`
  //min-width: 100cqw;
  //width: 100cqw;
  //max-width: 100cqw;
  &{
    min-width: ${p=>p.width}px;
    width: ${p=>p.width}px;
    max-width: ${p=>p.width}px;
    will-change: min-width, width, max-width;
  }
  ${col};
  //overflow-y: auto;
  overflow: visible;
  touch-action: pan-y;
`
export default Tab


