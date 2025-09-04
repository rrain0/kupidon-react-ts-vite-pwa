import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEvent } from '@utils/react/useEvent.ts'
import React from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { StatusUiText } from 'src/locales/translations/StatusUiText.ts'
import Spinner8LinesIc from 'src/components/elems/icons/SvgIcons/pack/ui/Spinner8LinesIc.tsx'
import ModalDialog from 'src/components/widgets/modals/ModalDialog/ModalDialog.tsx'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { clearSiteData } from '@utils/js/clearSiteData.ts'

import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { useBool } from '@utils/react/state/useBool.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import fixed = EmotionCommon.fixed
import flexC = EmotionCommon.flexC
import row = EmotionCommon.row
import Theme = AppTheme.Theme
import { SvgIconS } from 'src/components/elems/icons/SvgIcons/SvgIconS.ts'
import Txt = EmotionCommon.Txt
import { Callback } from '@utils/base/math/typeUtils.ts'





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
        type='danger'
        title={actionText.clearAppData + '?'}
        onModal={close}
        onBack={close}
        onYes={clear}
      />
      
      
      {needClear && (
        <ModalPortal>
          <ModalReloading>
            <ReloadingBox>
              <Spinner8LinesIc css={icon}/>
              {statusText.reloading}
            </ReloadingBox>
          </ModalReloading>
        </ModalPortal>
      )}
      
    </>
  )
})
ClearSiteDialog.displayName = 'ClearSiteDialog'
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
