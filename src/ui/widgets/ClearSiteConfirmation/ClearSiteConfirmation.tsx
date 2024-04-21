import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { ActionUiText } from 'src/ui/ui-values/ActionUiText.ts'
import { StatusUiText } from 'src/ui/ui-values/StatusUiText.ts'
import ModalPortal from 'src/ui/components/Modal/ModalPortal.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { clearSiteData } from 'src/util/app/clearSiteData.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { useBoolState } from '@util/react/useBoolState.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SvgIcons.Spinner8LinesIc
import Theme = AppTheme.Theme
import ClearTrashIc = SvgIcons.ClearTrashIc
import BottomSheetBasic from 'src/ui/elements/BottomSheet/BottomSheetBasic.tsx'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
import Setter = TypeUtils.Callback1
import Txt = EmotionCommon.Txt







export type ClearSiteConfirmationProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const ClearSiteConfirmation =
React.memo(
(props: ClearSiteConfirmationProps)=>{
  const { open, setOpen } = props
  
  const statusText = useUiValues(StatusUiText)
  const actionText = useUiValues(ActionUiText)
  
  
  const [needClear, clear] = useBoolState(false)
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
    
    <UseBottomSheetState
      open={open}
      onClosed={()=>setOpen(false)}
    >
      {props => <ModalPortal><BottomSheetBasic
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
      </BottomSheetBasic></ModalPortal>
    }</UseBottomSheetState>
    
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
export default ClearSiteConfirmation




const icon = (t:Theme)=>css`
  ${SvgIcStyle.El.thiz.icon} {
    height: 1.333em;
    width: 1.333em;
    ${SvgIcStyle.Prop.prop.color}: ${t.page.content2[0]};
  }
`
const iconOnDanger = (t:Theme)=>css`
  ${SvgIcStyle.El.thiz.icon} {
    ${SvgIcStyle.Prop.prop.color}: ${t.elementDanger.content[0]};
  }
`
const button = (t:Theme)=>css`
  ${ButtonStyle.El.btn.thiz()} {
    min-width: 90px;
    gap: 0.3em;
  }
`