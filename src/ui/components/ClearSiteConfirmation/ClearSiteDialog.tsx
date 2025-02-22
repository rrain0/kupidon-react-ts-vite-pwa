import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEvent } from '@util/react/useEvent.ts'
import React from 'react'
import { StyleVals } from 'src/ui-data/style/StyleVals'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import ModalDialog from 'src/ui/1-widgets/modals/ModalDialog/ModalDialog.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { clearSiteData } from '@util/app/clearSiteData.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { useBool } from 'src/util/react-state/useBool.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import fixed = EmotionCommon.fixed
import flexC = EmotionCommon.flexC
import row = EmotionCommon.row
import Spinner8LinesIc = SvgIconsPack.Spinner8LinesIc
import Theme = AppTheme.Theme
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
      
      <ModalDialog
        isOpen={isOpen}
        title={actionText.clearAppData + '?'}
        onModal={close}
        onBack={close}
        onDangerYes={clear}
      />
      
      
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


const ModalReloading = styled.div`
  ${fixed};
  z-index: ${StyleVals.modalFloor2k};
  background: ${p => p.theme.page.bg}9a;
  color: ${p => p.theme.page.ct2};
  ${Txt.s18WideLh150};
  ${flexC};
`
const ReloadingBox = styled.div`
  ${row};
  gap: 0.3em;
  align-items: center;
`
