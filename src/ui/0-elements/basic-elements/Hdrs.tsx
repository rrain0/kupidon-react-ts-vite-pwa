import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH



// Headers
export namespace Hdrs {
  
  export const page = (t: AppTheme.Theme) => css`
    min-height: 1.5em;
    align-self: center;
    text-align: center;
    ${Txt.s24Lh150};
    color: ${t.page.ct1};
  `
  export const Page = styled.h3`
    ${resetH};
    ${p => page(p.theme)}
  `
  
  
  
  
  export const pageSec = (t: AppTheme.Theme) => css`
    align-self: center;
    text-align: center;
    padding-right: 15px;
    padding-left: 15px;
    ${Txt.s20Wide};
    color: ${t.page.ct2};
  `
  export const PageSec = styled.h4`
    ${resetH};
    ${p => pageSec(p.theme)};
  `
  
  export const pageSec2 = (t: AppTheme.Theme) => css`
    ${pageSec(t)};
    color: ${t.page.ctSec2};
  `
  export const PageSec2 = styled.h4`
    ${resetH};
    ${p => pageSec2(p.theme)};
  `
  
  
  
  export const card3 = (t: AppTheme.Theme) => css`
    ${Txt.s18LhNorm};
    color: ${t.boxNormal.ct[0]};
  `
  export const Card = styled.h4`
    ${resetH};
    ${p => card3(p.theme)};
  `
  
  
  
  export const itemTitleS = (t: AppTheme.Theme) => css`
    ${Txt.s16};
    color: ${t.page.ct2}
  `
  export const ItemTitle = styled.h5`
    ${resetH};
    color: ${p => itemTitleS(p.theme)}
  `
  
  
  
  export const itemTitleBoldS = (t: AppTheme.Theme) => css`
    ${Txt.s16ExtraBold};
    color: ${t.page.ct2}
  `
  export const ItemTitleBold = styled.h5`
    ${resetH};
    color: ${p => itemTitleBoldS(p.theme)}
  `
  
}

