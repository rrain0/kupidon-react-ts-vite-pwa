import { css, Global, ThemeProvider } from '@emotion/react'
import { StringU } from '@util/common/StringU.ts'
import { useRecoilValue } from 'recoil'
import React from 'react'
import ReloadPrompt from 'src/ui/1-widgets/ReloadPrompt/ReloadPrompt.tsx'
import CheckBrowserMinimumVersion
  from 'src/ui/components/CheckBrowserMinimumVersion/CheckBrowserMinimumVersion.tsx'
import AppFrame from 'src/ui/App/AppFrame'
import ToastifySetup from 'src/ui/components/Toasts/ToastifySetup'
import DragDetector from 'src/ui/App/DragDetector'
import LogLayer from 'src/ui/App/LogLayer'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { useAppInstallationSetup } from 'src/util/app/useAppInstallationSetup'
import { useLangSetup } from 'src/util/lang/useLangSetup.ts'
import { useThemeSetup } from 'src/util/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars
import {
  testWidget51StyleTransform,
} from 'src/mini-libs/widget-style-6/WidgetStyleTransformTest.ts'
import { testDevWidgetStyle4 } from 'src/mini-libs/widget-style-4/style/WidgetStyle.ts'
import camelCaseToKebabCase = StringU.camelCaseToKebabCase




// todo remove
//testDevWidgetStyle4()
//console.log(camelCaseToKebabCase('placeSubType0a'))
testWidget51StyleTransform()



const App = React.memo(() => {
  useAppInstallationSetup()
  useLangSetup()
  const themeIsReady = useThemeSetup()
  
  const theme = useRecoilValue(ThemeRecoil)
  
  return (
    <CheckBrowserMinimumVersion>
      {themeIsReady && (
        <ThemeProvider theme={theme.theme}>
          
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





