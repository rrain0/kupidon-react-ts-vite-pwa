import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import { css } from '@emotion/react'
import { ArrayU } from '@util/common/ArrayU.ts'
import { MathU } from '@util/common/MathU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Puro = TypeU.Puro
import col = EmotionCommon.col
import round = EmotionCommon.round
import arr = ArrayU.arr
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import round3 = MathU.round3



const indicatorLen = 26
const sz = 7

export type DotsScrollIndicatorProps = ClassStyle & Puro<{
  cnt: number
  progress: AnimatedProperty<any, number> // ..0..(100 * cnt)..
}>
export const DotsScrollIndicator = React.memo((props: DotsScrollIndicatorProps) => {
  const {
    className,
    style,
    cnt = 0,
    progress,
  } = props
  
  const pLooped = progress?.map(p => {
    const p1 = RangeU.loop(round3(p / cnt / 100), [0, 1])
    p = RangeU.loop(round3(p), [0, 100 * cnt])
    return { p, p1 }
  })
  
  return (
    <div
      className={className}
      style={style}
      data-display-name="DotsScrollIndicator"
      css={frameS}
    >
      {arr(cnt).map((_, i) => (
        <AnimatedDiv css={dotS} key={i}
          animated={{
            translate: pLooped?.map(p => {
              let yp = RangeU.mapClamp(p.p, [0, 100 * cnt], [0 - i, cnt - i], [0, 1])
              yp = 1 - yp
              yp = round3(yp)
              return `0 calc( (var(--indicator-len) - var(--sz)) * ${yp} )`
            }),
          }}
        />
      ))}
      <AnimatedDiv css={thumbS}
        animated={{
          top: pLooped?.map(p => `${p.p1 * 100}%`),
          transform: pLooped?.map(p => `translateY(calc( ${p.p1} * var(--g) ))`),
        }}
      />
    </div>
  )
})
DotsScrollIndicator.displayName = 'DotsScrollIndicator'
export default DotsScrollIndicator



const frameS = css`
  position: relative;
  --indicator-len: 26px;
  --sz: 7px;
  --g: 6px;
  width: fit-content;
  height: fit-content;
  ${col};
  gap: var(--g);
  //padding-bottom: calc( var(--indicator-len) - var(--sz) );
`

const dotS = (t: AppTheme.Theme) => css`
  width: var(--sz);
  height: var(--sz);
  background-color: ${t.previewPhotosProgress.dotBg};
  ${round};
`

const thumbS = (t: AppTheme.Theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--sz);
  height: var(--indicator-len);
  background-color: ${t.previewPhotosProgress.thumbBg};
  ${round};
`
