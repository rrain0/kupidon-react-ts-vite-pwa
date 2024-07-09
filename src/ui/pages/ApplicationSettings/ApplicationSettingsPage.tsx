import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import UseOverlayUrl from 'src/ui/components/UseOverlayUrl/UseOverlayUrl.tsx'
import { SettingsGroup } from 'src/ui/elements/basic-elements/SettingsGroup.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { ThemeShortNameUiText } from 'src/ui-data/translations/ThemeShortNameUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import ClearSiteDialog, {
  ClearSiteDialogOverlayName
} from 'src/ui/components/ClearSiteConfirmation/ClearSiteDialog.tsx'
import FormHeader from 'src/ui/elements/basic-elements/Hs'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { AllThemes } from 'src/ui-data/theme/ThemeCollection.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import Button from 'src/ui/elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import AddModuleIc = SvgIcons.AddModuleIc
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'





const ApplicationSettingsPage =
React.memo(
()=>{
  const app = useRecoilValue(AppRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  
  const actionText = useUiValues(ActionUiText)
  const titleText = useUiValues(TitleUiText)
  const themeNameText = useUiValues(ThemeShortNameUiText)
  
  
  
  
  
  
  const lightThemeOptions = useMemo(
    ()=>{
      let opts = AllThemes
        .filter(t=>t.type==='light')
        .map(t=>({
          value: t.name,
          text: themeNameText[t.name],
          icon: <t.icon css={divIcon}/>,
        }))
      return opts
    },
    [themeNameText]
  )
  const darkThemeOptions = useMemo(
    ()=>{
      let opts = AllThemes
        .filter(t=>t.type==='dark')
        .map(t=>({
          value: t.name,
          text: themeNameText[t.name],
          icon: <t.icon css={divIcon}/>,
        }))
      return opts
    },
    [themeNameText]
  )
  
  
  
  
  return <>
    
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
        
          <FormHeader>{titleText.appSettings}</FormHeader>
          
          
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.theme}
            </SettingsOptions.Header>
            <ThemeOptions/>
          </SettingsGroup>
          
          
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.preferredLightTheme}
            </SettingsOptions.Header>
            <RadioInputGroup>
              {
                lightThemeOptions.map(opt => <RadioInput
                  css={RadioInputStyle.radio}
                  childrenPosition="start"
                  checked={opt.value===themeSettings.light}
                  value={opt.value}
                  key={opt.value}
                  onChange={ev => {
                    setThemeSettings(s => ({
                      ...s,
                      light: opt.value,
                    }))
                  }}
                >
                  <SettingsOptions.Container>
                    {opt.icon}
                    {opt.text}
                  </SettingsOptions.Container>
                </RadioInput>)
              }
            </RadioInputGroup>
          </SettingsGroup>
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.preferredDarkTheme}
            </SettingsOptions.Header>
            <RadioInputGroup>
              {
                darkThemeOptions.map(opt => <RadioInput
                  css={RadioInputStyle.radio}
                  childrenPosition="start"
                  checked={opt.value===themeSettings.dark}
                  value={opt.value}
                  key={opt.value}
                  onChange={ev => {
                    setThemeSettings(s => ({
                      ...s,
                      dark: opt.value,
                    }))
                  }}
                >
                  <SettingsOptions.Container>
                    {opt.icon}
                    {opt.text}
                  </SettingsOptions.Container>
                </RadioInput>)
              }
            </RadioInputGroup>
          </SettingsGroup>
          
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.language}
            </SettingsOptions.Header>
            <LangOptions/>
          </SettingsGroup>
          
          
          <RoundButtonsContainer>
            
            {app.canInstall && <Button css={normalIconRoundButton}
              onClick={async()=>{
                const installed = await promptInstall()
                console.log('installed', installed)
              }}
            >
              <AddModuleIc css={SettingsOptions.icon}/>
              {actionText.installApp}
            </Button>}
            
            <UseOverlayUrl overlayName={ClearSiteDialogOverlayName}>
              {overlay=><>
                <Button css={ButtonStyle.outlinedRoundedNormalNormal}
                  onClick={overlay.open}
                >
                  {actionText.clearAppData}
                </Button>
                
                <ClearSiteDialog isOpen={overlay.isOpen} close={overlay.close}/>
              </>}
            </UseOverlayUrl>
          
          </RoundButtonsContainer>
        
        
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      
      <PageScrollbars />
    </Pages.Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar />
    
    
  </>
})
export default ApplicationSettingsPage





const divIcon = css`
  height: 1.6em;
  width: 1.6em;
`
const RoundButtonsContainer = styled.div`
  ${col};
  align-items: center;
  gap: 10px;
`
const normalIconRoundButton = (t:AppTheme.Theme)=>css`
  ${ButtonStyle.filledRoundedNormalAccent(t)};
  ${ButtonStyle.W.use.s.normal().e.button().thisUse} {
    min-width: 90px;
    gap: 0.6em;
  }
`
