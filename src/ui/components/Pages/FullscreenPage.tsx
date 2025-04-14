import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle
import { simpleGradBgCss } from 'ui-data/bg/simpleGradBg'
import assertNever = TypeU.assertNever



const wMin = 320
const hMin = 480



export type FullscreenPageProps = Pu<{
  bgType: 'grad' | 'fill'
  noSafeInsets: boolean
}> & ClassStyle & Children

export const FullscreenPage = React.memo((props: FullscreenPageProps) => {
  const {
    className,
    style,
    children,
    bgType = 'grad',
    noSafeInsets,
  } = props
  
  const bgColorType = (() => {
    if (bgType === 'fill') return pageFillColor
    if (bgType === 'grad') return pageGradColor
    assertNever(bgType)
  })()
  
  const safeInsets = (!noSafeInsets || undefined) && pageAddSafeInsets
  
  return (
    <PageFillViewport
      data-display-name="FullscreenPage"
      className={className}
      style={style}
      css={[bgColorType, safeInsets]}
    >
      {children}
    </PageFillViewport>
  )
})
FullscreenPage.displayName = 'FullscreenPage'
export default FullscreenPage



const PageFillViewport = styled.div`
  min-width: ${wMin}px;
  width: 100dvw;
  min-height: ${hMin}px;
  height: 100dvh;
`



const pageFillColor = (t: AppTheme.Theme) => css`
  background: ${t.page.bg};
  color: ${t.page.ct2};
`
const pageGradColor = (t: AppTheme.Theme) => css`
  ${simpleGradBgCss(t)};
  color: ${t.page.ct2};
`


const pageAddSafeInsets = css`
  padding-top: var(--top-bars-inset);
  padding-bottom: var(--bottom-bars-inset);
`


