import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { useOverlayUrl } from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl.ts'
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
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
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
  close: (action?: Callback) => void
}
const QuickSettings = React.memo((props: SettingsProps) => {
  const { isOpen, close } = props
  
  const auth = useRecoilValue(AuthRecoil)
  const [app, setApp] = useRecoilState(AppRecoil)
  
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const navigate = useNavigate()
  const [closeAction, setCloseAction] = useState<undefined | Callback>(undefined)
  
  const closeSettings = () => {
    close(closeAction)
    setCloseAction(undefined)
  }
  
  const clearSiteDialog = useOverlayUrl(ClearSiteDialogOverlayName)
  
  return (
    <>
      <UseBottomSheetState isOpen={isOpen} onClose={closeSettings}>
        {props => (
          <ModalPortal>
            <BottomSheetBasic
              css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
              {...props.sheetProps}
              title={titleText.settings}
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
                    <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                      onClick={() => {
                        setCloseAction(() => () => {
                          navigate(RootRoute.settings.account[full]())
                        })
                        props.setClosing()
                      }}
                    >
                      <LockIc
                        css={[
                          SettingsOptions.icon,
                          css`translate: 0 -0.1em;`,
                        ]}
                      />
                      {titleText.accountSettings}
                    </Button>
                  )}
                  
                  <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                    onClick={() => {
                      setCloseAction(() => () => {
                        navigate(RootRoute.settings.app[full]())
                      })
                      props.setClosing()
                    }}
                  >
                    <GearIc css={SettingsOptions.icon} />
                    {titleText.appSettings}
                  </Button>
                  
                  <Button css={ButtonS6.t(ButtonS6.S.outlined.rounded.md.normal)}
                    onClick={() => {
                      setCloseAction(() => () => {
                        navigate(RootRoute.dev[full]())
                      })
                      props.setClosing()
                    }}
                  >
                    {titleText.testPage}
                  </Button>
                  
                  {app.canInstall && (
                    <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                      onClick={async () => await promptInstall()}
                    >
                      <AddModuleIc css={SettingsOptions.icon} />
                      {actionText.installApp}
                    </Button>
                  )}
                  
                  <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                    onClick={clearSiteDialog.open}
                  >
                    {actionText.clearAppData}
                  </Button>
                  
                  {import.meta.env.DEV && (
                    <Button css={ButtonS6.t(ButtonS6.S.outlined.rounded.md.normal)}
                      onClick={() => setApp({ ...app, showDevOverlay: !app.showDevOverlay })}
                    >
                      Show Dev Overlay
                    </Button>
                  )}
                
                
                </RoundButtonsContainer>
              
              
              </Content>
            </BottomSheetBasic>
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



