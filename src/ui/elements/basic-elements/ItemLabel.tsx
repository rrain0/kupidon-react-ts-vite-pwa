import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import Txt = EmotionCommon.Txt



const ItemLabel =
React.memo(
styled.label`
  padding-left: 12px;
  ${Txt.large1};
  font-weight: 700;
  color: ${p=>p.theme.page.content2[0]}
`)
export default ItemLabel