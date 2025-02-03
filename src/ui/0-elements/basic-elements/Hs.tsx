import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Txt = EmotionCommon.Txt






// todo replace by Headers.page
export const formHeader = (t: AppTheme.Theme) => css`
  ${Txt.lg28Bold};
  min-height: 1.5em;
  color: ${t.page.ct1};
  align-self: center;
  text-align: center;
`
const FormHeader = styled.h3`
  ${p => formHeader(p.theme)}
`
export default FormHeader


// Headers
export namespace Hs {
  
  export const page = (t: AppTheme.Theme) => css`
    ${Txt.lg24Lh150};
    min-height: 1.5em;
    color: ${t.page.ct1};
    align-self: center;
    text-align: center;
  `
  export const Page = styled.h3`${p => page(p.theme)}`
  
  
  export const card3 = (t: AppTheme.Theme) => css`
    ${Txt.lg18};
    color: ${t.boxNormal.ct[0]};
  `
  export const Card3 = styled.h4`${p => card3(p.theme)}`
  
}

