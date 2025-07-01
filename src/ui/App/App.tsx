import { css, Global, ThemeProvider } from '@emotion/react'
import { useAppTheme } from '@util/app/useAppTheme.ts'
import { useSearchParamsUrlListener } from '@util/url/useSearchParamsUrlListener.ts'
import React from 'react'
import { widget7Test } from 'src/mini-libs/widget-style-7/WidgetTest.ts'
import ReloadPrompt from 'src/ui/1-widgets/ReloadPrompt/ReloadPrompt.tsx'
import UsePageLifecycle from 'src/ui/components/UsePageLifecycle.tsx'
import UseViewportContentSize from 'src/ui/components/UseViewportContentSize.tsx'
import CheckBrowserMinimumVersion
  from 'src/ui/components/CheckBrowserMinimumVersion/CheckBrowserMinimumVersion.tsx'
import AppFrame from 'src/ui/App/AppFrame'
import ToastifySetup from 'src/ui/components/Toasts/ToastifySetup'
import DragDetector from 'src/ui/components/DragDetector.tsx'
import LogLayer from 'src/ui/components/LogLayer/LogLayer.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { useAppInstallationSetup } from 'src/util/app/useAppInstallationSetup'
import { useLangSetup } from 'src/util/lang/useLangSetup.ts'
import { useThemeSetup } from 'src/util/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars
import {
  testWordsTreeGenerator
} from 'src/mini-libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { WidgetStyle6NewTest } from 'src/mini-libs/widget-style-6/WidgetStyleTransformTestNew.ts'
import { WidgetStyle6Test } from 'src/mini-libs/widget-style-6/WidgetStyleTransformTest.ts'



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
            
            <ReloadPrompt/>
            
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





