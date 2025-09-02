import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Env } from '@utils/app/Env.ts'
import { SwChannel } from '@utils/service-worker/SwChannel.ts'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import LockIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/LockIc.tsx'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import LangOptions from 'src/ui/components/settings-options/LangOptions.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ThemeOptions from 'src/ui/components/settings-options/ThemeOptions.tsx'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import col = EmotionCommon.col
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import ClearSiteDialog, {
  ClearSiteDialogOverlayName,
} from 'src/ui/components/ClearSiteConfirmation/ClearSiteDialog.tsx'
import AddModuleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/AddModuleIc.tsx'
import GearIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/GearIc.tsx'
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import { SettingsOptions } from 'src/ui/components/settings-options/SettingsOptions'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import Callback = TypeU.Callback



export const QuickSettingsOverlayName = 'quickSettings'


export type SettingsProps = {
  isOpen: boolean
  close: (action?: Callback) => void
}
const QuickSettings = React.memo((props: SettingsProps) => {
  const { isOpen, close } = props
  
  const isAuth = useAuthZustand(s => s.getIsAuth())
  const canInstall = useAppZustand(s => s.canInstall)
  const setApp = useAppZustand.setState
  
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
                <ThemeOptions/>
                
                
                <SettingsOptions.Header>
                  {titleText.language}
                </SettingsOptions.Header>
                <LangOptions/>
                
                <RoundButtonsContainer>
                  
                  {isAuth && (
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
                    <GearIc css={SettingsOptions.icon}/>
                    {titleText.appSettings}
                  </Button>
                  
                  {canInstall && (
                    <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                      onClick={async () => await promptInstall()}
                    >
                      <AddModuleIc css={SettingsOptions.icon}/>
                      {actionText.installApp}
                    </Button>
                  )}
                  
                  <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                    onClick={clearSiteDialog.open}
                  >
                    {actionText.clearAppData}
                  </Button>
                  
                  <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                    onClick={async () => {
                      const permission = await Notification.requestPermission()
                      if (permission === 'granted') {
                        SwChannel.send({ type: 'TEST_NOTIFICATION' })
                      }
                    }}
                  >
                    {'Отправить уведомление сейчас'}
                  </Button>
                  
                  <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                    onClick={async () => {
                      const permission = await Notification.requestPermission()
                      if (permission === 'granted') {
                        SwChannel.send({ type: 'TEST_NOTIFICATION_IN_5S' })
                      }
                    }}
                  >
                    {'Отправить уведомление через 5 сек'}
                  </Button>
                  
                  <Button css={ButtonS6.t(ButtonS6.S.filled.rounded.md.normal)}
                    onClick={async () => {
                      const permission = await Notification.requestPermission()
                      if (permission === 'granted') {
                        SwChannel.send({ type: 'TEST_NOTIFICATION_IN_1M' })
                      }
                    }}
                  >
                    {'Отправить уведомление через 1 мин'}
                  </Button>
                  
                  <Button css={ButtonS6.t(ButtonS6.S.outlined.rounded.md.normal)}
                    onClick={() => {
                      setCloseAction(() => () => {
                        navigate(RootRoute.devTest[full]())
                      })
                      props.setClosing()
                    }}
                  >
                    {titleText.testPage}
                  </Button>
                  
                  {Env.isDev && (
                    <Button css={ButtonS6.t(ButtonS6.S.outlined.rounded.md.normal)}
                      onClick={() => setApp(s => ({ showDevOverlay: !s.showDevOverlay }))}
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
      
      
      <ClearSiteDialog isOpen={clearSiteDialog.isOpen} close={clearSiteDialog.close}/>
      
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



