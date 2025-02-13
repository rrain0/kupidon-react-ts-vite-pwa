import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH






export const ItemTitle = styled.h5`
  ${resetH};
  padding-left: 12px;
  ${Txt.s16};
  color: ${p => p.theme.page.ct2}
`

export const ItemTitleBold = styled(ItemTitle)`
  padding-left: 12px;
  ${Txt.s16ExtraBold};
  color: ${p => p.theme.page.ct2}
`