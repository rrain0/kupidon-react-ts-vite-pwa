import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { SimpleGradientBg } from 'src/ui-data/bg/SimpleGradientBg.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import col = EmotionCommon.col
import colC = EmotionCommon.colC





export namespace Pages {
  
  
  
  export const pageCol = css`
    min-width: 220px;
    width: min(100%, 100dvw);
    min-height: max(100dvh, 220px);
    //height: auto;
    //max-height: fit-content;
    position: relative;
    ${col};
  `
  export const pageFillViewport = css`
    min-width: 220px;
    width: 100dvw;
    min-height: 220px;
    height: 100dvh;
  `
  // no overlapping by bottom / top bars
  export const pageAddSafeInsets = css`
    padding-top: var(--top-bars-inset);
    padding-bottom: var(--bottom-bars-inset);
  `
  
  
  
  export const pageColors = (t: AppTheme.Theme) => css`
    ${SimpleGradientBg(t)};
    color: ${t.page.ct2};
  `
  export const pageSimpleColors = (t: AppTheme.Theme) => css`
    background: ${t.page.bg};
    color: ${t.page.ct2};
  `
  
  
  export const Page = styled.main`
    ${pageCol};
    ${p => pageColors(p.theme)};
  `
  export const PageSimpleColors = styled.main`
    ${pageCol};
    ${p => pageSimpleColors(p.theme)}
  `
  export const TabsPage = styled.main`
    ${pageFillViewport};
    ${p => pageColors(p.theme)}
  `
  
  
  
  export const colFit = css`
    width: 100%;
    min-height: 100%;
    height: fit-content;
    ${colC};
  `
  
  export const AddSafeInsets = styled.div`
    ${colFit};
    ${pageAddSafeInsets};
  `
  
  
  
  
  
  export const content = css`
    width: 100%;
    min-width: 0;
    height: fit-content;
    padding-top: max(30px, var(--top-button-bar-height));
    padding-bottom: max(50px, var(--bottom-button-bar-height));
    padding-left: 16px;
    padding-right: 16px;
    ${col};
    gap: 10px;
  `
  export const contentSmCol = css`
    ${content};
    max-width: 550px;
    align-items: stretch;
  `
  export const contentSmColForm = css`
    ${contentSmCol};
    gap: 30px;
  `
  
  
  
  export const Content = styled.div(content)
  export const ContentSmCol = styled.div(contentSmCol)
  export const ContentSmColForm = styled.form(contentSmColForm)
  
  
  
}
