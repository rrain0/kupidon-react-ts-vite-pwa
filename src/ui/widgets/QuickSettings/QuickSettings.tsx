import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { QuickSettingsUiText } from 'src/ui/widgets/QuickSettings/uiText.ts'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/elements/Buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import Setter = TypeUtils.Callback1
import col = EmotionCommon.col
import AddModuleIc = SvgIcons.AddModuleIc
import BottomSheetBasic from 'src/ui/elements/BottomSheet/BottomSheetBasic.tsx'
import ClearSiteConfirmation from 'src/ui/widgets/ClearSiteConfirmation/ClearSiteConfirmation.tsx'
import LockIc = SvgIcons.LockIc
import GearIc = SvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import onPointerClick = ReactUtils.onPointerClick
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'






export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings =
React.memo(
(props: SettingsProps)=>{
  const { open, setOpen } = props
  
  const auth = useRecoilValue(AuthRecoil)
  const [app, setApp] = useRecoilState(AppRecoil)
  const uiText = useUiValues(QuickSettingsUiText)
  
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
          
          <SettingsOptions.Header>
            {uiText.theme.text}:
          </SettingsOptions.Header>
          <ThemeOptions/>
          
          
          <SettingsOptions.Header>
            {uiText.language.text}:
          </SettingsOptions.Header>
          <LangOptions/>
          
          <RoundButtonsContainer>
            
            {auth && <Link to={RootRoute.settings.account[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <LockIc css={[
                  SettingsOptions.icon,
                  css`translate: 0 -0.1em;`,
                ]}/>
                {uiText.accountSettings.text}
              </Button>
            </Link>}
            
            <Link to={RootRoute.settings.app[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <GearIc css={SettingsOptions.icon}/>
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
              <AddModuleIc css={SettingsOptions.icon}/>
              {uiText.installApp.text}
            </Button>}
            
            <UseBool>{bool => <>
              
              <Button css={normalIconRoundButton}
                //onClick={bool.setTrue}
                {...onPointerClick(bool.setTrue)}
              >
                {uiText.clearAppData.text}
              </Button>
              
              <ClearSiteConfirmation open={bool.value} setOpen={bool.setValue}/>
            </>}</UseBool>
            
            {import.meta.env.DEV && <Button css={normalIconRoundButton}
              onClick={()=>setApp({ ...app, showDevOverlay: !app.showDevOverlay })}
            >
              Show Dev Overlay
            </Button>}
          
          
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




