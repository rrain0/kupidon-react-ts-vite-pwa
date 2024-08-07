import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { clearSiteData } from '@util/app/clearSiteData.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { useBool } from 'src/util/react-state/useBool.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons.tsx'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SvgIcons.Spinner8LinesIc
import Theme = AppTheme.Theme
import ClearTrashIc = SvgIcons.ClearTrashIc
import BottomSheetDialogBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetDialogBasic.tsx'
import { SvgIconsStyle } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsStyle.ts'
import Txt = EmotionCommon.Txt
import Callback = TypeU.Callback





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
    
    <UseBottomSheetState isOpen={isOpen} close={close}>
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
          
          <Button css={[ButtonStyle.filledRoundedNormalAccent, button]}
            onClick={props.setClosing}
          >
            {actionText.no}
          </Button>
          
          <Button css={[ButtonStyle.filledRoundedNormalDanger, button]}
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
        background: ${t.page.bg[0]}9a;
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
  ${ButtonStyle.W.use.s.normal().e.button().thisUse} {
    min-width: 90px;
    gap: 0.3em;
  }
`