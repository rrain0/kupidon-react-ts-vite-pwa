import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import UseFakePointerRef from 'src/ui/components/ActionProviders/UseFakePointerRef.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { QuickSettingsUiText } from 'src/ui/components/QuickSettings/uiText.ts'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import { Lang } from 'src/ui/lang/Lang.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { CountryFlag } from 'src/ui/lang/CountryFlag.ts'
import { useUiValues } from 'src/ui/lang/useUiText.ts'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState'
import Button from 'src/ui/widgets/Buttons/Button'
import { ButtonStyle } from 'src/ui/widgets/Buttons/ButtonStyle'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons'
import { SvgIcStyle } from 'src/ui/widgets/icons/SvgIcStyle'
import RadioInput from 'src/ui/widgets/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/widgets/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/widgets/inputs/RadioInput/RadioInputStyle.ts'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil.ts'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil.ts'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil.ts'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import Setter = TypeUtils.Callback1
import col = EmotionCommon.col
import row = EmotionCommon.row
import BrowserIc = SvgIcons.BrowserIc
import DayIc = SvgIcons.DayIc
import DayNightIc = SvgIcons.DayNightIc
import AddModuleIc = SvgIcons.AddModuleIc
import BottomSheetBasic from 'src/ui/widgets/BottomSheet/BottomSheetBasic'
import ClearSiteConfirmation from 'src/ui/components/ClearSiteConfirmation/ClearSiteConfirmation.tsx'
import LockIc = SvgIcons.LockIc
import GearIc = SvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import MoonIc = SvgIcons.MoonIc
import ThemeType = AppTheme.Type
import resetH = EmotionCommon.resetH
import onPointerClick = ReactUtils.onPointerClick
import AppLangType = Lang.AppLangType






export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings =
React.memo(
(props: SettingsProps)=>{
  const { open, setOpen } = props
  
  const auth = useRecoilValue(AuthRecoil)
  
  
  const app = useRecoilValue(AppRecoil)
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  
  const uiText = useUiValues(QuickSettingsUiText)
  
  
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
  const isThemeOptionChecked = useCallback(
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
  const isLanguageOptionChecked = useCallback(
    function (value: AppLangType|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting === 'manual' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
  
  
  

  
  
  return <>
    <UseBottomSheetState
      open={open}
      onClosed={()=>setOpen(false)}
    >
      {props =>
      <ModalPortal>
      <BottomSheetBasic {...props.sheetProps}
        header={uiText.settings.text}
      >
        <Content>
          
          <OptionHeader>
            {uiText.theme.text}:
          </OptionHeader>
          <RadioInputGroup>
            { themeOptions.map(opt =>
            <RadioInput css={RadioInputStyle.radio}
              childrenPosition="start"
              checked={isThemeOptionChecked(opt.value)}
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
          
          
          <OptionHeader>
            {uiText.language.text}:
          </OptionHeader>
          <RadioInputGroup>
            { languageOptions.map(opt =>
            <RadioInput
              css={RadioInputStyle.radio}
              childrenPosition="start"
              checked={isLanguageOptionChecked(opt.value)}
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
            </RadioInput>
            )}
          </RadioInputGroup>
          
          <RoundButtonsContainer>
            
            {auth && <Link to={RootRoute.settings.account[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <LockIc css={[
                  icon,
                  css`translate: 0 -0.1em;`,
                ]}/>
                {uiText.accountSettings.text}
              </Button>
            </Link>}
            
            <Link to={RootRoute.settings.app[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <GearIc css={icon}/>
                {uiText.appSettings.text}
              </Button>
            </Link>
            
            <Link to={RootRoute.test[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                {uiText.testPage.text}
              </Button>
            </Link>
            
            {app.canInstall && <Button css={normalIconRoundButton}
              onClick={async () => await promptInstall()}
            >
              <AddModuleIc css={icon}/>
              {uiText.installApp.text}
            </Button>}
            
            <UseBool>{bool => <>
              
              <UseFakePointerRef>{({ ref })=>
                <Button css={normalIconRoundButton}
                  //onClick={bool.setTrue}
                  ref={ref as any}
                  {...onPointerClick(bool.setTrue)}
                >
                  {uiText.clearAppData.text}
                </Button>
              }</UseFakePointerRef>
              
              <ClearSiteConfirmation open={bool.value} setOpen={bool.setValue}/>
            </>}</UseBool>
          
          
          </RoundButtonsContainer>
        
        
        </Content>
      </BottomSheetBasic>
      </ModalPortal>
    }</UseBottomSheetState>
    
    
    
  </>
})
export default QuickSettings



const Content = styled.div`
  ${col};
  padding-bottom: 20px;
`

const OptionHeader = styled.h5`
  ${resetH};
  padding: 8px 6px;
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
    height: 1.3em;
    width: 1.333em;
    ${SvgIcStyle.Prop.prop.color}: ${ButtonStyle.Prop.color.sel()};
  }
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




