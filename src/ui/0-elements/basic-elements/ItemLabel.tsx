import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Txt = EmotionCommon.Txt



const ItemLabel =
React.memo(
styled.label`
  padding-left: 12px;
  ${Txt.lg16};
  font-weight: 700;
  color: ${p=>p.theme.page.ct2}
`)
export default ItemLabel