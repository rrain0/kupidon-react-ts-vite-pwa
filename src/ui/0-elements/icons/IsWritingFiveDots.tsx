import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import { CssU } from '@util/css/CssU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import Pu = TypeU.Pu
import CssColor = CssU.CssColor
import mapToCssCustomProps = ReactU.mapToCssCustomProps





// Use typed css prop names
export const IsWritingFiveDotsCssProps = (cssProps: Pu<{
  color: CssColor
  colorAccent: CssColor
}> = { }) => mapToCssCustomProps(cssProps)



export type IsWritingFiveDotsProps = Omit<React.ComponentPropsWithRef<'div'>, 'children'>



const IsWritingFiveDots = React.memo((props: IsWritingFiveDotsProps) => {
  return (
    <DotsBox
      data-display-name='IsWritingFiveDots'
      {...props}
    >
      <Dot css={dot1}/>
      <Dot css={dot2}/>
      <Dot css={[dotAccentS, dot3]}/>
      <Dot css={dot4}/>
      <Dot css={dot5}/>
    </DotsBox>
  )
})
IsWritingFiveDots.displayName = 'IsWritingFiveDots'
export default IsWritingFiveDots



const DotsBox = styled.div`
  position: relative;
  aspect-ratio: 8;
  height: 10px;
  width: auto;
`

const dotMove = keyframes`
  0%   { left: 0%; scale: 0; }
  20%  { left: 20%; scale: 1; }
  80%  { left: 80%; scale: 1; }
  100% { left: 100%; scale: 0; }
`

const Dot = styled.div`
  position: absolute;
  height: 100%;
  transform: translateX(-50%);
  aspect-ratio: 1;
  border-radius: 999999px;
  background-color: var(--color, black);
  transform-origin: center;
  animation: 2s linear infinite ${dotMove};
`
const dotAccentS = css`
  background-color: var(--color-accent, #BB2649);
`
const dot1 = css({ animationDelay: '-1.6s' })
const dot2 = css({ animationDelay: '-1.2s' })
const dot3 = css({ animationDelay: '-0.8s' })
const dot4 = css({ animationDelay: '-0.4s' })
const dot5 = css({ animationDelay: '0s' })
