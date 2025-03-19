import { css, Global, ThemeProvider } from '@emotion/react'
import React from 'react'
import {
  testWordsTreeGenerator
} from 'src/mini-libs/widget-style-6/transform/CamelCaseWordsTree.ts'
import { WidgetStyle6NewTest } from 'src/mini-libs/widget-style-6/WidgetStyleTransformTestNew.ts'
import ReloadPrompt from 'src/ui/1-widgets/ReloadPrompt/ReloadPrompt.tsx'
import UseViewportContentSize from 'src/ui/App/UseViewportContentSize.tsx'
import CheckBrowserMinimumVersion
  from 'src/ui/components/CheckBrowserMinimumVersion/CheckBrowserMinimumVersion.tsx'
import AppFrame from 'src/ui/App/AppFrame'
import ToastifySetup from 'src/ui/components/Toasts/ToastifySetup'
import DragDetector from 'src/ui/App/DragDetector'
import LogLayer from 'src/ui/App/LogLayer'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { useAppInstallationSetup } from 'src/util/app/useAppInstallationSetup'
import { useLangSetup } from 'src/util/lang/useLangSetup.ts'
import { useThemeSetup } from 'src/util/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars
import { WidgetStyle6Test } from 'src/mini-libs/widget-style-6/WidgetStyleTransformTest.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'




// todo remove
//WidgetStyle6Test.testTransform()
//WidgetStyle6Test.testWidget()
//testWordsTreeGenerator()
WidgetStyle6NewTest.testTransformSimple()



const App = React.memo(() => {
  
  useAppInstallationSetup()
  useLangSetup()
  const themeIsReady = useThemeSetup()
  
  const theme = useAppZustand(s => s.theme)
  
  return (
    <CheckBrowserMinimumVersion>
      
      <UseViewportContentSize />
      
      {themeIsReady && (
        <ThemeProvider theme={theme}>
          
          <Global
            styles={t => css`
              body {
                // will be WINDOW background
                background: ${t.page.bg};
              }
              
              * {
                ${isMobile && noScrollbars};
              }
            `}
          />
          
          <DragDetector>
            <AppFrame />
          </DragDetector>
          
          <ReloadPrompt />
          
          <ToastifySetup />
          
          <LogLayer />
        
        </ThemeProvider>
      )}
    </CheckBrowserMinimumVersion>
  )
})
export default App





