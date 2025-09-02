import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import UseOverlayUrl from 'src/ui/components/UseOverlayUrl/UseOverlayUrl.tsx'
import { SettingsGroup } from 'src/ui/0-elements/basic-elements/SettingsGroup.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { ThemeShortNameUiText } from 'src/ui-data/translations/ThemeShortNameUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ClearSiteDialog, {
  ClearSiteDialogOverlayName
} from 'src/ui/components/ClearSiteConfirmation/ClearSiteDialog.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AllThemes } from 'src/styles/themes/ThemesCollection.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import AddModuleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/AddModuleIc.tsx'
import RadioInput from 'src/ui/0-elements/inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useThemeSettingsZustand } from 'src/zustand/settings/ThemeSettingsZustand.ts'





const ApplicationSettingsPage = React.memo(() => {
  const canInstall = useAppZustand(s => s.canInstall)
  const { light, dark } = useThemeSettingsZustand()
  const setThemeSettings = useThemeSettingsZustand.setState
  
  const actionText = useUiValues(ActionUiText)
  const titleText = useUiValues(TitleUiText)
  const themeNameText = useUiValues(ThemeShortNameUiText)
  
  
  
  
  
  
  const lightThemeOptions = useMemo(() => {
    const opts = AllThemes
      .filter(t => t.type === 'light')
      .map(t => ({
        value: t.name,
        text: themeNameText[t.name],
        icon: <IconBox>{t.icon}</IconBox>,
      }))
    return opts
  }, [themeNameText])
  const darkThemeOptions = useMemo(() => {
    const opts = AllThemes
      .filter(t => t.type === 'dark')
      .map(t => ({
        value: t.name,
        text: themeNameText[t.name],
        icon: <IconBox>{t.icon}</IconBox>,
      }))
    return opts
  }, [themeNameText])
  
  
  
  
  return (
    <>
    
      <PageLayout col data-display-name='ApplicationSettingsPage'>
        <PageContentLayout colSm>
            
            
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            <Flex center><Hdrs.Page>{titleText.appSettings}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.theme}
            </SettingsOptions.Header>
            <ThemeOptions/>
          </SettingsGroup>
          
          
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.lightThemeVariant}
            </SettingsOptions.Header>
            <RadioInputGroup>
              {
                lightThemeOptions.map(opt => (
                  <RadioInput
                    css={RadioInputStyle.radio}
                    childrenPosition='start'
                    checked={opt.value === light}
                    value={opt.value}
                    key={opt.value}
                    onChange={ev => setThemeSettings({ light: opt.value })}
                  >
                    <SettingsOptions.Container>
                      {opt.icon}
                      {opt.text}
                    </SettingsOptions.Container>
                  </RadioInput>
                ))
              }
            </RadioInputGroup>
          </SettingsGroup>
          
          <SettingsGroup>
            <SettingsOptions.Header>
              {titleText.darkThemeVariant}
            </SettingsOptions.Header>
            <RadioInputGroup>
              {
                darkThemeOptions.map(opt => (
                  <RadioInput
                    css={RadioInputStyle.radio}
                    childrenPosition='start'
                    checked={opt.value === dark}
                    value={opt.value}
                    key={opt.value}
                    onChange={ev => setThemeSettings({ dark: opt.value })}
                  >
                    <SettingsOptions.Container>
                      {opt.icon}
                      {opt.text}
                    </SettingsOptions.Container>
                  </RadioInput>
                ))
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
            
            {canInstall && (
              <Button css={normalIconRoundButton}
                onClick={async () => {
                  const installed = await promptInstall()
                  console.log('installed', installed)
                }}
              >
                <AddModuleIc css={SettingsOptions.icon}/>
                {actionText.installApp}
              </Button>
            )}
            
            <UseOverlayUrl overlayName={ClearSiteDialogOverlayName}>
              {overlay => (
                <>
                  <Button css={ButtonS6.t(ButtonS6.S.outlined.rounded.md.normal)}
                    onClick={overlay.open}
                  >
                    {actionText.clearAppData}
                  </Button>
                  
                  <ClearSiteDialog isOpen={overlay.isOpen} close={overlay.close}/>
                </>
              )}
            </UseOverlayUrl>
          
          </RoundButtonsContainer>
        
        
        </PageContentLayout>
      </PageLayout>
      
    </>
  )
})
ApplicationSettingsPage.displayName = 'ApplicationSettingsPage'
export default ApplicationSettingsPage





const IconBox = styled.div`
  ${col};
  height: 1.6em;
  width: 1.6em;
`
const RoundButtonsContainer = styled.div`
  ${col};
  align-items: center;
  gap: 10px;
`
const normalIconRoundButton = (t:AppTheme.Theme) => css`
  ${ButtonS6.t(ButtonS6.S.filled.rounded.md.accent)(t)};
  ${ButtonS6.W.t(t, {
    button: { wMin: 90, g: '0.6em' },
  })}
`
