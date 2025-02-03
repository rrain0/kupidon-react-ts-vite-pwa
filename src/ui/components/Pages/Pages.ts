import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { SimpleGradientBg } from 'src/ui-data/bg/SimpleGradientBg.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import col = EmotionCommon.col




export namespace Pages {
  
  
  
  import colC = EmotionCommon.colC
  export const pageColors = (t: AppTheme.Theme) => css`
    ${SimpleGradientBg(t)};
    color: ${t.page.ct2};
  `
  export const simplePageColors = (t: AppTheme.Theme) => css`
    background: ${t.page.bg};
    color: ${t.page.ct2};
  `
  
  
  
  export const page = css`
    min-width: 220px;
    width: 100dvw;
    min-height: max(100dvh, 220px);
    //height: auto;
    //max-height: fit-content;
    position: relative;
    ${col};
  `
  export const Page = styled.main`
    ${page};
    ${p => pageColors(p.theme)};
  `
  export const SimplePage = styled.main`
    ${page};
    ${p => simplePageColors(p.theme)}
  `
  
  export const fillViewport = css`
    min-width: 220px;
    width: 100dvw;
    min-height: 220px;
    height: 100dvh;
  `
  export const TabsPage = styled.main`
    ${fillViewport};
    ${p => pageColors(p.theme)}
  `
  
  
  
  
  
  export const colFitScreen = css`
    width: 100%;
    min-height: 100dvh;
    height: fit-content;
  `
  
  
  // no overlapping by bottom / top bars
  export const safeInsets = css`
    padding-top: var(--top-bars-inset);
    padding-bottom: var(--bottom-bars-inset);
  `
  export const NoInsets = styled.div`
    ${colFitScreen};
    ${colC};
  `
  export const SafeInsets = styled(NoInsets)`
    ${safeInsets};
  `
  
  
  
  
  
  export const content = css`
    max-width: 550px;
    min-width: 0;
    width: 100%;
    height: fit-content;
    // 12px
    padding-top: max(30px, var(--top-button-bar-height));
    padding-bottom: max(50px, var(--bottom-button-bar-height));
    padding-left: 16px;
    padding-right: 16px;
    ${col};
    align-items: stretch;
    gap: 10px;
  `
  export const Content = styled.div(content)
  
  export const contentForm = css`
    ${content};
    gap: 30px;
  `
  export const ContentForm = styled.form(contentForm)
  
  export const ContentFill = styled.div`
    ${content};
    max-width: unset;
    align-items: start;
  `
  
  
  
}
