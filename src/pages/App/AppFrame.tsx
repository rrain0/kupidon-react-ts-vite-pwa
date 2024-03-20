/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import AutoLangSettings from 'src/components/AutoLangSettings/AutoLangSettings'
import AppRouting from 'src/pages/App/AppRouting'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import contents = EmotionCommon.contents




const AppFrame =
React.memo(
()=>{
  
  return <div css={contents} id='app-frame'>
    
    <AppRouting/>
    
    <AutoLangSettings />
    
  </div>
})
export default AppFrame


