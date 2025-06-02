import React from 'react'
import Contents from 'src/ui/0-elements/basic-elements/Contents.tsx'
import AutoLangSettings from 'src/ui/components/AutoLangSettings/AutoLangSettings'
import AppRouting from 'src/ui/App/AppRouting'




const AppFrame = React.memo(() => {
  return (
    <Contents id='app-frame' data-display-name='AppFrame'>
    
      <AppRouting/>
      
      <AutoLangSettings/>
      
    </Contents>
  )
})
AppFrame.displayName = 'AppFrame'
export default AppFrame


