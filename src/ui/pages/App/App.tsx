import { css, Global, ThemeProvider } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import React from 'react'
import CheckBrowserMinimumVersion
  from 'src/ui/components/CheckBrowserMinimumVersion/CheckBrowserMinimumVersion.tsx'
import AppFrame from 'src/ui/pages/App/AppFrame'
import ToastifySetup from 'src/ui/components/Toasts/ToastifySetup'
import DragDetector from 'src/ui/pages/App/DragDetector'
import LogLayer from 'src/ui/pages/App/LogLayer'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { useAppInstallationSetup } from 'src/util/app/useAppInstallationSetup'
import { useLangSetup } from '@util/lang/useLangSetup.ts'
import { useThemeSetup } from '@util/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars




const App =
React.memo(
()=>{
  /* const { NODE_ENV, SOME_VAR } = process.env
  console.log('NODE_MODE', NODE_ENV)
  console.log('SOME_VAR', SOME_VAR) */
  
  
  useAppInstallationSetup()
  useLangSetup()
  const themeIsReady = useThemeSetup()
  
  const theme = useRecoilValue(ThemeRecoil)
  
  return <CheckBrowserMinimumVersion>
    {themeIsReady && <ThemeProvider theme={theme.theme}>
      
      <Global styles={t => css`
        body {
          // will be WINDOW background
          background: ${t.page.bgc[0]};
        }
        
        * {
          ${isMobile && noScrollbars};
        }
      `}/>
      
      <DragDetector>
        <AppFrame/>
      </DragDetector>
      
      <ToastifySetup/>
      
      <LogLayer/>
    
    </ThemeProvider>}
  </CheckBrowserMinimumVersion>
})
export default App





