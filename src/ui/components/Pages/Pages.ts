import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { simpleGradBgCss } from 'src/ui-data/bg/simpleGradBg.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import col = EmotionCommon.col
import colC = EmotionCommon.colC




// TODO remove and replace with PageLayout & PageContentLayout
export namespace Pages {
  
  const wMin = 320
  const hMin = 480
  
  const pageCol = css`
    min-width: ${wMin}px;
    width: min(var(--vp-ct-w), 100dvw);
    //width: 110dvw;
    min-height: max( min(var(--vp-ct-h), 100dvh), ${hMin}px );
    //min-height: 100%;
    position: relative;
    ${col};
  `
  // no overlapping by bottom / top bars
  export const pageAddSafeInsets = css`
    padding-top: var(--top-action-bars-h);
    padding-bottom: var(--bottom-action-bars-h);
  `
  
  
  
  const pageColor = (t: AppTheme.Theme) => css`
    background: ${t.page.bg};
    color: ${t.page.ct2};
  `
  const pageGradColor = (t: AppTheme.Theme) => css`
    ${simpleGradBgCss(t)};
    color: ${t.page.ct2};
  `
  
  
  export const PageGrad = styled.main`
    ${pageCol};
    ${p => pageGradColor(p.theme)};
  `
  
  export const Page = styled.main`
    ${pageCol};
    ${p => pageColor(p.theme)}
  `
  
  
  
  const colFit = css`
    width: 100%;
    min-height: 100%;
    height: fit-content;
    ${colC};
  `
  
  export const AddSafeInsets = styled.div`
    ${colFit};
    ${pageAddSafeInsets};
  `
  
  
  
  
  
  const content = css`
    position: relative;
    width: 100%;
    min-width: 0;
    height: fit-content;
    padding-top: max(30px, var(--top-floating-bar-h));
    padding-bottom: max(50px, var(--bottom-floating-bar-h));
    padding-left: 16px;
    padding-right: 16px;
    ${col};
    gap: 10px;
  `
  const contentColSm = css`
    ${content};
    max-width: 550px;
    align-items: stretch;
  `
  const contentColSmForm = css`
    ${contentColSm};
    gap: 30px;
  `
  
  
  
  export const Content = styled.div(content)
  export const ContentColSm = styled.div(contentColSm)
  export const ContentColSmForm = styled.form(contentColSmForm)
  
  
}
