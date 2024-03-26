import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import ClearSiteConfirmation from 'src/ui/components/ClearSiteConfirmation/ClearSiteConfirmation'
import FormHeader from 'src/ui/components/FormElements/FormHeader'
import LangOptions from 'src/ui/components/options/LangOptions.tsx'
import {
  OptionContainer,
  OptionHeader,
  optionIcon,
} from 'src/ui/components/options/OptionsCommon.tsx'
import { Pages } from 'src/ui/components/Page/Pages'
import PageScrollbars from 'src/ui/components/Scrollbars/PageScrollbars'
import ThemeOptions from 'src/ui/components/options/ThemeOptions.tsx'
import {
  ApplicationSettingsUiText
} from 'src/ui/pages/ApplicationSettings/uiText'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { ThemeNameUiText } from 'src/ui/ui-text/ui-values/ThemeNameUiText'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { AllThemes } from 'src/ui/theme/ThemeCollection.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import Button from 'src/ui/widgets/Buttons/Button'
import { ButtonStyle } from 'src/ui/widgets/Buttons/ButtonStyle'
import Card from 'src/ui/widgets/Card.tsx'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons'
import RadioInput from 'src/ui/widgets/inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/ui/widgets/inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/ui/widgets/inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import Page = Pages.Page
import AddModuleIc = SvgIcons.AddModuleIc










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
    
    <Page>
      <Content>
        
        <FormHeader>{uiText.appSettings.text}</FormHeader>
        
        
        
        <Card>
          <OptionHeader>
            {uiText.theme.text}
          </OptionHeader>
          <ThemeOptions/>
        </Card>
        
        
        
        <Card>
          <OptionHeader>
            {uiText.preferredLightTheme.text}
          </OptionHeader>
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
                <OptionContainer>
                  {opt.icon}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        </Card>
        
        <Card>
          <OptionHeader>
            {uiText.preferredDarkTheme.text}
          </OptionHeader>
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
                <OptionContainer>
                  {opt.icon}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        </Card>
        
        
        <Card>
          <OptionHeader>
            {uiText.language.text}
          </OptionHeader>
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
            <AddModuleIc css={optionIcon}/>
            {uiText.installApp.text}
          </Button>}
          
          <Button css={ButtonStyle.roundedDanger}
            onClick={()=>setClearSite(true)}
          >
            {uiText.clearAppData.text}
          </Button>
        
        </RoundButtonsContainer>
        
        
      
      </Content>
      
      
      <PageScrollbars />
    </Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar />
    
    
    <ClearSiteConfirmation open={clearSite} setOpen={setClearSite} />
    
    
  </>
})
export default ApplicationSettingsPage






const Content = styled.div`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 10px;
`
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
