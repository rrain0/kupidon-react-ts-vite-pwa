import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import Txt = EmotionCommon.Txt







export const formHeader = (t: AppTheme.Theme)=>css`
  ${Txt.large4};
  min-height: 1.5em;
  color: ${t.page.content1[0]};
  align-self: center;
  text-align: center;
`
const FormHeader = styled.h3`
  ${p=>formHeader(p.theme)}
`
export default FormHeader


