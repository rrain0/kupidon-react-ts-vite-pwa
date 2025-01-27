import { css } from '@emotion/react'
import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Puro = TypeU.Puro
import col = EmotionCommon.col
import round = EmotionCommon.round
import arr = ArrayU.arr
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle



const indicatorLen = 26
const sz = 7

export type DotsScrollIndicatorProps = ClassStyle & Puro<{
  cnt: number
}>
export const DotsScrollIndicator = React.memo((props: DotsScrollIndicatorProps) => {
  let {
    className,
    style,
    cnt = 0,
  } = props
  
  cnt = 6
  
  return (
    <div
      className={className}
      style={style}
      data-display-name="DotsScrollIndicator"
      css={frameS}
    >
      {arr(cnt).map((_, i) => (
        <div css={dotS} key={i} />
      ))}
      <div css={indicatorS} />
    </div>
  )
})
DotsScrollIndicator.displayName = 'DotsScrollIndicator'
export default DotsScrollIndicator



const frameS = css`
  position: relative;
  --indicator-len: 26px;
  --sz: 7px;
  width: fit-content;
  height: fit-content;
  ${col};
  gap: 6px;
  padding-bottom: calc( var(--indicator-len) - var(--sz) );
`

const dotS = css`
  width: var(--sz);
  height: var(--sz);
  background-color: #D9D9D999;
  ${round};
  
  translate: 0 calc( var(--indicator-len) - var(--sz) );
`

const indicatorS = css`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--sz);
  height: var(--indicator-len);
  background-color: white;
  ${round};
`
