import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar'
import ClearSiteConfirmation from 'src/ui/widgets/ClearSiteConfirmation/ClearSiteConfirmation'
import FormHeader from 'src/ui/elements/basic-elements/Hs'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import {
  ApplicationSettingsUiText
} from 'src/ui/pages/ApplicationSettings/uiText'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ThemeNameUiText } from 'src/ui/ui-text/ui-values/ThemeNameUiText'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { AllThemes } from 'src/ui/theme/ThemeCollection.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import Button from 'src/ui/elements/Buttons/Button'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle'
import Card from 'src/ui/elements/cards/Card.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import AddModuleIc = SvgIcons.AddModuleIc
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'










const ApplicationSettingsPage =
React.memo(
()=>{
  const app = useRecoilValue(AppRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  
  const uiText = useUiValues(ApplicationSettingsUiText)
  const themeNameUiText = useUiValues(ThemeNameUiText)
  
  const [clearSite, setClearSite] = useState(false)
  
  
  
  
  const lightThemeOptions = useMemo(
    ()=>{
      let opts = AllThemes
        .filter(t=>t.type==='light')
        .map(t=>({
          value: t.name,
          text: themeNameUiText[t.name].text,
          icon: <t.icon css={divIcon}/>,
        }))
      return opts
    },
    [themeNameUiText]
  )
  const darkThemeOptions = useMemo(
    ()=>{
      let opts = AllThemes
        .filter(t=>t.type==='dark')
        .map(t=>({
          value: t.name,
          text: themeNameUiText[t.name].text,
          icon: <t.icon css={divIcon}/>,
        }))
      return opts
    },
    [themeNameUiText]
  )
  
  
  
  return <>
    
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.Content>
        
          <FormHeader>{uiText.appSettings.text}</FormHeader>
          
          
          
          <Card>
            <SettingsOptions.Header>
              {uiText.theme.text}
            </SettingsOptions.Header>
            <ThemeOptions/>
          </Card>
          
          
          
          <Card>
            <SettingsOptions.Header>
              {uiText.preferredLightTheme.text}
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
          </Card>
          
          <Card>
            <SettingsOptions.Header>
              {uiText.preferredDarkTheme.text}
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
          </Card>
          
          
          <Card>
            <SettingsOptions.Header>
              {uiText.language.text}
            </SettingsOptions.Header>
            <LangOptions/>
          </Card>
          
          
          {/* todo: Добавить настройки звука в приложении */}
          
          
          <RoundButtonsContainer>
            
            {app.canInstall && <Button css={normalIconRoundButton}
              onClick={async()=>{
                const installed = await promptInstall()
                console.log('installed', installed)
              }}
            >
              <AddModuleIc css={SettingsOptions.icon}/>
              {uiText.installApp.text}
            </Button>}
            
            <Button css={ButtonStyle.roundedDanger}
              onClick={()=>setClearSite(true)}
            >
              {uiText.clearAppData.text}
            </Button>
          
          </RoundButtonsContainer>
        
        
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      
      <PageScrollbars />
    </Pages.Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar />
    
    
    <ClearSiteConfirmation open={clearSite} setOpen={setClearSite} />
    
    
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
  ${ButtonStyle.roundedAccent(t)};
  ${ButtonStyle.El.btn.thiz()} {
    min-width: 90px;
    gap: 0.6em;
  }
`
