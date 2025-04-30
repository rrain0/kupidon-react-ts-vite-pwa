import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { isMobileSafari } from 'react-device-detect'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle
import { simpleGradBgCss } from 'ui-data/bg/simpleGradBg'
import assertNever = TypeU.assertNever
import col = EmotionCommon.col



const wMin = 320
const hMin = 480



export type PageLayoutProps = Pu<{
  vp: boolean
  full: boolean
  col: boolean
  bgType: 'grad' | 'fill'
  
  noInsetsForFilledBars: boolean
}> & ClassStyle & Children

export const PageLayout = React.memo((props: PageLayoutProps) => {
  const {
    className,
    style,
    children,
    
    vp, full, col,
    bgType = 'grad',
    
    noInsetsForFilledBars,
  } = props
  
  const Page = (() => {
    if (col) return PageCol
    if (vp) return PageFillViewport
    return PageCol
  })()
  
  const bgColorType = (() => {
    if (bgType === 'fill') return pageFillColor
    if (bgType === 'grad') return pageGradColor
    assertNever(bgType)
  })()
  
  const safeInsetsForFilledBars = !noInsetsForFilledBars && addSafeInsetsForFilledBars
  
  return (
    <Page
      data-display-name='PageLayout'
      className={className}
      style={style}
      css={[bgColorType, safeInsetsForFilledBars]}
    >
      {children}
    </Page>
  )
})
PageLayout.displayName = 'PageLayout'
export default PageLayout





const PageCol = styled.div`
  position: relative;
  min-width: ${wMin}px;
  width: min(var(--vp-ct-w), 100dvw);
  min-height: max( min(var(--vp-ct-h), 100dvh), ${hMin}px );
  ${col};
`

const PageFillViewport = styled.div`
  min-width: ${wMin}px;
  width: 100dvw;
  min-height: ${hMin}px;
  height: 100dvh;
  // Запретить жест обновления страницы браузера на айфоне,
  // потому что на айфоне он неприятно сдвигает страницу
  ${isMobileSafari && 'touch-action: none;'}
`



const pageFillColor = (t: AppTheme.Theme) => css`
  background: ${t.page.bg};
  color: ${t.page.ct2};
`
const pageGradColor = (t: AppTheme.Theme) => css`
  ${simpleGradBgCss(t)};
  color: ${t.page.ct2};
`


const addSafeInsetsForFilledBars = css`
  padding-top: var(--top-bars-inset);
  padding-bottom: var(--bottom-bars-inset);
`

