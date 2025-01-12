import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEvent } from '@util/react/useEvent.ts'
import React from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { clearSiteData } from '@util/app/clearSiteData.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { useBool } from 'src/util/react-state/useBool.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SvgIconsPack.Spinner8LinesIc
import Theme = AppTheme.Theme
import ClearTrashIc = SvgIconsPack.ClearTrashIc
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import Txt = EmotionCommon.Txt
import Callback = TypeU.Callback





export const ClearSiteDialogOverlayName = 'clearSiteDialog'


export type ClearSiteDialogProps = {
  isOpen: boolean
  close: Callback
}
const ClearSiteDialog = React.memo((props: ClearSiteDialogProps) => {
  const { isOpen, close } = props
  
  const statusText = useUiValues(StatusUiText)
  const actionText = useUiValues(ActionUiText)
  
  
  const [needClear, clear] = useBool(false)
  useEvent(() => {
    if (needClear) {
      // eslint-disable-next-line @stylistic/no-extra-semi
      ;(async() => {
        await clearSiteData()
        window.history.pushState(undefined, '', '/')
        window.location.reload()
      })()
    }
  }, [needClear])
  
  
  
  return (
    <>
      
      <UseBottomSheetState isOpen={isOpen} onClose={close}>
        {props => (
          <ModalPortal>
            <BottomSheetDialogBasic
              {...props.sheetProps}
              headerTitle={actionText.clearAppData + '?'}
            >
              <div
                css={css`
                  ${col};
                  padding-bottom: 20px;
                `}
              >
                <div
                  css={css`
                    ${row};
                    justify-content: center;
                    gap: 20px;
                  `}
                >
                  
                  <Button css={[ButtonS.filledRoundedNormalAccent, button]}
                    onClick={props.setClosing}
                  >
                    {actionText.no}
                  </Button>
                  
                  <Button css={[ButtonS.filledRoundedNormalDanger, button]}
                    onClick={clear}
                  >
                    <ClearTrashIc css={[icon, iconOnDanger]} />
                    {actionText.yes}
                  </Button>
                
                </div>
              </div>
            </BottomSheetDialogBasic>
          </ModalPortal>
        )}
      </UseBottomSheetState>
      
      {needClear && (
        <ModalPortal>
          <ModalReloading>
            <ReloadingBox>
              <Spinner8LinesIc css={icon} />
              {statusText.reloading}
            </ReloadingBox>
          </ModalReloading>
        </ModalPortal>
      )}
      
    </>
  )
})
export default ClearSiteDialog




const icon = (t:Theme) => css`
  ${SvgIconS.El.icon.thiz()} {
    height: 1.333em;
    width: 1.333em;
    ${SvgIconS.El.icon.props.color.set(t.page.ct2)}
  }
`
const iconOnDanger = (t:Theme) => css`
  ${SvgIconS.El.icon.thiz()} {
    ${SvgIconS.El.icon.props.color.set(t.elementDanger.ct[0])}
  }
`
const button = (t:Theme) => css`
  ${ButtonS.W.use.s.normal().e.button().thisUse} {
    min-width: 90px;
    gap: 0.3em;
  }
`

const ModalReloading = styled.div`
  ${fixed};
  z-index: ${StyleVals.modalFloor2};
  background: ${p => p.theme.page.bg}9a;
  color: ${p => p.theme.page.ct2};
  ${Txt.large2};
  ${center};
`
const ReloadingBox = styled.div`
  ${row};
  gap: 0.3em;
  align-items: center;
`
