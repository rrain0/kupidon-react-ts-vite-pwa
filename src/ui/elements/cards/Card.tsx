import styled from '@emotion/styled'
import React from "react"
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import col = EmotionCommon.col





const Card = styled.div`
  ${col};
  gap: inherit;
  padding: 12px;
  border-radius: 16px;
  background: ${p=>p.theme.card.bgc[0]};
`
export default Card