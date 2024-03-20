import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import { AppTheme } from 'src/utils/theme/AppTheme'
import fill = EmotionCommon.fill
import col = EmotionCommon.col




export namespace Pages {
  
  
  
  export const viewportViewStyle = css`
    min-width: 220px;
    width: 100dvw;
    min-height: 220px;
    height: 100dvh;
  `
  export const modalFrameStyle = css`
    min-width: 220px;
    width: 100dvw;
    min-height: max(220px,100dvh);
    max-height: fit-content;
  `
  
  
  
  // safe means where there is no overlapping elements
  export const safePageContentPaddings = css`
    padding-bottom: var(--bottom-bars-inset);
  `
  
  
  
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
  
  
  
  
  export const pageColors = (t: AppTheme.Theme)=>css`
    ${SimpleGradientBgc(t)};
    color: ${t.page.content2[0]};
  `
  export const simplePageColors = (t: AppTheme.Theme)=>css`
    background: ${t.page.bgc[0]};
    color: ${t.page.content2[0]};
  `
  
  
  
  export const Page = styled.main`
    ${modalFrameStyle};
    ${pageLayoutStyle};
    ${p=>pageColors(p.theme)}
  `
  export const SimplePage = styled.main`
    ${modalFrameStyle};
    ${pageLayoutStyle};
    ${p=>simplePageColors(p.theme)}
  `
  export const TabsPage = styled.main`
    ${viewportViewStyle};
    ${p=>pageColors(p.theme)}
  `
  
  
  
  
  export const SimpleContent = styled.div`
    ${fill};
    ${col};
    gap: 10px;
  `
  
  const PageContent = styled.section`
    ${col};
    align-items: center;
    width: 100%;
    height: fit-content;
    min-height: 100%;
  `
  export const PageContentSafe = styled(PageContent)`
    ${safePageContentPaddings};
  `
  export const PageContentVerticalPaddings = styled(PageContent)`
    ${pageContentVerticalPaddings};
  `
  export const PageContentPaddings = styled(PageContent)`
    ${pageContentPaddings};
  `
  
  
}