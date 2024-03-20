/** @jsxImportSource @emotion/react */
import { css, Global, ThemeProvider } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import React from 'react'
import ModalOutlet from 'src/components/Modal/ModalOutlet'
import AppFrame from 'src/pages/App/AppFrame'
import ToastifySetup from 'src/components/Toasts/ToastifySetup'
import DragDetector from 'src/pages/App/DragDetector'
import LogLayer from 'src/pages/App/LogLayer'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { useAppInstallationSetup } from 'src/utils/app/useAppInstallationSetup'
import { useLangSetup } from 'src/utils/lang/useLangSetup'
import { useThemeSetup } from 'src/utils/theme/useThemeSetup'
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





