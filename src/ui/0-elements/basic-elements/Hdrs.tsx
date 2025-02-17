import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH



// Headers
export namespace Hdrs {
  
  export const page = (t: AppTheme.Theme) => css`
    align-self: center;
    text-align: center;
    // В фигме заголовки страниц жирные, но обычнфм шрифтом лучше смотрится
    ${Txt.s24Wide};
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
    color: ${t.page.ct2};
  `
  export const ItemTitle = styled.h5`
    ${resetH};
    ${p => itemTitleS(p.theme)};
  `
  
  
  
  export const itemTitleBoldS = (t: AppTheme.Theme) => css`
    ${Txt.s16ExtraBold};
    color: ${t.page.ct2};
  `
  export const ItemTitleBold = styled.h5`
    ${resetH};
    ${p => itemTitleBoldS(p.theme)};
  `
  
  
  
  export const inputTitleBoldS = (t: AppTheme.Theme) => css`
    ${itemTitleBoldS(t)};
    padding-left: 12px;
  `
  export const InputTitleBold = styled.h5`
    ${resetH};
    ${p => inputTitleBoldS(p.theme)};
  `
  
  
  
  
  
}

