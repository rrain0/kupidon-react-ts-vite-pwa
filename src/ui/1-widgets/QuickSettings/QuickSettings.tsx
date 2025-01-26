import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import col = EmotionCommon.col
import AddModuleIc = SvgIconsPack.AddModuleIc
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import ClearSiteDialog, {
  ClearSiteDialogOverlayName,
} from 'src/ui/components/ClearSiteConfirmation/ClearSiteDialog.tsx'
import LockIc = SvgIconsPack.LockIc
import GearIc = SvgIconsPack.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'
import Callback = TypeU.Callback



export const QuickSettingsOverlayName = 'quickSettings'


export type SettingsProps = {
  isOpen: boolean
  close: Callback
}
const QuickSettings = React.memo(
  (props: SettingsProps) => {
    const { isOpen, close } = props
    
    const auth = useRecoilValue(AuthRecoil)
    const [app, setApp] = useRecoilState(AppRecoil)
    
    const titleText = useUiValues(TitleUiText)
    const actionText = useUiValues(ActionUiText)
    
    const clearSiteDialog = useOverlayUrl(ClearSiteDialogOverlayName)
    
    return (
      <>
        <UseBottomSheetState isOpen={isOpen} onClose={close}>
          {props => (
            <ModalPortal>
              <BottomSheetDialogBasic {...props.sheetProps}
                headerTitle={titleText.settings}
              >
                <Content>
                  
                  <SettingsOptions.Header>
                    {titleText.theme}
                  </SettingsOptions.Header>
                  <ThemeOptions />
                  
                  
                  <SettingsOptions.Header>
                    {titleText.language}
                  </SettingsOptions.Header>
                  <LangOptions />
                  
                  <RoundButtonsContainer>
                    
                    {auth && (
                      <Link to={RootRoute.settings.account[full]()}>
                        <Button css={ButtonS6.S.Filled.Rounded.Normal.normal}
                          onClick={props.setClosing}
                        >
                          <LockIc
                            css={[
                              SettingsOptions.icon,
                              css`translate: 0 -0.1em;`,
                            ]}
                          />
                          {titleText.accountSettings}
                        </Button>
                      </Link>
                    )}
                    
                    <Link to={RootRoute.settings.app[full]()}>
                      <Button css={ButtonS6.S.Filled.Rounded.Normal.normal}
                        onClick={props.setClosing}
                      >
                        <GearIc css={SettingsOptions.icon} />
                        {titleText.appSettings}
                      </Button>
                    </Link>
                    
                    <Link to={RootRoute.test[full]()}>
                      <Button css={ButtonS6.S.Outlined.Rounded.Normal.normal}
                        onClick={props.setClosing}
                      >
                        {titleText.testPage}
                      </Button>
                    </Link>
                    
                    {app.canInstall && (
                      <Button css={ButtonS6.S.Filled.Rounded.Normal.normal}
                        onClick={async () => await promptInstall()}
                      >
                        <AddModuleIc css={SettingsOptions.icon} />
                        {actionText.installApp}
                      </Button>
                    )}
                    
                    <Button css={ButtonS6.S.Filled.Rounded.Normal.normal}
                      onClick={clearSiteDialog.open}
                    >
                      {actionText.clearAppData}
                    </Button>
                    
                    {import.meta.env.DEV && (
                      <Button css={ButtonS6.S.Outlined.Rounded.Normal.normal}
                        onClick={() => setApp({ ...app, showDevOverlay: !app.showDevOverlay })}
                      >
                        Show Dev Overlay
                      </Button>
                    )}
                  
                  
                  </RoundButtonsContainer>
                
                
                </Content>
              </BottomSheetDialogBasic>
            </ModalPortal>
          )}
        </UseBottomSheetState>
        
        
        <ClearSiteDialog isOpen={clearSiteDialog.isOpen} close={clearSiteDialog.close} />
        
      </>
    )
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



