import styled from '@emotion/styled'
import { withDefaults } from '@util/react/withDefaults.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import contents = EmotionCommon.contents



const Contents = withDefaults({ 'data-display-name': 'Contents' }, styled.div(contents))
Contents.displayName = 'Contents'
export default Contents