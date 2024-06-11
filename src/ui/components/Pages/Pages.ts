import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/ui-props/styles/bgc/SimpleGradientBgc.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
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
    width: min(100dvw, 100%);
    min-height: max(220px, 100dvh);
    max-height: fit-content;
  `
  export const Page = styled.main`
    ${page};
    position: relative;
    ${center};
    ${p=>pageColors(p.theme)};
  `
  export const SimplePage = styled.main`
    ${page};
    position: relative;
    ${center};
    ${p=>simplePageColors(p.theme)}
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
  export const AddInsets = styled.div`
    ${fitPage};
    ${center};
  `
  
  
  
  
  
  export const content = css`
    ${fitPage};
    max-width: 550px;
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
    min-height: auto;
    min-width: 0;
    gap: 30px;
  `
  export const ContentForm = styled.form(contentForm)
  
  export const ContentFill = styled.div`
    ${content};
    max-width: unset;
    align-items: start;
  `
  
  
  
}