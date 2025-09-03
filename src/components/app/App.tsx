import { css, Global, ThemeProvider } from '@emotion/react'
import { useAppTheme } from '@utils/app/theme/useAppTheme.ts'
import { useSearchParamsUrlListener } from '@utils/url/useSearchParamsUrlListener.ts'
import React from 'react'
import { widget7Test } from '@libs/widget-style-7/WidgetTest.ts'
import UseSwUpdate from 'src/components/components/UseSwUpdate/UseSwUpdate.tsx'
import RequestItemsLiveUpdate from 'src/components/components/live-updates/RequestItemsLiveUpdate.tsx'
import SendLiveOnlineStatus from 'src/components/components/live-updates/SendLiveOnlineStatus.tsx'
import SwListener from 'src/components/components/SwListener.tsx'
import UsePageLifecycle from 'src/components/components/UsePageLifecycle.tsx'
import UseViewportContentSize from 'src/components/components/UseViewportContentSize.tsx'
import CheckBrowserMinimumVersion
  from 'src/components/components/CheckBrowserMinimumVersion/CheckBrowserMinimumVersion.tsx'
import AppFrame from 'src/components/app/AppFrame.tsx'
import ToastifySetup from 'src/components/components/Toasts/ToastifySetup.tsx'
import DragDetector from 'src/components/components/DragDetector.tsx'
import LogLayer from 'src/components/components/LogLayer/LogLayer.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import WsListener from 'src/components/components/WsListener.tsx'
import { useAppInstallationSetup } from '@utils/app/useAppInstallationSetup.ts'
import { useLangSetup } from '@utils/app/lang/useLangSetup.ts'
import { useThemeSetup } from '@utils/app/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars
import {
  testWordsTreeGenerator
} from '@libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { WidgetStyle6NewTest } from '@libs/widget-style-6/WidgetStyleTransformTestNew.ts'
import { WidgetStyle6Test } from '@libs/widget-style-6/WidgetStyleTransformTest.ts'



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





