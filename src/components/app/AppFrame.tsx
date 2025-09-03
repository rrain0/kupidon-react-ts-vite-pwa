import React from 'react'
import Contents from 'src/ui/0-elements/basic-elements/Contents.tsx'
import AutoLangSettings from 'src/ui/components/AutoLangSettings/AutoLangSettings.tsx'
import AppRouting from 'src/components/app/AppRouting.tsx'




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


