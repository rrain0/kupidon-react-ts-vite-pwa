import { css, Global, ThemeProvider } from '@emotion/react'
import numeral from 'numeral'
import { useRecoilValue } from 'recoil'
import React from 'react'
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




const App = React.memo(
  () => {
    /* const { NODE_ENV, SOME_VAR } = process.env
    console.log('NODE_MODE', NODE_ENV)
    console.log('SOME_VAR', SOME_VAR) */
    
    
    /*
    const rf = (v: number) => {
      console.log('log from rf', v, typeof v)
      return +v
    }
    console.log('numeral(12.53).format(\'0.0\')', numeral(12.53).format('0.0', rf))
    console.log('numeral(12.55).format(\'0.0\')', numeral(12.55).format('0.0', rf))
    console.log('numeral(12.58).format(\'0.0\')', numeral(12.58).format('0.0', rf))
    
    console.log('numeral(-12.53).format(\'0.0\')', numeral(-12.53).format('0.0', rf))
    console.log('numeral(-12.55).format(\'0.0\')', numeral(-12.55).format('0.0', rf))
    console.log('numeral(-12.58).format(\'0.0\')', numeral(-12.58).format('0.0', rf))
     */
    
    
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
                  background: ${t.page.bg[0]};
                }
                
                * {
                  ${isMobile && noScrollbars};
                }
              `}
            />
            
            <DragDetector>
              <AppFrame />
            </DragDetector>
            
            <ToastifySetup />
            
            <LogLayer />
          
          </ThemeProvider>
        )}
      </CheckBrowserMinimumVersion>
    )
  }
)
export default App





