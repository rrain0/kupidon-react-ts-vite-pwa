import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import { css } from '@emotion/react'
import { ArrayU } from '@utils/base/ArrayU.ts'
import { MathU } from '@utils/base/MathU.ts'
import { RangeU } from '@utils/base/RangeU.ts'
import { TypeU } from '@utils/base/TypeU.ts'
import React from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import Pu = TypeU.Pu
import col = EmotionCommon.col
import round = EmotionCommon.round
import arr = ArrayU.arr
import { ReactU } from 'src/utils/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import rf3 = MathU.rf3




export type DotsScrollIndicatorProps = ClassStyle & Pu<{
  cnt: number
  progress: AnimatedProperty<number> // ..0..(100 * cnt)..
}>
export const DotsScrollIndicator = React.memo((props: DotsScrollIndicatorProps) => {
  const {
    className,
    style,
    cnt = 0,
    progress,
  } = props
  
  const pLooped = progress?.map(p => {
    const p1 = rf3(RangeU.loop(rf3(p / cnt / 100), [0, 1]))
    p = rf3(RangeU.loop(rf3(p), [0, 100 * cnt]))
    return { p, p1 }
  })
  
  return (
    <div
      data-display-name="DotsScrollIndicator"
      className={className}
      style={style}
      css={frameS}
    >
      <div css={frame2S}>
        <div css={frame3S}>
          {arr(cnt).map((_, i) => (
            <AnimatedDiv
              key={i}
              css={dotS}
              style={{
                willChange: 'transform',
              }}
              animatedStyle={{
                transform: pLooped?.map(p => {
                  let yp = RangeU.mapClamp(p.p, [0, 100 * cnt], [0 - i, cnt - i], [0, 1])
                  yp = rf3(1 - yp)
                  return `translateY(calc( (  var(--indicator-len) - var(--sz)  ) * ${yp} ))`
                }),
              }}
            />
          ))}
          <AnimatedDiv css={thumbS}
            style={{
              willChange: 'top, transform',
            }}
            animatedStyle={{
              top: pLooped?.map(p => `${p.p1 * 100}%`),
              transform: pLooped?.map(p => `translateY(calc( ${p.p1} * var(--g) ))`),
            }}
          />
        </div>
      </div>
    </div>
  )
})
DotsScrollIndicator.displayName = 'DotsScrollIndicator'
export default DotsScrollIndicator



const frameS = (t: AppTheme.Theme) => css`
  position: relative;
  --indicator-len: 26px;
  --sz: 7px;
  --g: 6px;
  width: fit-content;
  height: fit-content;
  padding: 8px;
  ${col};
  content: '';
  border-radius: 999999px;
  background-color: ${t.previewPhotosProgress.bg};
`
const frame2S = css`
  position: relative;
  ${col};
  width: fit-content;
  height: fit-content;
  padding-bottom: calc( (var(--indicator-len) - var(--sz)) );
  border-radius: 999999px;
  overflow: hidden;
`
const frame3S = css`
  position: relative;
  ${col};
  gap: var(--g);
  width: fit-content;
  height: fit-content;
`

const dotS = (t: AppTheme.Theme) => css`
  width: var(--sz);
  height: var(--sz);
  background-color: ${t.previewPhotosProgress.ct};
  ${round};
`

const thumbS = (t: AppTheme.Theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--sz);
  height: var(--indicator-len);
  background-color: ${t.previewPhotosProgress.cta};
  ${round};
`
