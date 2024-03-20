/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Txt = EmotionCommon.Txt







export const formHeaderStyle = (t: AppTheme.Theme)=>css`
  ${Txt.large4};
  min-height: 1.5em;
  color: ${t.page.content1[0]};
  align-self: center;
  text-align: center;
`
const FormHeader = styled.h3`
  ${p=>formHeaderStyle(p.theme)}
`
export default FormHeader


