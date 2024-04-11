import { css, Global, ThemeProvider } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import React from 'react'
import ModalOutlet from 'src/ui/components/Modal/ModalOutlet'
import AppFrame from 'src/ui/pages/App/AppFrame'
import ToastifySetup from 'src/ui/components/Toasts/ToastifySetup'
import DragDetector from 'src/ui/pages/App/DragDetector'
import LogLayer from 'src/ui/pages/App/LogLayer'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { useAppInstallationSetup } from 'src/util/app/useAppInstallationSetup'
import { useLangSetup } from 'src/ui/lang/useLangSetup.ts'
import { useThemeSetup } from 'src/ui/theme/useThemeSetup.ts'
import { isMobile } from 'react-device-detect'
import noScrollbars = EmotionCommon.noScrollbars





const App =
React.memo(
()=>{
  useAppInstallationSetup()
  useLangSetup()
  useThemeSetup()
  
  const theme = useRecoilValue(ThemeRecoil)
  
  
  
  
  if (!theme.themeIsReady) return <></>
  return <ThemeProvider theme={theme.theme}>
    
    <Global styles={t=>css`
      body {
        // will be WINDOW background
        background: ${t.page.bgc[0]};
      }
      
      * {
        ${isMobile && noScrollbars };
      }
    `}/>
    
    <DragDetector>
      <AppFrame/>
    </DragDetector>
    
    <ModalOutlet/>
    
    <ToastifySetup/>
    
    <LogLayer/>
    
  </ThemeProvider>
})
export default App





