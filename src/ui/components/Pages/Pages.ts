import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/ui/styles/bgc/SimpleGradientBgc.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import fill = EmotionCommon.fill
import col = EmotionCommon.col




export namespace Pages {
  
  
  
  export const pageColors = (t: AppTheme.Theme)=>css`
    ${SimpleGradientBgc(t)};
    color: ${t.page.content2[0]};
  `
  export const simplePageColors = (t: AppTheme.Theme)=>css`
    background: ${t.page.bgc[0]};
    color: ${t.page.content2[0]};
  `
  
  
  
  
  export const page = css`
    min-width: 220px;
    width: 100dvw;
    min-height: max(220px,100dvh);
    max-height: fit-content;
  `
  export const Page = styled.main`
    ${page};
    position: relative;
    ${center};
    ${p=>pageColors(p.theme)};
  `
  
  export const fillViewport = css`
    min-width: 220px;
    width: 100dvw;
    min-height: 220px;
    height: 100dvh;
  `
  export const TabsPage = styled.main`
    ${fillViewport};
    ${p=>pageColors(p.theme)}
  `
  
  
  
  
  
  export const fitPage = css`
    width: 100%;
    min-height: 100%;
    height: fit-content;
  `
  
  
  // no overlapping by bottom / top bars
  export const safeInsets = css`
    padding-top: var(--top-bars-inset);
    padding-bottom: var(--bottom-bars-inset);
  `
  export const SafeInsets = styled.div`
    ${fitPage};
    ${safeInsets};
    ${center};
  `
  
  
  
  
  
  
  export const content = css`
    ${fitPage};
    max-width: 500px;
    ${col};
    align-items: center;
    gap: 10px;
  `
  export const Content = styled.div(content)
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  export const pageContentVerticalPaddings = css`
    //padding-top: var(--top-page-inset);
    padding-top: 70px;
    padding-bottom: var(--bottom-page-inset);
  `
  export const pageContentHorizontalPaddings = css`
    padding-left: 20px;
    padding-right: 20px;
  `
  export const pageContentPaddings = css`
    ${pageContentVerticalPaddings};
    ${pageContentHorizontalPaddings};
  `
  
  
  
  export const pageLayoutStyle = css`
    position: relative;
    ${pageContentPaddings};
    ${center};
  `
  
  
  
  
  
  
  export const Page0 = styled.main`
    ${page};
    ${pageLayoutStyle};
    ${p=>pageColors(p.theme)}
  `
  const contentBase = css`
    max-width: 500px;
    width: 100%;
  `
  export const content0 = css`
    ${contentBase};
    height: fit-content;
    min-height: 100%;
    ${col};
    align-items: center;
    gap: 10px;
  `
  export const contentCenterBigGap = css`
    ${contentBase};
    ${col};
    gap: 24px;
  `
  export const Content0 = styled.div(content0)
  export const ContentCenterBigGap = styled.div(contentCenterBigGap)
  
  
  
  
  
  
  
  
  export const SimplePage = styled.main`
    ${page};
    ${pageLayoutStyle};
    ${p=>simplePageColors(p.theme)}
  `
  export const ContentFill = styled.div`
    ${fill};
    ${col};
    gap: 10px;
  `
  
  // no max-width
  const PageContent = styled.section`
    ${col};
    align-items: center;
    width: 100%;
    height: fit-content;
    min-height: 100%;
  `
  export const PageContentSafe = styled(PageContent)`
    ${safeInsets};
  `
  export const PageContentVerticalPaddings = styled(PageContent)`
    ${pageContentVerticalPaddings};
  `
  export const PageContentPaddings = styled(PageContent)`
    ${pageContentPaddings};
  `
  
  
  
}