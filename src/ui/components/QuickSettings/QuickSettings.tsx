import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import LangOptions from 'src/ui/components/options/LangOptions.tsx'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { OptionHeader, optionIcon } from 'src/ui/components/options/OptionsCommon.tsx'
import { QuickSettingsUiText } from 'src/ui/components/QuickSettings/uiText.ts'
import UseBool from 'src/ui/components/StateCarriers/UseBool.tsx'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import ThemeOptions from 'src/ui/components/options/ThemeOptions.tsx'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState'
import Button from 'src/ui/widgets/Buttons/Button'
import { ButtonStyle } from 'src/ui/widgets/Buttons/ButtonStyle'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import Setter = TypeUtils.Callback1
import col = EmotionCommon.col
import AddModuleIc = SvgIcons.AddModuleIc
import BottomSheetBasic from 'src/ui/widgets/BottomSheet/BottomSheetBasic'
import ClearSiteConfirmation from 'src/ui/components/ClearSiteConfirmation/ClearSiteConfirmation.tsx'
import LockIc = SvgIcons.LockIc
import GearIc = SvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import onPointerClick = ReactUtils.onPointerClick






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
          
          <OptionHeader>
            {uiText.theme.text}:
          </OptionHeader>
          <ThemeOptions/>
          
          
          <OptionHeader>
            {uiText.language.text}:
          </OptionHeader>
          <LangOptions/>
          
          <RoundButtonsContainer>
            
            {auth && <Link to={RootRoute.settings.account[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <LockIc css={[
                  optionIcon,
                  css`translate: 0 -0.1em;`,
                ]}/>
                {uiText.accountSettings.text}
              </Button>
            </Link>}
            
            <Link to={RootRoute.settings.app[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <GearIc css={optionIcon}/>
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
              <AddModuleIc css={optionIcon}/>
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




