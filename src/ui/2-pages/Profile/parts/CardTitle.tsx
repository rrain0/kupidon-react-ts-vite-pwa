import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Txt = EmotionCommon.Txt



export const CardTitleSecondary = styled.h4`
  align-self: center;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
  
  ${Txt.lg20Wide};
  
  color: ${p => p.theme.boxNormal.ct3[0]};
`

export const CardTitleNormal = styled(CardTitleSecondary)`
  color: ${p => p.theme.boxNormal.ct[0]};
`


