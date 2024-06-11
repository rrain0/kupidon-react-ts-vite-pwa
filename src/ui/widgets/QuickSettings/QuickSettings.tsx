import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { ActionUiText } from 'src/ui-props/ui-values/ActionUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import { RouteBuilder } from '@util/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import col = EmotionCommon.col
import AddModuleIc = SvgIcons.AddModuleIc
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import ClearSiteDialog, {
  ClearSiteDialogOverlayName,
} from 'src/ui/components/ClearSiteConfirmation/ClearSiteDialog.tsx'
import LockIc = SvgIcons.LockIc
import GearIc = SvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'
import Callback = TypeUtils.Callback



export const QuickSettingsOverlayName = 'quickSettings'


export type SettingsProps = {
  isOpen: boolean
  close: Callback
}
const QuickSettings =
React.memo(
(props: SettingsProps)=>{
  const { isOpen, close } = props
  
  const auth = useRecoilValue(AuthRecoil)
  const [app, setApp] = useRecoilState(AppRecoil)
  
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const clearSiteDialog = useOverlayUrl(ClearSiteDialogOverlayName)
  
  return <>
    <UseBottomSheetState isOpen={isOpen} close={close}>
      {props => <ModalPortal>
        <BottomSheetDialogBasic {...props.sheetProps}
          header={titleText.settings}
        >
          <Content>
            
            <SettingsOptions.Header>
              {titleText.theme}
            </SettingsOptions.Header>
            <ThemeOptions/>
            
            
            <SettingsOptions.Header>
              {titleText.language}
            </SettingsOptions.Header>
            <LangOptions/>
            
            <RoundButtonsContainer>
              
              {auth && <Link to={RootRoute.settings.account[full]()}>
                <Button css={ButtonStyle.button({ shape: 'rounded', color: 'normal' })}
                  onClick={props.setClosing}
                >
                  <LockIc css={[
                    SettingsOptions.icon,
                    css`translate: 0 -0.1em;`,
                  ]}/>
                  {titleText.accountSettings}
                </Button>
              </Link>}
              
              <Link to={RootRoute.settings.app[full]()}>
                <Button css={ButtonStyle.button({ shape: 'rounded', color: 'normal' })}
                  onClick={props.setClosing}
                >
                  <GearIc css={SettingsOptions.icon}/>
                  {titleText.appSettings}
                </Button>
              </Link>
              
              <Link to={RootRoute.test[full]()}>
                <Button css={ButtonStyle.roundedSecondary}
                  onClick={props.setClosing}
                >
                  {titleText.testPage}
                </Button>
              </Link>
              
              {app.canInstall && <Button css={ButtonStyle.button({ shape: 'rounded', color: 'normal' })}
                onClick={async () => await promptInstall()}
              >
                <AddModuleIc css={SettingsOptions.icon}/>
                {actionText.installApp}
              </Button>}
              
              <Button css={ButtonStyle.button({ shape: 'rounded', color: 'normal' })}
                onClick={clearSiteDialog.open}
              >
                {actionText.clearAppData}
              </Button>
              
              {import.meta.env.DEV && <Button css={ButtonStyle.roundedSecondary}
                onClick={()=>setApp({ ...app, showDevOverlay: !app.showDevOverlay })}
              >
                Show Dev Overlay
              </Button>}
            
            
            </RoundButtonsContainer>
          
          
          </Content>
        </BottomSheetDialogBasic>
      </ModalPortal>}
    </UseBottomSheetState>
    
    
    <ClearSiteDialog isOpen={clearSiteDialog.isOpen} close={clearSiteDialog.close}/>
    
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



