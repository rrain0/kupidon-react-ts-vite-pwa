/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import ClearSiteConfirmation from 'src/components/ClearSiteConfirmation/ClearSiteConfirmation'
import FormHeader from 'src/components/FormElements/FormHeader'
import { Pages } from 'src/components/Page/Pages'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import {
  ApplicationSettingsUiText
} from 'src/pages/ApplicationSettings/uiText'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Lang } from 'src/utils/lang/Lang'
import { ThemeNameUiText } from 'src/utils/lang/ui-values/ThemeNameUiText'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiValues } from 'src/utils/lang/useUiText'
import { AllThemes } from 'src/utils/theme/ThemeCollection'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import { CommonStyle } from 'src/views/CommonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import Page = Pages.Page
import ThemeType = AppTheme.Type
import BrowserIc = SvgIcons.BrowserIc
import DayNightIc = SvgIcons.DayNightIc
import DayIc = SvgIcons.DayIc
import MoonIc = SvgIcons.MoonIc
import resetH = EmotionCommon.resetH
import row = EmotionCommon.row
import AddModuleIc = SvgIcons.AddModuleIc
import AppLangType = Lang.AppLangType










const ApplicationSettingsPage =
React.memo(
()=>{
  const app = useRecoilValue(AppRecoil)
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  const uiText = useUiValues(ApplicationSettingsUiText)
  const themeNameUiText = useUiValues(ThemeNameUiText)
  
  const [clearSite, setClearSite] = useState(false)
  
  
  
  const themeOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiText.systemTheme.text,
          icon: <DayNightIc css={icon}/>,
        },{
          value: 'light',
          text: uiText.lightTheme.text,
          icon: <DayIc css={icon}/>,
        },{
          value: 'dark',
          text: uiText.darkTheme.text,
          icon: <MoonIc css={iconSmall}/>,
        }
      ] satisfies { value: ThemeType|'system', [prop: string]: any }[]
      if (!theme.systemThemeAvailable) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, theme.systemThemeAvailable]
  )
  const themeOptionChecked = useCallback(
    function (value: ThemeType|'system') {
      return themeSettings.setting === 'system' && value === 'system'
        || themeSettings.setting === 'manual' && value === themeSettings.manualSetting
    },
    [themeSettings]
  )
  
  
  
  const languageOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiText.systemLanguage.text,
          icon: <BrowserIc css={icon}/>,
        },{
          value: 'ru-RU',
          text: uiText.russian.text,
          icon: <Flag src={CountryFlag['ru-RU']}/>,
        },{
          value: 'en-US',
          text: uiText.english.text,
          icon: <Flag src={CountryFlag['en-US']}/>,
        }
      ] satisfies { value: AppLangType|'system', [prop: string]: any }[]
      if (!lang.availableSystemLangs?.length) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, lang.availableSystemLangs]
  )
  const languageOptionChecked = useCallback(
    function (value: AppLangType|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting === 'manual' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
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
          <RadioInputGroup>
            {
              themeOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={themeOptionChecked(opt.value)}
                value={opt.value}
                key={opt.value}
                onChange={ev => {
                  setThemeSettings(s => ({
                    ...s,
                    setting: opt.value === 'system' ? 'system' : 'manual',
                    manualSetting: opt.value === 'system' ? s.manualSetting : opt.value,
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
          <RadioInputGroup>
            {
              languageOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={languageOptionChecked(opt.value)}
                value={opt.value}
                key={opt.value}
                onChange={ev => {
                  if (opt.value === 'system') setLangSettings({
                    ...langSettings,
                    setting: 'system',
                  })
                  else {
                    setLangSettings({
                      setting: 'manual',
                      manualSetting: [opt.value],
                    })
                  }
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
        
        
        {/* todo: Добавить настройки звука в приложении */}
        
        
        <RoundButtonsContainer>
          
          {app.canInstall && <Button css={normalIconRoundButton}
            onClick={async()=>{
              const installed = await promptInstall()
              console.log('installed', installed)
            }}
          >
            <AddModuleIc css={icon}/>
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







const OptionHeader = styled.h5`
  ${resetH};
  padding: 8px 6px 0 6px;
  color: ${p=>p.theme.page.content3[0]};
`
const OptionContainer = styled.div`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  ${row};
  gap: 0.3em;
  align-items: center;
`
const Flag = styled.img`
  width: 1.333em;
  aspect-ratio: 4/3;
  object-position: center;
  object-fit: cover;
  vertical-align: middle;
`
const icon = (t:AppTheme.Theme)=>css`
  ${SvgIcStyle.El.thiz.icon} {
    height: 1.333em;
    width: 1.333em;
    ${SvgIcStyle.Prop.prop.color}: ${CommonStyle.Prop0.varr.color};
  }
`
const divIcon = css`
  height: 1.6em;
  width: 1.6em;
`
const iconSmall = (t:AppTheme.Theme)=>css`
  ${icon(t)};
  ${SvgIcStyle.El.thiz.icon} {
    height: 1.25em;
  }
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
