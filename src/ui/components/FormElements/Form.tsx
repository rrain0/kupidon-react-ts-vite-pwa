import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import col = EmotionCommon.col



// todo replace with Pages.contentBigGap style and remove
const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 24px;
`
export default Form
