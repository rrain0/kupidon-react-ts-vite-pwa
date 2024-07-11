import React from 'react'
import AutoLangSettings from 'src/ui/components/AutoLangSettings/AutoLangSettings'
import AppRouting from 'src/ui/App/AppRouting'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import contents = EmotionCommon.contents




const AppFrame =
React.memo(
() => {
  
  return <div css={contents} id='app-frame'>
    
    <AppRouting/>
    
    <AutoLangSettings />
    
  </div>
})
export default AppFrame


