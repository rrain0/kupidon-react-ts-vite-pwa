import { css, Global, ThemeProvider } from '@emotion/react'
import { useAppTheme } from '@utils/app/useAppTheme.ts'
import { useSearchParamsUrlListener } from '@utils/url/useSearchParamsUrlListener.ts'
import React from 'react'
import { widget7Test } from '@mini-libs/widget-style-7/WidgetTest.ts'
import UseSwUpdate from 'src/ui/components/UseSwUpdate/UseSwUpdate.tsx'
import RequestItemsLiveUpdate from 'src/ui/components/live-updates/RequestItemsLiveUpdate.tsx'
import SendLiveOnlineStatus from 'src/ui/components/live-updates/SendLiveOnlineStatus.tsx'
import SwListener from 'src/ui/components/SwListener.tsx'
import UsePageLifecycle from 'src/ui/components/UsePageLifecycle.tsx'
import UseViewportContentSize from 'src/ui/components/UseViewportContentSize.tsx'
import CheckBrowserMinimumVersion
  from 'src/ui/components/CheckBrowserMinimumVersion/CheckBrowserMinimumVersion.tsx'
import AppFrame from 'src/components/app/AppFrame.tsx'
import ToastifySetup from 'src/ui/components/Toasts/ToastifySetup.tsx'
import DragDetector from 'src/ui/components/DragDetector.tsx'
import LogLayer from 'src/ui/components/LogLayer/LogLayer.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import WsListener from 'src/ui/components/WsListener.tsx'
import { useAppInstallationSetup } from '@utils/app/useAppInstallationSetup.ts'
import { useLangSetup } from '@utils/lang/useLangSetup.ts'
import { useThemeSetup } from '@utils/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars
import {
  testWordsTreeGenerator
} from '@mini-libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { WidgetStyle6NewTest } from '@mini-libs/widget-style-6/WidgetStyleTransformTestNew.ts'
import { WidgetStyle6Test } from '@mini-libs/widget-style-6/WidgetStyleTransformTest.ts'



// todo remove
//WidgetStyle6Test.testTransform()
//WidgetStyle6Test.testWidget()
//testWordsTreeGenerator()
//WidgetStyle6NewTest.testTransformSimple()
widget7Test()



const App = React.memo(() => {
  
  useSearchParamsUrlListener()
  
  useAppInstallationSetup()
  useLangSetup()
  const themeIsReady = useThemeSetup()
  
  const theme = useAppTheme()
  
  return (
    <CheckBrowserMinimumVersion>
      
      <UsePageLifecycle/>
      
      <SwListener/>
      <WsListener/>
      
      <RequestItemsLiveUpdate/>
      <SendLiveOnlineStatus/>
      
      <UseViewportContentSize>
        
        {themeIsReady && (
          <ThemeProvider theme={theme}>
            
            <Global
              styles={t => css({
                body: {
                  backgroundColor: t.page.bg, // will be WINDOW background
                  color: t.page.ct,
                },
                ...isMobile && { '*': noScrollbars },
              })}
            />
            
            <DragDetector>
              <AppFrame/>
            </DragDetector>
            
            <UseSwUpdate/>
            
            <ToastifySetup/>
            
            <LogLayer/>
          
          </ThemeProvider>
        )}
        
      </UseViewportContentSize>
      
    </CheckBrowserMinimumVersion>
  )
})
App.displayName = 'App'
export default App





