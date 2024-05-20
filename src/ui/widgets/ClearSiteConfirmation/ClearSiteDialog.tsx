import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { ActionUiText } from 'src/ui/ui-values/ActionUiText.ts'
import { StatusUiText } from 'src/ui/ui-values/StatusUiText.ts'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { clearSiteData } from 'src/util/app/clearSiteData.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { useBool } from '@util/react/useBool.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SvgIcons.Spinner8LinesIc
import Theme = AppTheme.Theme
import ClearTrashIc = SvgIcons.ClearTrashIc
import BottomSheetDialogBasic from 'src/ui/elements/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import Txt = EmotionCommon.Txt
import Callback = TypeUtils.Callback





export const ClearSiteDialogOverlayName = 'clearSiteDialog'


export type ClearSiteDialogProps = {
  isOpen: boolean
  close: Callback
}
const ClearSiteDialog =
React.memo(
(props: ClearSiteDialogProps)=>{
  const { isOpen, close } = props
  
  const statusText = useUiValues(StatusUiText)
  const actionText = useUiValues(ActionUiText)
  
  
  const [needClear, clear] = useBool(false)
  useEffect(
    ()=>{
      if (needClear){
        ;(async()=>{
          await clearSiteData()
          window.location.reload()
        })()
      }
    },
    [needClear]
  )
  
  
  
  return <>
    
    <UseBottomSheetState isOpen={isOpen} onClosed={close}>
    {props => <ModalPortal><BottomSheetDialogBasic
      {...props.sheetProps}
      header={actionText.clearAppData + '?'}
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
          
          <Button css={[ButtonStyle.roundedAccent, button]}
            onClick={props.setClosing}
          >
            {actionText.no}
          </Button>
          
          <Button css={[ButtonStyle.roundedDanger, button]}
            onClick={clear}
          >
            <ClearTrashIc css={[icon, iconOnDanger]}/>
            {actionText.yes}
          </Button>
        
        </div>
      </div>
    </BottomSheetDialogBasic></ModalPortal>}
    </UseBottomSheetState>
    
    { needClear && <div
      css={t => css`
        ${fixed};
        z-index: 40;
        background: ${t.page.bgc[0]}9a;
        color: ${t.page.content2[0]};
        ${Txt.large2};
        ${center};
      `}
    >
      <div
        css={css`
          ${row};
          gap: 0.3em;
          align-items: center;
        `}
      >
        {<Spinner8LinesIc css={icon}/>}
        {statusText.reloading}
      </div>
    </div> }
    
  </>
})
export default ClearSiteDialog




const icon = (t:Theme)=>css`
  ${SvgIconsStyle.El.icon.thiz()} {
    height: 1.333em;
    width: 1.333em;
    ${SvgIconsStyle.El.icon.props.color.set(t.page.content2[0])}
  }
`
const iconOnDanger = (t:Theme)=>css`
  ${SvgIconsStyle.El.icon.thiz()} {
    ${SvgIconsStyle.El.icon.props.color.set(t.elementDanger.content[0])}
  }
`
const button = (t:Theme)=>css`
  ${ButtonStyle.El.btn.thiz()} {
    min-width: 90px;
    gap: 0.3em;
  }
`