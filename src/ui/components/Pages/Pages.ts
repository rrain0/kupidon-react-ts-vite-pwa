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
  
  export const pageCol = css`
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
    padding-top: var(--top-bars-inset);
    padding-bottom: var(--bottom-bars-inset);
  `
  
  
  
  export const pageColor = (t: AppTheme.Theme) => css`
    background: ${t.page.bg};
    color: ${t.page.ct2};
  `
  export const pageGradColor = (t: AppTheme.Theme) => css`
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
    position: relative;
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
  export const contentColSm = css`
    ${content};
    max-width: 550px;
    align-items: stretch;
  `
  export const contentColSmForm = css`
    ${contentColSm};
    gap: 30px;
  `
  
  
  
  export const Content = styled.div(content)
  export const ContentColSm = styled.div(contentColSm)
  export const ContentColSmForm = styled.form(contentColSmForm)
  
  
  
  
  /*
  // TODO remove & replace by something like this:
   <Grid cols='54px 1fr 54px' stretch>
     <Gap w={50}/>
     <Flex center><Hdrs.Page>{uiText.bowAndArrows}</Hdrs.Page></Flex>
     <Flex centerEnd>
       <Button css={IconButtonS6.t(calendarButtonS)}>
         <Calendar2GradIc/>
       </Button>
     </Flex>
   </Grid>
   */
  export const PageHeaderWithLeftRightItems = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;
  `
  
  
  
}
