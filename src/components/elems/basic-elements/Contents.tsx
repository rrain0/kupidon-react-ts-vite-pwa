import styled from '@emotion/styled'
import { withDefaults } from '@utils/react/withDefaults.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import contents = EmotionCommon.contents



const Contents = withDefaults(styled.div(contents), {
  'data-display-name': 'Contents',
})
Contents.displayName = 'Contents'
export default Contents